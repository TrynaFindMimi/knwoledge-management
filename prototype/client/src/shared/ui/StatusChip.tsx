import { Tag } from 'antd'
export const StatusChip=({status}:{status:string})=> <Tag color={status==='Activo'?'success':status==='En audiencia'?'warning':'default'}>{status}</Tag>
