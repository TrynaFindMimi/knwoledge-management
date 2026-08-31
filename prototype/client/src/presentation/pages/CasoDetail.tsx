import { Tabs, Tag, Badge, Button, Upload } from 'antd'
import { InboxOutlined } from '@ant-design/icons'
import { services } from '../../composition/container'
export default function CasoDetail(){
  // upload via application service: services.rag.subirDocumento(casoId, file)
  return <div className="space-y-4">
    <div className="bg-white p-4 rounded-xl border border-[#e8e0d0] border-t-2 border-t-[#c9a86a]">
      <div className="font-serif text-[16px]">Mamani Choque — Alimentos 2024 <Tag color="gold">Asistencia</Tag> <Badge status="success" text="Activo" /></div>
      <div className="flex gap-2 mt-3"><Button>Editar</Button><Button>Cambiar estado</Button><Button type="primary" style={{background:'#c9a86a', borderColor:'#c9a86a'}}>Export ZIP</Button><Button>Imprimir</Button></div>
    </div>
    <Tabs items={[
      {key:'docs', label:'Documentos', children: <div><div className="bg-white p-3 rounded-lg border flex justify-between"><span>2024-08-28 Convenio Visitas Mamani.pdf <Tag color="gold">Convenio</Tag> <Tag>v2</Tag></span><span className="text-[#8c7348]">Ver · Descargar · Compartir</span></div>
        <Upload.Dragger className="mt-4" style={{background:'#fdfbf7'}}><p className="ant-upload-drag-icon"><InboxOutlined /></p><p>Arrastra PDF/JPG/PNG/DOCX hasta 50MB — chunk 500/100 — embed 768d</p></Upload.Dragger>
        <div className="mt-3 bg-[#fdf6e3] border border-[#e8e0d0] p-3 rounded-lg">Similar a Convenio 2024-03-15 — 87% — <Button size="small">Es duplicado</Button> <Button size="small" type="primary" style={{background:'#c9a86a'}}>Es version nueva</Button></div></div>},
      {key:'aud', label:'Audiencias', children: 'Calendar + checklist Tenidos/Faltantes'},
      {key:'comp', label:'Compartidos', children: 'JWT 1h/24h/72h'},
      {key:'audit', label:'Auditoria', children: 'Timeline quien/cuando/IP'},
    ]}/>
  </div>
}
