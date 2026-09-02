import { Table, Tag, Badge, Input, Select, Button, Modal, Form, message } from 'antd'
import { useState } from 'react'
import { motion } from 'framer-motion'
import { useNavigate } from 'react-router-dom'
import { useCasos, useCreateCaso } from '../hooks/useCasos'

export default function CasosList() {
  const [filtros, setFiltros] = useState<any>({})
  const [q, setQ] = useState('')
  const [open, setOpen] = useState(false)
  const [form] = Form.useForm()
  const navigate = useNavigate()
  const { data, isLoading, refetch } = useCasos({ ...filtros, q: q || undefined } as any)
  const crear = useCreateCaso()

  const casos = (data as any)?.casos ?? (data as any)?.data ?? []
  const columns = [
    { title: 'CLIENTE', dataIndex: 'cliente', render: (v: string) => <span className="font-semibold">{v}</span> },
    { title: 'CÓDIGO', dataIndex: 'codigo', render: (v: string) => <span className="font-mono text-[11px]">{v}</span> },
    { title: 'TIPO', dataIndex: 'tipo', render: (v: string) => <Tag color="gold">{v}</Tag> },
    { title: 'ESTADO', dataIndex: 'estado', render: (v: string) => <Badge status={v === 'activo' ? 'success' : v === 'en audiencia' ? 'warning' : 'default'} text={v} /> },
    { title: 'AUDIENCIA', dataIndex: 'proximaAudiencia', render: (v: string) => v ? <span className="text-[12px]">{v.slice(0,10)}</span> : <span className="text-[#aaa]">—</span> },
    { title: 'DOCS', dataIndex: 'documentosCount' },
    { title: 'ACCIONES', render: (_: any, r: any) => <a className="text-[#8c7348] hover:underline" onClick={() => navigate(`/casos/${r.id}`)}>Ver ▸</a> },
  ]

  async function handleCreate(vals: any) {
    try {
      await crear.mutateAsync(vals)
      message.success('Caso creado')
      setOpen(false)
      form.resetFields()
      refetch()
    } catch (e: any) { message.error(e?.response?.data?.error || 'Error') }
  }

  return (
    <div className="space-y-4">
      <motion.div initial={{ opacity: 0, y: 4 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.18, ease: "easeOut" }} className="bg-white p-4 rounded-2xl border border-[#e8e0d0] flex gap-3 flex-wrap items-center">
        <Select placeholder="Tipo: Todos" style={{ width: 160 }} allowClear onChange={v => setFiltros((f: any) => ({ ...f, tipo: v }))} options={[{ value: 'asistencia', label: 'Asistencia' }, { value: 'patria', label: 'Patria' }, { value: 'violencia', label: 'Violencia' }]} />
        <Select placeholder="Estado: Todos" style={{ width: 160 }} allowClear onChange={v => setFiltros((f: any) => ({ ...f, estado: v }))} options={[{ value: 'activo', label: 'Activo' }, { value: 'en audiencia', label: 'En audiencia' }, { value: 'cerrado', label: 'Cerrado' }]} />
        <Input.Search placeholder="Buscar cliente — Mamani" style={{ maxWidth: 280 }} value={q} onChange={e => setQ(e.target.value)} onSearch={() => refetch()} allowClear />
        <Button onClick={() => { setQ(''); setFiltros({}); refetch() }}>Limpiar</Button>
        <div className="ml-auto">
          <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.99 }}>
            <Button type="primary" onClick={() => setOpen(true)} style={{ background: '#c9a86a', borderColor: '#c9a86a' }}>+ Nuevo caso</Button>
          </motion.div>
        </div>
      </motion.div>

      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.04, duration: 0.18 }} className="bg-white rounded-2xl border border-[#e8e0d0] p-4">
        <Table columns={columns as any} dataSource={casos.map((c: any) => ({ ...c, key: c.id }))} pagination={{ pageSize: 6 }} loading={isLoading || crear.isPending} />
      </motion.div>

      <Modal title="Nuevo caso" open={open} onCancel={() => setOpen(false)} footer={null}>
        <Form form={form} layout="vertical" onFinish={handleCreate}>
          <Form.Item name="titulo" label="Título" rules={[{ required: true }]}><Input placeholder="Mamani — Asistencia 2024" /></Form.Item>
          <Form.Item name="cliente" label="Cliente" rules={[{ required: true }]}><Input placeholder="Mamani Quispe" /></Form.Item>
          <Form.Item name="tipo" label="Tipo" rules={[{ required: true }]}><Select options={[{ value: 'asistencia', label: 'Asistencia' }, { value: 'patria', label: 'Patria' }, { value: 'violencia', label: 'Violencia' }, { value: 'otro', label: 'Otro' }]} /></Form.Item>
          <Form.Item name="descripcion" label="Descripción"><Input.TextArea rows={2} /></Form.Item>
          <Button htmlType="submit" type="primary" block loading={crear.isPending} style={{ background: '#c9a86a', borderColor: '#c9a86a' }}>Crear caso</Button>
        </Form>
      </Modal>
    </div>
  )
}
