
import { existsSync, mkdirSync, readFileSync, writeFileSync } from 'node:fs'
import { join, dirname } from 'node:path'
import { fileURLToPath } from 'node:url'
import { randomUUID } from 'node:crypto'

const __dirname = dirname(fileURLToPath(import.meta.url))
const DATA_DIR = join(__dirname, '../../../../data')
const FILE = process.env.NOSQL_PATH || join(DATA_DIR, 'nosql.json')

type Doc = Record<string, any> & { _id: string }
type Store = Record<string, Doc[]>

let store: Store = {}
let persistTimer: NodeJS.Timeout | null = null

function load() {
  try {
    if (existsSync(FILE)) {
      const raw = readFileSync(FILE, 'utf-8')
      store = JSON.parse(raw)
    } else {
      store = {}
    }
  } catch { store = {} }
}

function persist() {
  if (!existsSync(DATA_DIR)) mkdirSync(DATA_DIR, { recursive: true })
  if (persistTimer) clearTimeout(persistTimer)
  persistTimer = setTimeout(() => {
    writeFileSync(FILE, JSON.stringify(store, null, 2), 'utf-8')
  }, 100)
}

export function initNosql() {
  load()
  if (Object.keys(store).length === 0) {
    store = {
      documentos: [],
      chunks: [],
      chat_history: [],
      audit_log: [],
      share_links: [],
      configuracion: [{ _id: 'app', tema: 'buffet', idioma: 'es-BO' }]
    }
    persist()
    writeFileSync(FILE, JSON.stringify(store, null, 2))
  }
  console.log(`[NoSQL] JSON store listo en ${FILE} (${Object.keys(store).length} colecciones)`)
}

function ensure(col: string) {
  if (!store[col]) store[col] = []
}

function matches(doc: Doc, filter: Record<string, any> = {}): boolean {
  for (const [k, v] of Object.entries(filter)) {
    if (k === '_id' && doc._id !== v) return false
    else if (typeof v === 'object' && v !== null && '$regex' in v) {
      const re = new RegExp(v.$regex, v.$options || 'i')
      if (!re.test(String(doc[k] ?? ''))) return false
    } else if (typeof v === 'object' && v !== null && '$in' in v) {
      if (!v.$in.includes(doc[k])) return false
    } else if (doc[k] !== v) {
      if (k.includes('.')) {
        const parts = k.split('.')
        let cur: any = doc
        for (const p of parts) cur = cur?.[p]
        if (cur !== v) return false
      } else return false
    }
  }
  return true
}

export const nosql = {
  collection(name: string) {
    ensure(name)
    return {
      async insert(doc: Record<string, any>) {
        const _id = doc._id || randomUUID()
        const full = { ...doc, _id, createdAt: doc.createdAt || new Date().toISOString() }
        store[name].push(full as Doc)
        persist()
        return full
      },
      async insertMany(docs: Record<string, any>[]) {
        const out = []
        for (const d of docs) out.push(await this.insert(d))
        return out
      },
      async find(filter: Record<string, any> = {}, opts: { limit?: number; skip?: number; sort?: string } = {}) {
        let res = store[name].filter(d => matches(d, filter))
        if (opts.sort) {
          const [field, dir] = opts.sort.startsWith('-') ? [opts.sort.slice(1), -1] : [opts.sort, 1]
          res = res.sort((a, b) => (a[field] > b[field] ? dir : -dir))
        }
        if (opts.skip) res = res.slice(opts.skip)
        if (opts.limit) res = res.slice(0, opts.limit)
        return res
      },
      async findOne(filter: Record<string, any> = {}) {
        return store[name].find(d => matches(d, filter)) || null
      },
      async update(filter: Record<string, any>, update: Record<string, any>) {
        let count = 0
        for (const doc of store[name]) if (matches(doc, filter)) {
          Object.assign(doc, update, { updatedAt: new Date().toISOString() })
          count++
        }
        if (count) persist()
        return { matched: count, modified: count }
      },
      async delete(filter: Record<string, any>) {
        const before = store[name].length
        store[name] = store[name].filter(d => !matches(d, filter))
        const del = before - store[name].length
        if (del) persist()
        return { deleted: del }
      },
      async count(filter: Record<string, any> = {}) {
        return store[name].filter(d => matches(d, filter)).length
      },
      async all() { return [...store[name]] }
    }
  },
  _store() { return store },
  _file() { return FILE }
}