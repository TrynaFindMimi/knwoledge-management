import { Layout, Menu, Input, Badge, Avatar, Drawer } from 'antd'
import { SearchOutlined, BellOutlined, DashboardOutlined, FolderOpenOutlined, SearchOutlined as SearchIcon, MessageOutlined, CalendarOutlined, ShareAltOutlined, AuditOutlined, TeamOutlined } from '@ant-design/icons'
import { Outlet, useNavigate, useLocation } from 'react-router-dom'
import { useState } from 'react'

const { Header, Sider, Content } = Layout

export default function AppLayout() {
  const [collapsed, setCollapsed] = useState(false)
  const navigate = useNavigate()
  const { pathname } = useLocation()
  const items = [
    { key: '/', label: 'Dashboard', icon: <DashboardOutlined /> },
    { key: '/casos', label: 'Casos', icon: <FolderOpenOutlined /> },
    { key: '/busqueda', label: 'Busqueda', icon: <SearchIcon /> },
    { key: '/chat', label: 'Chat RAG', icon: <MessageOutlined /> },
    { key: '/audiencias', label: 'Audiencias', icon: <CalendarOutlined /> },
    { key: '/compartidos', label: 'Compartidos', icon: <ShareAltOutlined /> },
    { key: '/admin/auditoria', label: 'Auditoria', icon: <AuditOutlined /> },
    { key: '/admin/usuarios', label: 'Usuarios', icon: <TeamOutlined /> },
  ]
  return (
    <Layout className="min-h-screen bg-[#0a0a0a]">
      <Sider collapsible collapsed={collapsed} onCollapse={setCollapsed} width={216} style={{ background: '#0f0f0f', borderRight: '1px solid #2a2420' }} breakpoint="lg">
        <div className="h-12 flex items-center px-5 border-b border-[#2a2420]">
          <span className="font-serif text-[15px] font-semibold text-[#f5f0e8] tracking-widest">BUFFET</span>
          <span className="font-serif text-[15px] font-light text-[#c9a86a] tracking-widest ml-1">KM</span>
        </div>
        <Menu theme="dark" mode="inline" selectedKeys={[pathname]} items={items} onClick={({key})=>navigate(key)} style={{ background: '#0f0f0f', border: 0 }} />
      </Sider>
      <Layout>
        <Header className="bg-white border-b border-[#e8e0d0] flex items-center justify-between px-6 h-14">
          <Input.Search placeholder="Buscar global — Mamani…" className="max-w-[320px]" allowClear />
          <div className="flex items-center gap-4">
            <Badge count={3} color="#c9a86a"><BellOutlined className="text-[18px]" /></Badge>
            <Avatar style={{ background: '#c9a86a' }}>MA</Avatar>
          </div>
        </Header>
        <Content className="m-4 p-6 bg-[#f8fafc] rounded-xl border border-[#e8e0d0] min-h-[600px]">
          <Outlet />
        </Content>
      </Layout>
      {/* Drawer flotante Chat siempre visible en desktop */}
      <div className="hidden xl:block fixed bottom-6 right-6 w-[360px] h-[480px] bg-white rounded-xl border border-[#e8e0d0] shadow-xl overflow-hidden">
        <div className="h-10 bg-[#fdfbf7] border-b border-[#e8e0d0] flex items-center px-4 text-[12px] font-semibold">Chat RAG — citas</div>
        <div className="p-3 text-[11px] text-[#7a756f]">Drawer flotante — ver /chat</div>
      </div>
    </Layout>
  )
}
