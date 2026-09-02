import { Input, Tag, Button } from 'antd'
import { useState, useRef, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { SendOutlined, RobotOutlined, UserOutlined } from '@ant-design/icons'
import { api } from '../../infrastructure/api/client'

type Msg = { id: string; role: 'user' | 'assistant'; text: string; citas?: any[] }

export default function Chat() {
  const [msgs, setMsgs] = useState<Msg[]>([
    { id: '1', role: 'assistant', text: 'Hola, soy el asistente KM con RAG local. Pregunta en español coloquial y siempre cito fuente. Prueba: “¿Qué falta para audiencia García mañana?” o “¿Y qué más de Mamani?”' },
  ])
  const [input, setInput] = useState('')
  const [loading, setLoading] = useState(false)
  const [sessionId, setSessionId] = useState<string | null>(null)
  const endRef = useRef<HTMLDivElement>(null)

  useEffect(() => { endRef.current?.scrollIntoView({ behavior: 'smooth' }) }, [msgs, loading])

  async function send() {
    const q = input.trim()
    if (!q || loading) return
    setInput('')
    setMsgs(m => [...m, { id: Date.now().toString(), role: 'user', text: q }])
    setLoading(true)
    try {
      const { data } = await api.post('/chat', { pregunta: q, sessionId })
      if (data.sessionId) setSessionId(data.sessionId)
      setMsgs(m => [...m, { id: (Date.now()+1).toString(), role: 'assistant', text: data.respuesta, citas: data.citas || data.fuentes || [] }])
    } catch {
      setMsgs(m => [...m, { id: (Date.now()+1).toString(), role: 'assistant', text: 'Error: backend local no disponible en http://localhost:3000. Inicia el backend con npm run dev.' }])
    } finally { setLoading(false) }
  }

  return (
    <div className="max-w-[820px] mx-auto">
      <motion.div initial={{ opacity: 0, y: 4 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.2, ease: 'easeOut' }} className="bg-white rounded-2xl border border-[#e8e0d0] overflow-hidden shadow-sm flex flex-col h-[72vh]">
        <div className="h-14 bg-[#0f0f0f] text-white flex items-center justify-between px-5 shrink-0">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 bg-[#c9a86a] rounded-full flex items-center justify-center"><RobotOutlined /></div>
            <div>
              <div className="text-[13px] font-semibold">Chat Buffet KM — RAG local 384d</div>
              <div className="text-[11px] text-[#c9a86a] flex items-center gap-1.5"><span className="w-2 h-2 bg-emerald-500 rounded-full opacity-70" />En línea · sqlite + json + vector local</div>
            </div>
          </div>
          <Tag color="gold" className="!m-0">citas obligatorias</Tag>
        </div>

        <div className="flex-1 overflow-y-auto p-5 space-y-4 bg-[#fdfbf7]">
          <AnimatePresence>
            {msgs.map(m => (
              <motion.div
                key={m.id}
                initial={{ opacity: 0, y: 4 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.16, ease: 'easeOut' }}
                className={`flex gap-3 ${m.role === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                {m.role === 'assistant' && <div className="w-8 h-8 bg-white border border-[#e8e0d0] rounded-full flex items-center justify-center shrink-0"><RobotOutlined className="text-[#c9a86a]" /></div>}
                <div className={`${m.role === 'user' ? 'bg-[#c9a86a] text-white rounded-[20px] rounded-br-[6px]' : 'bg-white border border-[#e8e0d0] rounded-[20px] rounded-bl-[6px]'} px-4 py-3 max-w-[72%] shadow-sm`}>
                  <div className="text-[14px] leading-[1.5] whitespace-pre-wrap">{m.text}</div>
                  {m.citas && m.citas.length > 0 && (
                    <div className="mt-3 flex flex-wrap gap-1.5">
                      {m.citas.map((c: any, i: number) => (
                        <motion.span key={i} initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: i * 0.03, duration: 0.15 }} className="text-[11px] bg-[#fdf6e3] border border-[#e8e0d0] rounded-full px-2.5 py-1 text-[#7a5a2a]">
                          [{i+1}] {c.titulo} · {String(c.fecha || '').slice(0,10)}
                        </motion.span>
                      ))}
                    </div>
                  )}
                </div>
                {m.role === 'user' && <div className="w-8 h-8 bg-[#c9a86a] rounded-full flex items-center justify-center shrink-0"><UserOutlined className="text-white" /></div>}
              </motion.div>
            ))}
          </AnimatePresence>
          {loading && (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.15 }} className="flex gap-3">
              <div className="w-8 h-8 bg-white border rounded-full flex items-center justify-center"><RobotOutlined className="text-[#c9a86a]" /></div>
              <div className="bg-white border border-[#e8e0d0] rounded-[20px] px-5 py-3 flex gap-1.5 items-center">
                <span className="w-1.5 h-1.5 bg-[#c9a86a] rounded-full opacity-50" style={{ animation: 'pulse 1.4s infinite' }} />
                <span className="w-1.5 h-1.5 bg-[#c9a86a] rounded-full opacity-50" style={{ animation: 'pulse 1.4s 0.2s infinite' }} />
                <span className="w-1.5 h-1.5 bg-[#c9a86a] rounded-full opacity-50" style={{ animation: 'pulse 1.4s 0.4s infinite' }} />
                <span className="text-[12px] text-[#7a756f] ml-2">Buscando en vector local 384d…</span>
              </div>
            </motion.div>
          )}
          <div ref={endRef} />
        </div>

        <div className="p-4 bg-white border-t border-[#e8e0d0] flex gap-3">
          <Input
            value={input}
            onChange={e => setInput(e.target.value)}
            onPressEnter={send}
            placeholder="Pregunta en español coloquial… ej. ¿qué falta para García mañana?"
            className="!rounded-full !py-2"
            disabled={loading}
          />
          <motion.div whileTap={{ scale: 0.98 }} whileHover={{ scale: 1.01 }} transition={{ duration: 0.12 }}>
            <Button type="primary" onClick={send} loading={loading} disabled={!input.trim()} style={{ background: '#c9a86a', borderColor: '#c9a86a', height: 40, borderRadius: 999 }} icon={<SendOutlined />}>Enviar</Button>
          </motion.div>
        </div>
      </motion.div>
      <div className="mt-3 flex gap-2 flex-wrap">
        {['¿Qué falta para audiencia García mañana?', 'Convenio Mamani 2024', 'Orden protección Rojas vence?', '¿Y qué más de Mamani?'].map(q => (
          <motion.button key={q} whileHover={{ y: -0.5 }} whileTap={{ scale: 0.99 }} transition={{ duration: 0.12 }} onClick={() => setInput(q)} className="text-[12px] bg-white border border-[#e8e0d0] rounded-full px-3 py-1.5 hover:border-[#c9a86a] transition-colors">
            {q}
          </motion.button>
        ))}
      </div>
    </div>
  )
}
