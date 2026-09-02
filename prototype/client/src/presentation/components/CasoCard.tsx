import { Card, Tag, Badge } from 'antd'
import { Caso } from '../../domain/types'
export const CasoCard = ({ caso }: { caso: Caso }) => (
  <Card className="border-t-2 border-t-[#c9a86a] hover:shadow-md transition-shadow">
    <div className="font-serif text-[14px]">{caso.cliente}</div>
    <div className="flex gap-2 mt-2"><Tag color="gold">{caso.tipo}</Tag><Badge status={caso.estado==='activo'?'success':'warning'} text={caso.estado} /></div>
    <div className="mono text-[11px] text-[#7a756f] mt-2">Prox. {caso.proximaAudiencia} · {caso.docs} docs</div>
  </Card>
)