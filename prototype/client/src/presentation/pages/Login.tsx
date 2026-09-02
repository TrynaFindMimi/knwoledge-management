import { Form, Input, Button, Alert, Card, message } from 'antd'
import { useAuth } from '../hooks/useAuth'
import { motion } from 'framer-motion'
import { useNavigate } from 'react-router-dom'
import { useState } from 'react'

export default function Login() {
  const { login } = useAuth()
  const navigate = useNavigate()
  const [err, setErr] = useState('')
  const [loading, setLoading] = useState(false)

  const onFinish = async (vals: { email: string; password: string }) => {
    setErr('')
    setLoading(true)
    try {
      const data: any = await login(vals.email, vals.password)
      if (data?.accessToken) localStorage.setItem('accessToken', data.accessToken)
      if (data?.refreshToken) localStorage.setItem('refreshToken', data.refreshToken)
      message.success('Bienvenido')
      navigate('/')
    } catch (e: any) {
      setErr(e?.response?.data?.error || 'Credenciales inválidas')
    } finally { setLoading(false) }
  }

  return (
    <div className="min-h-screen bg-[#0a0a0a] flex items-center justify-center p-6">
      <motion.div initial={{ opacity: 0, y: 6 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.22, ease: "easeOut" }} className="w-full max-w-[420px]">
        <div className="h-[2px] bg-[#c9a86a] rounded-t-xl" />
        <Card className="rounded-t-none border-t-0 !rounded-b-2xl shadow-xl">
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.08, duration: 0.18 }} className="text-center mb-6">
            <div className="font-serif text-[20px] tracking-wide">Bienvenido</div>
            <div className="text-[11px] tracking-widest text-[#7a756f]">BUFFET DE ASISTENCIA FAMILIAR — LA PAZ</div>
            <div className="text-[11px] text-[#c9a86a] mt-1">SQL sqlite + NoSQL json + Vector 384d local</div>
          </motion.div>
          <Form layout="vertical" onFinish={onFinish} initialValues={{ email: 'admin@buffet.bo', password: 'Admin123!@#abc' }}>
            <Form.Item name="email" label="CORREO ELECTRÓNICO" rules={[{ required: true, type: 'email' }]}><Input placeholder="admin@buffet.bo" /></Form.Item>
            <Form.Item name="password" label="CONTRASEÑA — 12 CARAC." rules={[{ required: true }]}><Input.Password placeholder="••••••••••••" /></Form.Item>
            <motion.div whileTap={{ scale: 0.99 }}>
              <Button htmlType="submit" type="primary" block loading={loading} style={{ background: '#c9a86a', borderColor: '#c9a86a', height: 40, fontWeight: 600 }}>INGRESAR</Button>
            </motion.div>
            {err && <Alert className="mt-4" type="error" message={err} />}
            <div className="text-[11px] text-[#7a756f] mt-3 bg-[#fdfbf7] border border-[#e8e0d0] rounded-lg p-2">
              Demo: admin@buffet.bo / Admin123!@#abc · maria@buffet.bo / Abogado123!@# · carlos@buffet.bo / Asist123!@#abc
            </div>
          </Form>
        </Card>
      </motion.div>
    </div>
  )
}
