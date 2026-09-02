import { Table, Button } from 'antd'
export default function AdminAuditoria(){
  const cols=[{title:'USUARIO',dataIndex:'usuario'},{title:'ACCION',dataIndex:'accion'},{title:'DOC/CASO',dataIndex:'doc'},{title:'FECHA',dataIndex:'fecha'},{title:'IP',dataIndex:'ip'}]
  const data=[{key:1, usuario:'mariana@buffet.bo', accion:'ver', doc:'Convenio Mamani', fecha:'2026-08-30 10:00', ip:'192.168.1.10'}]
  return <div className="bg-white p-4 rounded-xl border border-[#e8e0d0]"><Table columns={cols as any} dataSource={data}/><Button type="primary" style={{background:'#c9a86a'}}>Exportar reporte Excel</Button><div className="text-[11px] text-[#7a756f] mt-2">Inmutable — Intento DELETE → error permisos · hash encadenado</div></div>
}