import { useNavigate } from 'react-router-dom'
import { useState } from 'react'

function Login() {
  const navigate = useNavigate()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [cargando, setCargando] = useState(false)

  const handleLogin = () => {
    if (!email || !password) {
      setError('Rellena todos los campos')
      return
    }
    setCargando(true)
    setError('')

    fetch('http://localhost:3000/usuarios/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password })
    })
      .then(res => res.json())
      .then(data => {
        setCargando(false)
        if (data.error) {
          setError(data.error)
        } else {
          localStorage.setItem('usuario', JSON.stringify(data))
          if (data.rol === 'admin') {
            navigate('/admin/pedidos')
          } else {
            navigate('/')
          }
        }
      })
      .catch(() => {
        setCargando(false)
        setError('Error al conectar con el servidor')
      })
  }

  return (
    <div style={{
      fontFamily: 'Georgia, serif',
      backgroundColor: '#fdf8f0',
      minHeight: '100vh',
      display: 'flex',
      flexDirection: 'column'
    }}>

      {/* NAVBAR */}
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
      </nav>

      {/* FORMULARIO */}
      <div style={{
        flex: 1,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '40px 20px'
      }}>
        <div style={{
          backgroundColor: 'white',
          borderRadius: '20px',
          padding: '50px 40px',
          width: '100%',
          maxWidth: '420px',
          boxShadow: '0 4px 30px rgba(0,0,0,0.1)',
          borderTop: '5px solid #c0392b'
        }}>
          <h1 style={{
            fontFamily: 'Cormorant Garamond, serif',
            fontStyle: 'italic',
            color: '#c0392b',
            fontSize: '2.5rem',
            textAlign: 'center',
            margin: '0 0 10px'
          }}>
            Bienvenido
          </h1>
          <p style={{ textAlign: 'center', color: '#999', marginBottom: '30px', fontSize: '0.9rem' }}>
            Inicia sesión para gestionar tus pedidos
          </p>

          {error && (
            <div style={{
              backgroundColor: '#fdf0f0',
              border: '1px solid #c0392b',
              borderRadius: '10px',
              padding: '12px',
              marginBottom: '20px',
              color: '#c0392b',
              fontSize: '0.9rem',
              textAlign: 'center'
            }}>
              {error}
            </div>
          )}

          <div style={{ marginBottom: '20px' }}>
            <label style={{ color: '#555', fontSize: '0.9rem', display: 'block', marginBottom: '6px' }}>
              Email
            </label>
            <input
              type="email"
              value={email}
              onChange={e => setEmail(e.target.value)}
              placeholder="tu@email.com"
              style={{
                width: '100%',
                padding: '12px 15px',
                borderRadius: '10px',
                border: '1.5px solid #ddd',
                fontSize: '1rem',
                fontFamily: 'Georgia, serif',
                outline: 'none',
                boxSizing: 'border-box',
                transition: 'border-color 0.2s'
              }}
              onFocus={e => e.currentTarget.style.borderColor = '#c0392b'}
              onBlur={e => e.currentTarget.style.borderColor = '#ddd'}
            />
          </div>

          <div style={{ marginBottom: '30px' }}>
            <label style={{ color: '#555', fontSize: '0.9rem', display: 'block', marginBottom: '6px' }}>
              Contraseña
            </label>
            <input
              type="password"
              value={password}
              onChange={e => setPassword(e.target.value)}
              placeholder="••••••••"
              style={{
                width: '100%',
                padding: '12px 15px',
                borderRadius: '10px',
                border: '1.5px solid #ddd',
                fontSize: '1rem',
                fontFamily: 'Georgia, serif',
                outline: 'none',
                boxSizing: 'border-box',
                transition: 'border-color 0.2s'
              }}
              onFocus={e => e.currentTarget.style.borderColor = '#c0392b'}
              onBlur={e => e.currentTarget.style.borderColor = '#ddd'}
            />
          </div>

          <button
            onClick={handleLogin}
            disabled={cargando}
            style={{
              width: '100%',
              backgroundColor: cargando ? '#999' : '#c0392b',
              color: 'white',
              border: 'none',
              padding: '14px',
              borderRadius: '50px',
              fontSize: '1rem',
              cursor: cargando ? 'not-allowed' : 'pointer',
              fontFamily: 'Georgia, serif',
              letterSpacing: '1px',
              boxShadow: '0 4px 15px rgba(192,57,43,0.3)',
              transition: 'transform 0.2s'
            }}
            onMouseEnter={e => { if (!cargando) e.currentTarget.style.transform = 'scale(1.02)' }}
            onMouseLeave={e => e.currentTarget.style.transform = 'scale(1)'}
          >
            {cargando ? 'Iniciando sesión...' : 'Iniciar sesión'}
          </button>

        </div>
      </div>

      {/* FOOTER */}
      <footer style={{
        backgroundColor: '#2c2c2c',
        color: '#aaa',
        textAlign: 'center',
        padding: '30px',
        fontSize: '0.9rem'
      }}>
        <p style={{ color: 'white', fontFamily: 'Cormorant Garamond, serif', fontStyle: 'italic', fontSize: '1.3rem' }}>
        Masa Madre
        </p>
        <p style={{ marginTop: '8px' }}>Calle Nieves Cano 12, Vitoria-Gasteiz · +34 945 123 456</p>
        <p style={{ marginTop: '8px' }}>© 2026 Masa Madre</p>
      </footer>

    </div>
  )
}

export default Login