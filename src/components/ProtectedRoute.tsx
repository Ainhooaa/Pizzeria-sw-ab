import { Navigate } from 'react-router-dom'

interface ProtectedRouteProps {
  children: React.ReactNode
  adminOnly?: boolean
}

function ProtectedRoute({ children, adminOnly = false }: ProtectedRouteProps) {
  const usuarioStr = localStorage.getItem('usuario')
  const usuario = usuarioStr ? JSON.parse(usuarioStr) : null

  // Si no hay usuario logueado, redirigir al login
  if (!usuario) {
    return <Navigate to="/login" replace />
  }

  // Si la ruta es solo para admin y el usuario no es admin, redirigir al inicio
  if (adminOnly && usuario.rol !== 'admin') {
    return <Navigate to="/" replace />
  }

  // Si está todo bien, mostrar el componente
  return <>{children}</>
}

export default ProtectedRoute