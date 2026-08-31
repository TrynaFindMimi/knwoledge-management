import { Calendar, Card, Tag, Button } from 'antd'
export default function Audiencias(){
  return <div className="grid grid-cols-2 gap-4">
    <Card title="Calendario — Agosto 2026"><Calendar fullscreen={false} /></Card>
    <Card title="Detalle — Garcia 2026-08-31 09:00 — Juzgado 3ro" className="border-t-2 border-t-[#c9a86a]">
      <div className="text-[12px] font-semibold text-[#1a7f37]">Tenidos (3) — Demanda v2, CI</div>
      <div className="text-[12px] font-semibold text-[#b91c1c] mt-2">Faltantes (2) — rojo</div><div className="text-[#b91c1c]">• Cert. nacimiento — FALTA</div>
      <div className="text-[#8c7348] mt-2">En tramite (1) — Comprobante</div>
      <div className="flex gap-2 mt-4"><Button>Agregar requisito</Button><Button type="primary" style={{background:'#c9a86a'}}>Generar paquete PDF</Button></div>
      <div className="text-[11px] text-[#7a756f] mt-2">Peso preview: 4.2 MB — Portada + orden checklist</div>
    </Card>
  </div>
}
