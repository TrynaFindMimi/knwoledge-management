import { Card, Tag } from 'antd'
export const BusquedaResultCard = ({ titulo, snippet, score, fuente }: any) => (
  <Card className="border-l-4 border-l-[#c9a86a]">
    <div className="font-semibold">{titulo} <Tag color={score>0.85?'success':'warning'}>{score}</Tag></div>
    <div className="text-[13px] mt-1" dangerouslySetInnerHTML={{__html: snippet}} />
    <div className="mono text-[10px] text-[#7a756f] mt-2">Fuente: {fuente.caso} · {fuente.fecha}</div>
  </Card>
)