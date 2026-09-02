import { useState, useRef, useEffect } from 'react'
import { Input, Tag } from 'antd'
import { motion, AnimatePresence } from 'framer-motion'
import { MessageOutlined, MinusOutlined, CloseOutlined, SendOutlined, ExpandAltOutlined } from '@ant-design/icons'
import { useNavigate } from 'react-router-dom'
import { api } from '../../infrastructure/api/client'

type Msg = { id: string; mine: boolean; text: string; citas?: { titulo: string }[] }

export default function ChatWidget() {
  const [minimized, setMinimized] = useState(() => localStorage.getItem('chat_minimized') === '1')
  const [closed, setClosed] = useState(false)
  const [input, setInput] = useState('')
  const [loading, setLoading] = useState(false)
  const [msgs, setMsgs] = useState<Msg[]>([
    { id: 'm1', mine: false, text: 'Hola, soy el asistente KM. Pregunta en español coloquial y cito fuente con score.', citas: [] },
  ])
  const listRef = useRef<HTMLDivElement>(null)
  const navigate = useNavigate()

  useEffect(() => {
    localStorage.setItem('chat_minimized', minimized ? '1' : '0')
  }, [minimized])

  useEffect(() => {
    listRef.current?.scrollTo({ top: listRef.current.scrollHeight, behavior: 'smooth' })
  }, [msgs, loading, minimized])

  async function send() {
    const q = input.trim()
    if (!q || loading) return
    setInput('')
    const userMsg: Msg = { id: Date.now().toString(), mine: true, text: q }
    setMsgs(m => [...m, userMsg])
    setLoading(true)
    try {
      const { data } = await api.post('/chat', { pregunta: q })
      const bot: Msg = { id: (Date.now()+1).toString(), mine: false, text: data.respuesta || data.answer || 'Sin respuesta', citas: data.citas || data.fuentes || [] }
      setMsgs(m => [...m, bot])
    } catch {
      setMsgs(m => [...m, { id: (Date.now()+1).toString(), mine: false, text: 'Error conectando al backend local. Verifica que el backend este en :3000' }])
    } finally {
      setLoading(false)
    }
  }

  if (closed) {
    return (
      <motion.button
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.2, ease: 'easeOut' }}
        onClick={() => setClosed(false)}
        className="hidden xl:flex fixed bottom-6 right-6 w-14 h-14 bg-[#c9a86a] rounded-full shadow-xl items-center justify-center text-white hover:bg-[#b89455] transition-colors"
      >
        <MessageOutlined className="text-xl" />
        <span className="absolute -top-1 -right-1 w-2.5 h-2.5 bg-[#1a7f37] rounded-full opacity-80" />
      </motion.button>
    )
  }

  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 6 }}
      animate={{ opacity: 1, y: 0 }}
      className={`hidden xl:flex fixed right-6 bg-white rounded-2xl border border-[#e8e0d0] shadow-2xl flex-col overflow-hidden z-40 ${minimized ? 'bottom-6 w-[340px] h-[52px]' : 'bottom-6 w-[380px] h-[520px]'}`}
      transition={{ duration: 0.22, ease: 'easeOut' }}
    >
      <div className="h-[52px] bg-[#0f0f0f] text-white flex items-center justify-between px-4 cursor-pointer shrink-0" onClick={() => minimized && setMinimized(false)}>
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 bg-[#c9a86a] rounded-full flex items-center justify-center">
            <MessageOutlined />
          </div>
          <div>
            <div className="text-[13px] font-semibold leading-none">Chat RAG</div>
            <div className="text-[11px] text-[#c9a86a] flex items-center gap-1"><span className="w-2 h-2 bg-[#1a7f37] rounded-full opacity-70" />En línea — cita fuente</div>
          </div>
        </div>
        <div className="flex items-center gap-1">
          <button onClick={(e) => { e.stopPropagation(); setMinimized(v => !v) }} className="w-7 h-7 hover:bg-white/10 rounded flex items-center justify-center">
            {minimized ? <ExpandAltOutlined className="text-sm" /> : <MinusOutlined className="text-sm" />}
          </button>
          <button onClick={(e) => { e.stopPropagation(); navigate('/chat') }} className="w-7 h-7 hover:bg-white/10 rounded flex items-center justify-center">
            <ExpandAltOutlined className="text-sm" />
          </button>
          <button onClick={(e) => { e.stopPropagation(); setClosed(true) }} className="w-7 h-7 hover:bg-white/10 rounded flex items-center justify-center">
            <CloseOutlined className="text-sm" />
          </button>
        </div>
      </div>

      <AnimatePresence>
        {!minimized && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="flex-1 flex flex-col min-h-0"
          >
            <div ref={listRef} className="flex-1 overflow-y-auto p-3 space-y-3 bg-[#fdfbf7] scroll-smooth">
              {msgs.map(m => (
                <motion.div
                  key={m.id}
                  initial={{ opacity: 0, y: 4 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.18, ease: 'easeOut' }}
                  className={`flex ${m.mine ? 'justify-end' : 'justify-start'}`}
                >
                  <div className={`${m.mine ? 'bg-[#c9a86a] text-white rounded-[18px] rounded-br-[4px] max-w-[78%]' : 'bg-white border border-[#e8e0d0] rounded-[18px] rounded-bl-[4px] max-w-[85%]'} px-3.5 py-2.5 shadow-sm`}>
                    <div className="text-[13px] leading-[1.4] whitespace-pre-wrap">{m.text}</div>
                    {m.citas && m.citas.length > 0 && (
                      <div className="flex flex-wrap gap-1 mt-2">
                        {m.citas.slice(0,3).map((c, i) => (
                          <Tag key={i} className="text-[10px] m-0 !bg-[#fdf6e3] !border-[#e8e0d0]">{c.titulo}</Tag>
                        ))}
                      </div>
                    )}
                  </div>
                </motion.div>
              ))}
              {loading && (
                <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.15 }} className="flex justify-start">
                  <div className="bg-white border border-[#e8e0d0] rounded-[18px] px-4 py-3 flex gap-1.5 items-center">
                    <span className="w-1.5 h-1.5 bg-[#c9a86a] rounded-full opacity-60" style={{ animation: 'pulse 1.4s infinite' }} />
                    <span className="w-1.5 h-1.5 bg-[#c9a86a] rounded-full opacity-60" style={{ animation: 'pulse 1.4s 0.2s infinite' }} />
                    <span className="w-1.5 h-1.5 bg-[#c9a86a] rounded-full opacity-60" style={{ animation: 'pulse 1.4s 0.4s infinite' }} />
                  </div>
                </motion.div>
              )}
            </div>

            <div className="p-3 bg-white border-t border-[#e8e0d0] flex gap-2">
              <Input
                value={input}
                onChange={e => setInput(e.target.value)}
                onPressEnter={send}
                placeholder="Pregunta — ej. ¿qué falta para Garcia?"
                className="!rounded-full"
                disabled={loading}
              />
              <motion.button
                whileTap={{ scale: 0.98 }}
                whileHover={{ scale: 1.02 }}
                transition={{ duration: 0.12 }}
                onClick={send}
                disabled={loading || !input.trim()}
                className="w-10 h-10 bg-[#c9a86a] hover:bg-[#b89455] disabled:opacity-50 disabled:cursor-not-allowed text-white rounded-full flex items-center justify-center shrink-0 transition-colors"
              >
                <SendOutlined />
              </motion.button>
            </div>
            <div className="px-3 pb-2 text-[10px] text-[#7a756f] text-center">Responde citando fuente · tolera “conbenio” → convenio</div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  )
}
