import { Table, Tag, Button } from 'antd'
export default function AdminUsuarios(){
  const cols=[{title:'NOMBRE',dataIndex:'nombre'},{title:'EMAIL',dataIndex:'email'},{title:'ROL',render:(v:any,r:any)=><Tag color={r.rol==='admin'?'gold':'default'}>{r.rol}</Tag>},{title:'ESTADO',render:(v:any,r:any)=><Tag color="success">{r.estado}</Tag>}]
  const data=[{key:1, nombre:'Mariana del Arroyo', email:'mariana@buffet.bo', rol:'admin', estado:'Activo'}, {key:2, nombre:'Santiago Acha', email:'santiago@buffet.bo', rol:'abogado', estado:'Activo'}]
  return <div className="bg-white p-4 rounded-xl border border-[#e8e0d0]"><Table columns={cols as any} dataSource={data}/><Button type="primary" style={{background:'#c9a86a'}}> + Nuevo</Button></div>
}
