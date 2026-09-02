import { Input, Card, Tag, Select, Slider } from 'antd'
import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { SearchOutlined } from '@ant-design/icons'
import { api } from '../../infrastructure/api/client'

type Result = { documentoId: string; titulo: string; snippet: string; score: number; tipo: string; fuente: any }

export default function Busqueda() {
  const [q, setQ] = useState('')
  const [debounced, setDebounced] = useState('')
  const [results, setResults] = useState<Result[]>([])
  const [loading, setLoading] = useState(false)
  const [elapsed, setElapsed] = useState(0)
  const [tipo, setTipo] = useState<string | undefined>(undefined)

  useEffect(() => {
    const t = setTimeout(() => setDebounced(q.trim()), 380)
    return () => clearTimeout(t)
  }, [q])

  useEffect(() => {
    if (!debounced) { setResults([]); return }
    setLoading(true)
    const t0 = performance.now()
    api.get('/busqueda', { params: { q: debounced, tipo, limit: 10 } }).then(r => {
      setResults(r.data.resultados || [])
      setElapsed(Math.round(performance.now() - t0))
    }).catch(() => setResults([])).finally(() => setLoading(false))
  }, [debounced, tipo])

  return (
    <div className="space-y-4">
      <motion.div initial={{ opacity: 0, y: 4 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.2, ease: "easeOut" }} className="bg-white p-4 rounded-2xl border-2 border-[#c9a86a] shadow-sm">
        <Input.Search
          placeholder="convenio visitas Mamani 2024 — tolera conbenio"
          enterButton={<span className="bg-[#c9a86a] px-5 flex items-center gap-2"><SearchOutlined /> Buscar</span>}
          size="large"
          value={q}
          onChange={e => setQ(e.target.value)}
          onSearch={v => setDebounced(v.trim())}
          loading={loading}
          allowClear
          className="[&_.ant-input-search-button]:!bg-[#c9a86a] [&_.ant-input-search-button]:!border-[#c9a86a]"
        />
        <div className="flex items-center gap-3 mt-3 text-[11px] text-[#7a756f] flex-wrap">
          <span>{loading ? 'Buscando en vector local 384d…' : debounced ? `${results.length} resultados en ${elapsed}ms` : 'Escribe para buscar — p95 <3s, ≥85% precisión'}</span>
          <span className="hidden sm:inline">·</span>
          <span className="bg-[#fdf6e3] border border-[#e8e0d0] rounded-full px-2 py-0.5">tolera errores: conbenio → convenio</span>
        </div>
      </motion.div>

      <div className="grid grid-cols-1 lg:grid-cols-[1fr_300px] gap-4">
        <div className="space-y-3">
          <AnimatePresence>
            {results.map((r, i) => (
              <motion.div
                key={r.documentoId}
                initial={{ opacity: 0, y: 4 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                transition={{ delay: i * 0.02, duration: 0.18, ease: "easeOut" }}
                whileHover={{ y: -1 }}
              >
                <Card className="border-l-4 !border-l-[#c9a86a] hover:shadow-md transition-shadow !rounded-xl" styles={{ body: { padding: 16 } }}>
                  <div className="flex items-start justify-between gap-3">
                    <div className="font-semibold text-[14px]">{r.titulo}</div>
                    <Tag color={r.score > 0.7 ? 'success' : r.score > 0.4 ? 'warning' : 'default'} className="!m-0">{r.score.toFixed(2)}</Tag>
                  </div>
                  <div className="text-[13px] mt-1.5 leading-relaxed">
                    {r.snippet.slice(0, 220).split(new RegExp(`(${debounced.split(/\s+/).join('|')})`, 'i')).map((part, idx) =>
                      debounced.toLowerCase().split(/\s+/).includes(part.toLowerCase()) ? <span key={idx} className="font-semibold text-[#8c7348] bg-[#fdf6e3] px-0.5 rounded">{part}</span> : part
                    )}
                  </div>
                  <div className="text-[11px] text-[#7a756f] font-mono mt-2 flex gap-2 flex-wrap">
                    <span>Fuente: {r.fuente?.caso?.slice(0,8)} · {String(r.fuente?.fecha || '').slice(0,10)}</span>
                    <Tag className="!m-0 text-[10px]">{r.tipo}</Tag>
                  </div>
                </Card>
              </motion.div>
            ))}
          </AnimatePresence>
          {!loading && debounced && results.length === 0 && (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="bg-white rounded-xl border border-dashed border-[#e8e0d0] p-8 text-center text-[#7a756f]">
              Sin resultados para “{debounced}”. Prueba con “convenio Mamani” o “informe Garcia”.
            </motion.div>
          )}
          {!debounced && (
            <div className="grid grid-cols-2 gap-3">
              {[
                { t: 'Convenio Transaccional — Mamani 2024', s: 'convenio de visitas homologado 15/03/2024 — 800 Bs', score: 0.91 },
                { t: 'Acta Audiencia — Garcia', s: 'Informe psicologico 2024-08-28 — falta certificado', score: 0.76 },
              ].map((c, i) => (
                <motion.div key={i} initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.05 + i * 0.02, duration: 0.18 }}>
                  <Card className="!rounded-xl hover:shadow-md transition-shadow cursor-pointer" onClick={() => setQ(c.t.split('—')[0].trim())}>
                    <div className="font-semibold text-sm">{c.t} <Tag color={c.score > 0.8 ? 'success' : 'warning'}>{c.score}</Tag></div>
                    <div className="text-[12px] text-[#7a756f] mt-1">{c.s}</div>
                  </Card>
                </motion.div>
              ))}
            </div>
          )}
        </div>

        <motion.div initial={{ opacity: 0, x: 4 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.08, duration: 0.2, ease: "easeOut" }}>
          <Card title="Filtros" className="h-fit !rounded-xl sticky top-[72px]">
            <div className="space-y-4">
              <div>
                <div className="text-[12px] font-semibold mb-1">Tipo</div>
                <Select placeholder="Todos" allowClear style={{ width: '100%' }} value={tipo} onChange={setTipo} options={[{ value: 'convenio', label: 'Convenio' }, { value: 'demanda', label: 'Demanda' }, { value: 'informe psicologico', label: 'Informe psic.' }, { value: 'orden proteccion', label: 'Orden protección' }, { value: 'comprobante pago', label: 'Comprobante' }]} />
              </div>
              <div>
                <div className="text-[12px] font-semibold mb-1">Score mínimo</div>
                <Slider defaultValue={30} />
              </div>
              <div className="bg-[#fdfbf7] border border-[#e8e0d0] rounded-xl p-3 text-[11px] leading-relaxed">
                <div className="font-semibold">Cómo funciona</div>
                SQLite (casos) + NoSQL JSON (docs flexibles) + Vector local 384d hash-trick. Búsqueda p95 &lt;3s, tolera “conbenio”.
              </div>
            </div>
          </Card>
        </motion.div>
      </div>
    </div>
  )
}
