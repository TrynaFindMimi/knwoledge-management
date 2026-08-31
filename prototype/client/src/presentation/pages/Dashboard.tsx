import { Card, Statistic, Table, Tag, Badge } from 'antd'
export default function Dashboard(){
  const columns = [
    { title: 'FECHA', dataIndex: 'fecha', key: 'fecha' },
    { title: 'CLIENTE', dataIndex: 'cliente', key: 'cliente' },
    { title: 'JUZGADO', dataIndex: 'juzgado', key: 'juzgado' },
    { title: 'ESTADO', dataIndex: 'estado', key: 'estado', render: (v:string)=> <Tag color={v==='Listo'?'success':v==='Faltan 2'?'warning':'default'}>{v}</Tag> },
  ]
  const data = [
    { key:1, fecha:'2026-08-31', cliente:'Garcia', juzgado:'3ro 09:00', estado:'Faltan 2' },
    { key:2, fecha:'2026-09-02', cliente:'Mamani', juzgado:'1ro 14:30', estado:'Listo' },
  ]
  return (
    <div className="space-y-4">
      <div className="grid grid-cols-4 gap-4">
        <Card className="border-t-2 border-t-[#c9a86a]"><Statistic title="Casos activos" value={52} suffix={<span className="text-[11px] text-[#1a7f37]">+2</span>} /></Card>
        <Card><Statistic title="Docs del mes" value={127} /></Card>
        <Card><Statistic title="Audiencias" value={8} /></Card>
        <Card className="bg-[#1a1a1a]"><Statistic title={<span className="text-[#c9a86a]">Alertas activas</span>} value={5} valueStyle={{ color:'#fff' }} /></Card>
      </div>
      <div className="grid grid-cols-2 gap-4">
        <Card title="Casos por tipo"><div className="flex gap-4"><div className="w-20 h-20 bg-[#c9a86a] rounded-lg" /><div className="w-20 h-16 bg-[#e8e0d0] rounded-lg" /><div className="w-20 h-14 bg-[#fdf6e3] rounded-lg border" /></div></Card>
        <Card title="Proximas audiencias" extra={<a className="text-[#8c7348]">Ver todas</a>}><Table columns={columns} dataSource={data} pagination={false} size="small" /></Card>
      </div>
      <Card title="Docs recientes"><div className="flex gap-2"><Tag color="gold">Convenio Mamani 2024 — v2</Tag><Tag>Cert. Perez — v1</Tag></div></Card>
      <div className="fixed bottom-6 right-[380px]"><span className="bg-[#b91c1c] text-white px-5 py-3 rounded-lg font-bold shadow-lg">URGENTE</span></div>
    </div>
  )
}
