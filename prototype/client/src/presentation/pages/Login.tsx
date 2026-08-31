import { Form, Input, Button, Alert, Card } from 'antd'
import { useAuth } from '../hooks/useAuth'
export default function Login(){
  const { login } = useAuth()
  const onFinish = async (vals: { email: string; password: string }) => {
    try { await login(vals.email, vals.password) } catch { /* error boundary muestra Alert */ }
  }
  return (
    <div className="min-h-screen bg-[#0a0a0a] flex items-center justify-center p-6">
      <div className="w-full max-w-[420px]">
        <div className="h-[2px] bg-[#c9a86a] rounded-t-xl" />
        <Card className="rounded-t-none border-t-0">
          <div className="text-center mb-6">
            <div className="font-serif text-[20px] tracking-wide">Bienvenido</div>
            <div className="text-[11px] tracking-widest text-[#7a756f]">BUFFET DE ASISTENCIA FAMILIAR — LA PAZ</div>
          </div>
          <Form layout="vertical" onFinish={onFinish}>
            <Form.Item name="email" label="CORREO ELECTRONICO" rules={[{ required: true, type: 'email' }]}><Input placeholder="abogada@buffet.bo" /></Form.Item>
            <Form.Item name="password" label="CONTRASENA — 12 CARAC." rules={[{ required: true }]}><Input.Password placeholder="••••••••••••" /></Form.Item>
            <Button htmlType="submit" type="primary" block style={{ background: '#c9a86a', borderColor: '#c9a86a', height: 40, fontWeight: 600 }}>INGRESAR</Button>
            <Alert className="mt-4" type="error" message="Credenciales invalidas — Intento 2 de 3" description="Bloqueo tras 3 intentos — RBAC chunk-level" />
            <div className="text-center mt-4 text-[12px] text-[#8c7348]">Olvide mi contrasena → token 15 min</div>
          </Form>
        </Card>
      </div>
    </div>
  )
}
