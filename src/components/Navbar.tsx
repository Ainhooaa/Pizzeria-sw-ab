import { useNavigate, useLocation } from 'react-router-dom'
import { useState, useEffect } from 'react'

function Navbar() {
  const navigate = useNavigate()
  const location = useLocation()
  const [usuario, setUsuario] = useState<any>(null)

  useEffect(() => {
    const usuarioStr = localStorage.getItem('usuario')
    setUsuario(usuarioStr ? JSON.parse(usuarioStr) : null)
  }, [location])

  const cerrarSesion = () => {
    localStorage.removeItem('usuario')
    setUsuario(null)
    navigate('/')
  }

  return (
    <nav style={{
      backgroundColor: 'white',
      padding: '15px 40px',
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      boxShadow: '0 2px 10px rgba(0,0,0,0.08)',
      position: 'sticky',
      top: 0,
      zIndex: 100
    }}>
      <img
        src="/logo.jpeg"
        alt="Masa Madre"
        onClick={() => navigate('/')}
        style={{ height: '60px', cursor: 'pointer' }}
      />

      <div style={{ display: 'flex', gap: '30px' }}>
        {[['Inicio', '/'], ['Menú', '/menu'], ['Crea tu pizza', '/crea-tu-pizza'], ['Sobre nosotros', '/sobre-nosotros']].map(([label, path]) => (
          <span
            key={path}
            onClick={() => navigate(path)}
            style={{ cursor: 'pointer', color: '#555', fontSize: '0.95rem' }}
            onMouseEnter={e => e.currentTarget.style.color = '#c0392b'}
            onMouseLeave={e => e.currentTarget.style.color = '#555'}
          >
            {label}
          </span>
        ))}
      </div>

      <div style={{ display: 'flex', gap: '15px', alignItems: 'center' }}>
        {usuario ? (
          <>
            <span
              onClick={() => navigate(usuario.rol === 'admin' ? '/admin/pedidos' : '/mis-pedidos')}
              style={{ color: '#555', cursor: 'pointer', fontSize: '0.95rem' }}
              onMouseEnter={e => e.currentTarget.style.color = '#c0392b'}
              onMouseLeave={e => e.currentTarget.style.color = '#555'}
            >
              👤 {usuario.nombre}
            </span>
            {usuario.rol !== 'admin' && (
              <span
                onClick={() => navigate('/mis-pizzas')}
                style={{ color: '#555', cursor: 'pointer', fontSize: '0.95rem' }}
                onMouseEnter={e => e.currentTarget.style.color = '#c0392b'}
                onMouseLeave={e => e.currentTarget.style.color = '#555'}
              >
                Mis pizzas
              </span>
            )}
            <button
              onClick={cerrarSesion}
              style={{
                backgroundColor: 'transparent',
                border: '2px solid #c0392b',
                color: '#c0392b',
                padding: '8px 20px',
                borderRadius: '50px',
                cursor: 'pointer',
                fontFamily: 'Georgia, serif'
              }}>
              Cerrar sesión
            </button>
          </>
        ) : (
          <button
            onClick={() => navigate('/login')}
            style={{
              backgroundColor: 'transparent',
              border: '2px solid #c0392b',
              color: '#c0392b',
              padding: '8px 20px',
              borderRadius: '50px',
              cursor: 'pointer',
              fontFamily: 'Georgia, serif'
            }}>
            Login
          </button>
        )}
        <button
          onClick={() => navigate('/carrito')}
          style={{
            backgroundColor: '#c0392b',
            border: 'none',
            color: 'white',
            padding: '8px 20px',
            borderRadius: '50px',
            cursor: 'pointer',
            fontFamily: 'Georgia, serif'
          }}>
          Carrito
        </button>
      </div>
    </nav>
  )
}

export default Navbar