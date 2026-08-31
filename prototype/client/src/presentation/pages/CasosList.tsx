import { Table, Tag, Badge, Input, Select, DatePicker, Button } from 'antd'
import { useCasos } from '../hooks/useCasos'
export default function CasosList(){
  const { data: casos, isLoading } = useCasos({}) // capa application -> infrastructure/api/casos
  const columns=[
    {title:'CLIENTE', dataIndex:'cliente', render:(v:string)=><span className="font-semibold">{v}</span>},
    {title:'TIPO', dataIndex:'tipo', render:(v:string)=><Tag color="gold">{v}</Tag>},
    {title:'ESTADO', dataIndex:'estado', render:(v:string)=><Badge status={v==='Activo'?'success':v==='En audiencia'?'warning':'default'} text={v}/>},
    {title:'AUDIENCIA', dataIndex:'audiencia'},
    {title:'DOCS', dataIndex:'docs'},
    {title:'ACCIONES', render:()=><a className="text-[#8c7348]">Ver ▾</a>},
  ]
  const data=[
    {key:1, cliente:'Mamani Choque', tipo:'Asistencia', estado:'Activo', audiencia:'2026-09-02 14:30', docs:12},
    {key:2, cliente:'Garcia Flores', tipo:'Patria', estado:'En audiencia', audiencia:'2026-08-31 09:00', docs:8},
  ]
  return <div className="space-y-4">
    <div className="bg-white p-4 rounded-xl border border-[#e8e0d0] flex gap-3">
      <Select placeholder="Tipo: Todos" style={{width:160}} options={[{value:'Asistencia',label:'Asistencia'}]} />
      <Select placeholder="Estado: Activo" style={{width:160}} />
      <Input.Search placeholder="Buscar cliente — Mamani" style={{maxWidth:280}} />
      <DatePicker placeholder="Audiencia" />
      <Button type="primary" style={{background:'#c9a86a', borderColor:'#c9a86a'}}>Buscar</Button>
      <Button>Limpiar</Button>
    </div>
    <div className="bg-white rounded-xl border border-[#e8e0d0] p-4">
      <Table columns={columns as any} dataSource={data} pagination={{pageSize:6}} />
      <Button type="primary" className="mt-3" style={{background:'#c9a86a', borderColor:'#c9a86a'}}>+ Nuevo caso</Button>
    </div>
  </div>
}
