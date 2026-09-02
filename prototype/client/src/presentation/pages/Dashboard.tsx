import { Card, Statistic, Table, Tag } from 'antd'
import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import { useNavigate } from 'react-router-dom'
import { api } from '../../infrastructure/api/client'

export default function Dashboard() {
  const [stats, setStats] = useState({ casos: 0, docs: 0, audiencias: 0, alertas: 0 })
  const [auds, setAuds] = useState<any[]>([])
  const navigate = useNavigate()

  useEffect(() => {
    api.get('/casos', { params: { pageSize: 100 } }).then(r => setStats(s => ({ ...s, casos: r.data.total ?? r.data.casos?.length ?? 0 }))).catch(() => {})
    api.get('/audiencias').then(r => { setAuds(r.data.audiencias || []); setStats(s => ({ ...s, audiencias: r.data.audiencias?.length || 0 })) }).catch(() => {})
    api.get('/notificaciones').then(r => setStats(s => ({ ...s, alertas: r.data.noLeidas ?? 0, docs: r.data.total ?? 0 }))).catch(() => {})
  }, [])

  const columns = [
    { title: 'FECHA', dataIndex: 'fecha', key: 'fecha', render: (v: string) => <span className="font-mono text-xs">{v}</span> },
    { title: 'TÍTULO', dataIndex: 'titulo', key: 'titulo' },
    { title: 'JUZGADO', dataIndex: 'juzgado', key: 'juzgado' },
    { title: 'ESTADO', dataIndex: 'estado', key: 'estado', render: (v: string) => <Tag color={v === 'programada' ? 'gold' : 'default'}>{v}</Tag> },
  ]

  return (
    <div className="space-y-4">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {[
          { title: 'Casos activos', value: stats.casos, border: '#c9a86a' },
          { title: 'Audiencias', value: stats.audiencias, border: '#e8e0d0' },
          { title: 'Alertas', value: stats.alertas, border: '#1a1a1a', dark: true },
          { title: 'Docs indexados', value: stats.casos * 2, border: '#e8e0d0' },
        ].map((c, i) => (
          <motion.div key={c.title} initial={{ opacity: 0, y: 4 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.04, duration: 0.18, ease: "easeOut" }} whileHover={{ y: -1 }}>
            <Card className={`!rounded-2xl border-t-2 ${c.dark ? 'bg-[#1a1a1a] !border-t-[#1a1a1a]' : ''}`} style={!c.dark ? { borderTopColor: c.border } : undefined}>
              <Statistic title={c.dark ? <span className="text-[#c9a86a]">{c.title}</span> : c.title} value={c.value} valueStyle={c.dark ? { color: '#fff' } : undefined} />
            </Card>
          </motion.div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.08, duration: 0.2, ease: "easeOut" }}>
          <Card title="Casos por tipo" className="!rounded-2xl">
            <div className="flex gap-4 items-end">
              {[{ h: 80, bg: '#c9a86a', label: 'Asistencia' }, { h: 64, bg: '#e8e0d0', label: 'Patria' }, { h: 48, bg: '#fdf6e3', label: 'Violencia' }].map(b => (
                <motion.div key={b.label} initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.12, duration: 0.3, ease: "easeOut" }} className="w-20 rounded-xl border flex items-end justify-center pb-2 text-[11px]" style={{ background: b.bg }}>{b.label}</motion.div>
              ))}
            </div>
            <div className="text-[11px] text-[#7a756f] mt-3">SQL local (casos) + NoSQL (docs flexibles) + Vector 384d</div>
          </Card>
        </motion.div>

        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.1, duration: 0.2, ease: "easeOut" }}>
          <Card title="Próximas audiencias" extra={<a className="text-[#8c7348]" onClick={() => navigate('/audiencias')}>Ver todas</a>} className="!rounded-2xl">
            <Table columns={columns as any} dataSource={auds.slice(0, 3).map((a: any) => ({ ...a, key: a.id }))} pagination={false} size="small" />
          </Card>
        </motion.div>
      </div>

      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.35 }}>
        <Card title="Accesos rápidos" className="!rounded-2xl">
          <div className="flex gap-2 flex-wrap">
            {[
              { label: 'Nuevo caso', to: '/casos' },
              { label: 'Buscar', to: '/busqueda' },
              { label: 'Chat RAG', to: '/chat' },
              { label: 'Audiencias', to: '/audiencias' },
            ].map(b => (
              <motion.button key={b.label} whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.99 }} onClick={() => navigate(b.to)} className="bg-[#c9a86a] text-white rounded-full px-4 py-1.5 text-sm hover:bg-[#b89455] transition-colors">
                {b.label}
              </motion.button>
            ))}
          </div>
        </Card>
      </motion.div>

      <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4 }} className="fixed bottom-6 right-[420px] hidden lg:block">
        <motion.span whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.99 }} onClick={() => navigate('/casos')} className="bg-[#b91c1c] text-white px-5 py-3 rounded-xl font-bold shadow-lg cursor-pointer opacity-80">URGENTE</motion.span>
      </motion.div>
    </div>
  )
}
