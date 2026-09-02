import { Tabs, Tag, Badge, Button, Upload, message, Spin } from 'antd'
import { InboxOutlined } from '@ant-design/icons'
import { useParams } from 'react-router-dom'
import { useQuery } from '@tanstack/react-query'
import { motion } from 'framer-motion'
import { api } from '../../infrastructure/api/client'

export default function CasoDetail() {
  const { id } = useParams()
  const { data, isLoading, refetch } = useQuery({
    queryKey: ['caso', id],
    queryFn: async () => (await api.get(`/casos/${id}`)).data,
    enabled: !!id,
  })

  if (isLoading) return <div className="flex justify-center p-12"><Spin /></div>
  if (!data) return <div className="p-8 text-center">Caso no encontrado</div>

  const docs = data.documentos || []

  return (
    <div className="space-y-4">
      <motion.div initial={{ opacity: 0, y: 4 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.18, ease: "easeOut" }} className="bg-white p-5 rounded-2xl border border-[#e8e0d0] border-t-2 !border-t-[#c9a86a]">
        <div className="font-serif text-[16px]">{data.titulo || data.cliente} <Tag color="gold">{data.tipo}</Tag> <Badge status={data.estado === 'activo' ? 'success' : 'warning'} text={data.estado} /></div>
        <div className="text-[12px] text-[#7a756f] font-mono mt-1">{data.codigo} · Cliente: {data.cliente} · {data.documentosCount ?? docs.length} docs</div>
        <div className="flex gap-2 mt-3 flex-wrap">
          <Button onClick={() => message.info('Editar próximamente')}>Editar</Button>
          <Button onClick={async () => { await api.patch(`/casos/${id}/estado`, { estado: data.estado === 'activo' ? 'en audiencia' : 'activo' }); refetch() }}>Cambiar estado</Button>
          <Button type="primary" style={{ background: '#c9a86a', borderColor: '#c9a86a' }} onClick={async () => { const r = await api.get(`/export/caso/${id}/zip`); message.success(`${r.data.archivos} archivos — ${r.data.zip}`) }}>Export ZIP</Button>
          <Button onClick={() => window.print()}>Imprimir</Button>
        </div>
      </motion.div>

      <Tabs
        items={[
          {
            key: 'docs', label: 'Documentos', children: (
              <div className="space-y-3">
                {docs.map((d: any, i: number) => (
                  <motion.div key={d.id} initial={{ opacity: 0, x: -4 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: i * 0.02, duration: 0.16, ease: "easeOut" }} className="bg-white p-3 rounded-xl border flex justify-between items-center">
                    <span className="text-sm">{d.titulo} <Tag color="gold">{d.tipo}</Tag> <Tag>v{d.version}</Tag></span>
                    <span className="text-[#8c7348] text-xs flex gap-2">
                      <a onClick={async () => { const r = await api.get(`/documentos/${d.id}`); message.info(r.data.titulo) }}>Ver</a>
                      <a href={`${api.defaults.baseURL}/documentos/${d.id}/download`} target="_blank" rel="noreferrer">Descargar</a>
                    </span>
                  </motion.div>
                ))}
                {docs.length === 0 && <div className="text-center text-[#7a756f] py-6">Sin documentos — sube el primero</div>}
                <Upload.Dragger
                  className="mt-2"
                  beforeUpload={async (file) => {
                    const fd = new FormData()
                    fd.append('file', file)
                    try {
                      await api.post(`/casos/${id}/documentos`, fd, { headers: { 'Content-Type': 'multipart/form-data' } })
                      message.success(`${file.name} subido — vectorizado 384d`)
                      refetch()
                    } catch (e: any) {
                      if (e.response?.status === 409) message.warning('Duplicado detectado — ofrece versionar')
                      else message.error(e.response?.data?.error || 'Error al subir')
                    }
                    return false
                  }}
                  showUploadList={false}
                  accept=".pdf,.jpg,.jpeg,.png,.docx,.doc,.txt"
                >
                  <p className="ant-upload-drag-icon"><InboxOutlined /></p>
                  <p>Arrastra PDF/JPG/PNG/DOCX hasta 50MB — chunk 500/100 — embed 384d local</p>
                </Upload.Dragger>
              </div>
            )
          },
          { key: 'aud', label: 'Audiencias', children: <div className="bg-white p-4 rounded-xl border text-sm">Gestiona audiencias en <a className="text-[#8c7348]" href="/audiencias">/audiencias</a> — checklist tenido/faltante amarillo/rojo.</div> },
          { key: 'comp', label: 'Compartidos', children: <div className="bg-white p-4 rounded-xl border text-sm">Genera enlace temporal JWT 1h/24h/72h single-use desde backend local.</div> },
          { key: 'audit', label: 'Auditoría', children: <div className="bg-white p-4 rounded-xl border text-sm">Timeline quien/cuando/IP — ver /admin/auditoria.</div> },
        ]}
      />
    </div>
  )
}
