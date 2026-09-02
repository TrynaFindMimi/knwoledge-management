import { Tag } from 'antd'
export const AudienciaChecklist = ({ tenidos, faltantes, tramite }: any) => (
  <div className="space-y-2">
    <div className="text-[11px] font-semibold text-[#1a7f37]">Tenidos ({tenidos.length})</div>
    {tenidos.map((t:string)=><div key={t} className="text-[13px]">• {t}</div>)}
    <div className="text-[11px] font-semibold text-[#b91c1c]">Faltantes — rojo</div>
    {faltantes.map((t:string)=><div key={t} className="text-[#b91c1c]">• {t} — FALTA</div>)}
    <Tag color="gold">En tramite: {tramite}</Tag>
  </div>
)