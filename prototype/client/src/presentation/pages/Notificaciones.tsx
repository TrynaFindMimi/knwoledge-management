import { Card, Tag, Calendar, Badge } from 'antd'
export default function Notificaciones(){
  return <div className="grid grid-cols-3 gap-4">
    <Card title="Calendario" className="border-t-2 border-t-[#c9a86a]"><Calendar fullscreen={false} /></Card>
    <Card title="Dropdown — 3 nuevas" extra={<a className="text-[#8c7348]">Marcar todas leidas</a>}>
      <div className="bg-[#fdf6e3] border p-2 rounded mb-2">● Audiencia Garcia — 48h — Faltan 2 docs</div>
      <div className="bg-[#fef2f2] border p-2 rounded">● Vencimiento Perez — 7d urgente</div>
    </Card>
    <Card title="Centro de notificaciones — /notificaciones"><Tag color="gold">Audiencia</Tag> Audiencia Garcia — 48h — 2026-08-31 09:00 <a className="text-[#8c7348]">Marcar leida</a></Card>
  </div>
}