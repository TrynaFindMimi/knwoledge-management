import { Layout, Menu, Input, Badge, Avatar } from 'antd'
import { SearchOutlined, BellOutlined, DashboardOutlined, FolderOpenOutlined, SearchOutlined as SearchIcon, MessageOutlined, CalendarOutlined, ShareAltOutlined, AuditOutlined, TeamOutlined } from '@ant-design/icons'
import { Outlet, useNavigate, useLocation } from 'react-router-dom'
import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import ChatWidget from '../components/ChatWidget'
import { api } from '../../infrastructure/api/client'

const { Header, Sider, Content } = Layout

export default function AppLayout() {
  const [collapsed, setCollapsed] = useState(false)
  const [q, setQ] = useState('')
  const [notifCount, setNotifCount] = useState(3)
  const navigate = useNavigate()
  const { pathname } = useLocation()

  useEffect(() => {
    api.get('/notificaciones').then(r => setNotifCount(r.data.noLeidas ?? r.data.notificaciones?.filter((n: any) => !n.leida).length ?? 0)).catch(() => {})
  }, [pathname])

  const items = [
    { key: '/', label: 'Dashboard', icon: <DashboardOutlined /> },
    { key: '/casos', label: 'Casos', icon: <FolderOpenOutlined /> },
    { key: '/busqueda', label: 'Búsqueda', icon: <SearchIcon /> },
    { key: '/chat', label: 'Chat RAG', icon: <MessageOutlined /> },
    { key: '/audiencias', label: 'Audiencias', icon: <CalendarOutlined /> },
    { key: '/compartidos', label: 'Compartidos', icon: <ShareAltOutlined /> },
    { key: '/admin/auditoria', label: 'Auditoría', icon: <AuditOutlined /> },
    { key: '/admin/usuarios', label: 'Usuarios', icon: <TeamOutlined /> },
  ]

  return (
    <Layout className="min-h-screen bg-[#0a0a0a]">
      <Sider collapsible collapsed={collapsed} onCollapse={setCollapsed} width={216} style={{ background: '#0f0f0f', borderRight: '1px solid #2a2420' }} breakpoint="lg">
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.18 }} className="h-12 flex items-center px-5 border-b border-[#2a2420]">
          <span className="font-serif text-[15px] font-semibold text-[#f5f0e8] tracking-widest">BUFFET</span>
          <span className="font-serif text-[15px] font-light text-[#c9a86a] tracking-widest ml-1">KM</span>
        </motion.div>
        <Menu theme="dark" mode="inline" selectedKeys={[pathname]} items={items} onClick={({ key }) => navigate(key)} style={{ background: '#0f0f0f', border: 0 }} />
      </Sider>
      <Layout>
        <Header className="bg-white border-b border-[#e8e0d0] flex items-center justify-between px-6 h-14 sticky top-0 z-10">
          <Input.Search
            placeholder="Buscar global — Mamani…"
            className="max-w-[320px]"
            allowClear
            value={q}
            onChange={e => setQ(e.target.value)}
            onSearch={v => { if (v.trim()) navigate(`/busqueda?q=${encodeURIComponent(v)}`) }}
          />
          <div className="flex items-center gap-4">
            <motion.div whileHover={{ scale: 1.04 }} whileTap={{ scale: 0.98 }} onClick={() => navigate('/notificaciones')} className="cursor-pointer">
              <Badge count={notifCount} color="#c9a86a"><BellOutlined className="text-[18px]" /></Badge>
            </motion.div>
            <Avatar style={{ background: '#c9a86a' }} className="cursor-pointer" onClick={() => navigate('/admin/usuarios')}>MA</Avatar>
          </div>
        </Header>
        <Content className="m-4 p-6 bg-[#f8fafc] rounded-xl border border-[#e8e0d0] min-h-[600px]">
          <motion.div initial={{ opacity: 0, y: 4 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.18, ease: "easeOut" }}>
            <Outlet />
          </motion.div>
        </Content>
      </Layout>
      <ChatWidget />
    </Layout>
  )
}
