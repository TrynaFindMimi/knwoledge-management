import { Table, Tag, Button, Modal, Input, Select } from 'antd'
import { useState } from 'react'
export default function Compartidos(){
  const [open,setOpen]=useState(false)
  const cols=[
    {title:'DOCUMENTO', dataIndex:'doc'},
    {title:'DESTINATARIO', dataIndex:'dest'},
    {title:'DURACION', dataIndex:'dur'},
    {title:'ESTADO', render:(v:any, r:any)=><Tag color={r.estado==='Activo'?'success':'default'}>{r.estado}</Tag>},
    {title:'ACCIONES', render:()=><a className="text-[#8c7348]">Revocar</a>},
  ]
  const data=[{key:1, doc:'Convenio Mamani.pdf', dest:'defensoria@bo', dur:'24h', estado:'Activo'}, {key:2, doc:'Informe Garcia.pdf', dest:'slim@bo', dur:'72h', estado:'Expirado'}]
  return <div className="bg-white p-4 rounded-xl border border-[#e8e0d0]">
    <Table columns={cols as any} dataSource={data} />
    <Button type="primary" style={{background:'#c9a86a'}} onClick={()=>setOpen(true)}>Compartir</Button>
    <Modal open={open} onCancel={()=>setOpen(false)} title="Compartir — Watermark nombre/fecha" footer={null}>
      <Select placeholder="Duracion: 24h" style={{width:'48%'}} /><Select placeholder="Solo lectura" style={{width:'48%', marginLeft:8}} />
      <Input placeholder="Email destinatario" className="mt-3" />
      <Button type="primary" block className="mt-3" style={{background:'#c9a86a'}}>Generar enlace — JWT truncado eyJ...</Button>
    </Modal>
  </div>
}
