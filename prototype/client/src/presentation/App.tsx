import { Routes, Route, Navigate } from 'react-router-dom'
import AppLayout from './layouts/AppLayout'
import Login from './pages/Login'
import Dashboard from './pages/Dashboard'
import CasosList from './pages/CasosList'
import CasoDetail from './pages/CasoDetail'
import Busqueda from './pages/Busqueda'
import Chat from './pages/Chat'
import Audiencias from './pages/Audiencias'
import Compartidos from './pages/Compartidos'
import Notificaciones from './pages/Notificaciones'
import AdminUsuarios from './pages/AdminUsuarios'
import AdminAuditoria from './pages/AdminAuditoria'

export default function App() {
  return (
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route element={<AppLayout />}>
        <Route path="/" element={<Dashboard />} />
        <Route path="/casos" element={<CasosList />} />
        <Route path="/casos/:id" element={<CasoDetail />} />
        <Route path="/busqueda" element={<Busqueda />} />
        <Route path="/chat" element={<Chat />} />
        <Route path="/audiencias" element={<Audiencias />} />
        <Route path="/compartidos" element={<Compartidos />} />
        <Route path="/notificaciones" element={<Notificaciones />} />
        <Route path="/admin/usuarios" element={<AdminUsuarios />} />
        <Route path="/admin/auditoria" element={<AdminAuditoria />} />
      </Route>
      <Route path="*" element={<Navigate to="/" />} />
    </Routes>
  )
}
