import { Input, Card, Tag } from 'antd'
import { useBusqueda } from '../hooks/useBusqueda'
export default function Busqueda(){
  // const { data } = useBusqueda(query, {}) // capa presentation -> application/services/ragService -> infrastructure/api/rag
  return <div className="space-y-4">
    <div className="bg-white p-4 rounded-xl border-2 border-[#c9a86a]">
      <Input.Search placeholder="convenio visitas Mamani 2024 — tolera conbenio" enterButton={<span className="bg-[#c9a86a] px-4">Buscar</span>} size="large" />
      <div className="text-[11px] text-[#7a756f] mt-2">Tolera errores y sinonimos juridicos — p95 842ms</div>
    </div>
    <div className="grid grid-cols-3 gap-4">
      <div className="col-span-2 space-y-3">
        <Card className="border-l-4 border-l-[#c9a86a]"><div className="font-semibold">Convenio Transaccional — Mamani 2024 <Tag color="success">0.91</Tag></div><div className="text-[13px]"><span className="font-semibold text-[#8c7348]">convenio</span> de visitas homologado 15/03/2024</div><div className="text-[11px] text-[#7a756f] font-mono">Fuente: Mamani · 2024-03-15 — Tags: Convenio</div></Card>
        <Card><div className="font-semibold">Acta Audiencia — Garcia <Tag color="warning">0.76</Tag></div></Card>
      </div>
      <Card title="Filtros" className="h-fit"><div className="space-y-2"><div className="bg-[#fdfbf7] border p-2 rounded">Tipo: Todos ▾</div><div className="bg-[#fdfbf7] border p-2 rounded">Caso: Mamani ▾</div></div></Card>
    </div>
  </div>
}
