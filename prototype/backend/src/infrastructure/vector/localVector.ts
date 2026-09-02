
import { existsSync, readFileSync, writeFileSync, mkdirSync } from 'node:fs'
import { join, dirname } from 'node:path'
import { fileURLToPath } from 'node:url'

const __dir = dirname(fileURLToPath(import.meta.url))
const DATA_DIR = join(__dir, '../../../../data')
const VEC_FILE = join(DATA_DIR, 'vectors.json')

export interface VectorDoc {
  id: string
  documentoId: string
  casoId: string
  titulo: string
  contenido: string
  tipo: string
  fecha: string
  embedding: number[]
}

let docs: VectorDoc[] = []

function hashToken(token: string, dim: number): number {
  let h = 2166136261
  for (let i = 0; i < token.length; i++) {
    h ^= token.charCodeAt(i)
    h = Math.imul(h, 16777619)
  }
  return Math.abs(h) % dim
}

function normalize(vec: number[]): number[] {
  const norm = Math.sqrt(vec.reduce((s, v) => s + v * v, 0)) || 1
  return vec.map(v => v / norm)
}

export const vectorStore = {
  DIM: 384,

  embed(text: string): number[] {
    const dim = this.DIM
    const vec = new Array(dim).fill(0)
    const tokens = text.toLowerCase()
      .normalize('NFD').replace(/[\u0300-\u036f]/g, '')
      .replace(/[^a-z0-9 ]/g, ' ')
      .split(/\s+/).filter(Boolean)
    const tf: Record<string, number> = {}
    for (const t of tokens) tf[t] = (tf[t] || 0) + 1
    for (const [tok, cnt] of Object.entries(tf)) {
      const idx = hashToken(tok, dim)
      vec[idx] += cnt * (1 + Math.log(cnt))
    }
    const sinonimos: Record<string, string[]> = {
      convenio: ['acuerdo','convenio','conciliacion'],
      proteccion: ['proteccion','medida','amparo'],
      audiencia: ['audiencia','vista','juicio']
    }
    for (const [canon, vars] of Object.entries(sinonimos)) {
      if (tokens.includes(canon)) {
        for (const v of vars) vec[hashToken(v, dim)] += 0.3
      }
    }
    return normalize(vec)
  },

  cosine(a: number[], b: number[]): number {
    let dot = 0
    for (let i = 0; i < a.length; i++) dot += a[i] * b[i]
    return dot
  },

  normalizeQuery(q: string): string {
    return q.toLowerCase()
      .replace(/conbenio/g, 'convenio')
      .replace(/conbencion/g, 'convencion')
      .replace(/audencia/g, 'audiencia')
      .replace(/protecion/g, 'proteccion')
  },

  add(doc: VectorDoc) {
    docs.push(doc)
    this.persist()
  },

  addMany(list: VectorDoc[]) {
    docs.push(...list)
    this.persist()
  },

  search(query: string, topK = 5, filter?: { casoId?: string; tipo?: string }): Array<VectorDoc & { score: number; snippet: string }> {
    const qNorm = this.normalizeQuery(query)
    const qVec = this.embed(qNorm)
    let pool = docs
    if (filter?.casoId) pool = pool.filter(d => d.casoId === filter.casoId)
    if (filter?.tipo) pool = pool.filter(d => d.tipo === filter.tipo)
    const qTokens = qNorm.split(/\s+/).filter(w=>w.length>2)
    const scored = pool.map(d => {
      let score = this.cosine(qVec, d.embedding)
      const low = d.contenido.toLowerCase()
      const titleLow = d.titulo.toLowerCase()
      for (const tok of qTokens) {
        if (low.includes(tok)) score += 0.08
        if (titleLow.includes(tok)) score += 0.05
      }
      return { ...d, score, snippet: d.contenido.slice(0, 220) }
    })
    scored.sort((a,b)=> b.score - a.score)
    return scored.slice(0, topK).filter(s=> s.score > 0.05)
  },

  load() {
    try {
      if (existsSync(VEC_FILE)) {
        const raw = readFileSync(VEC_FILE,'utf-8')
        docs = JSON.parse(raw)
      }
    } catch { docs = [] }
    console.log(`[Vector] ${docs.length} chunks cargados`)
  },
  persist() {
    if (!existsSync(DATA_DIR)) mkdirSync(DATA_DIR,{recursive:true})
    writeFileSync(VEC_FILE, JSON.stringify(docs,null,2))
  },
  all() { return docs },
  count() { return docs.length },
  clear() { docs=[]; this.persist() }
}