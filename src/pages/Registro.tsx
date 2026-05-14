import { useNavigate } from 'react-router-dom'
import { useState } from 'react'

function Registro() {
  const navigate = useNavigate()
  const [nombre, setNombre] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [telefono, setTelefono] = useState('')
  const [direccion, setDireccion] = useState('')
  const [error, setError] = useState('')
  const [cargando, setCargando] = useState(false)

  const handleRegistro = async () => {
    if (!nombre || !email || !password || !telefono || !direccion) {
      setError('Todos los campos son obligatorios')
      return
    }

    setCargando(true)
    setError('')

    try {
      const res = await fetch('http://localhost:5000/api/usuarios/registro', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ nombre, email, password, telefono, direccion })
      })

      const data = await res.json()

      if (!res.ok || data.error) {
        setError(data.error || 'Error al registrarse')
        setCargando(false)
        return
      }

      alert('Registro exitoso. Ahora inicia sesión')
      navigate('/login')

    } catch (error) {
      console.error('Error de conexión:', error)
      setError('Error al conectar con el servidor')
      setCargando(false)
    }
  }

  return (
    <div style={{
      fontFamily: 'Georgia, serif',
      backgroundColor: '#fdf8f0',
      minHeight: '100vh',
      display: 'flex',
      flexDirection: 'column'
    }}>
      <div style={{
        backgroundColor: 'white',
        padding: '15px 40px',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        boxShadow: '0 2px 10px rgba(0,0,0,0.08)'
      }}>
        <img
          src="/logo.jpeg"
          alt="Masa Madre"
          onClick={() => navigate('/')}
          style={{ height: '60px', cursor: 'pointer' }}
        />
        <button
          onClick={() => navigate('/carrito')}
          style={{
            backgroundColor: '#c0392b',
            border: 'none',
            color: 'white',
            padding: '8px 20px',
            borderRadius: '50px',
            cursor: 'pointer'
          }}>
          Carrito
        </button>
      </div>

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
            Crear cuenta
          </h1>
          <p style={{ textAlign: 'center', color: '#999', marginBottom: '30px' }}>
            Regístrate para pedir tu pizza
          </p>

          {error && (
            <div style={{
              backgroundColor: '#fdf0f0',
              border: '1px solid #c0392b',
              borderRadius: '10px',
              padding: '12px',
              marginBottom: '20px',
              color: '#c0392b',
              textAlign: 'center'
            }}>
              {error}
            </div>
          )}

          <div style={{ marginBottom: '15px' }}>
            <label style={{ color: '#555', display: 'block', marginBottom: '6px' }}>Nombre completo *</label>
            <input
              type="text"
              value={nombre}
              onChange={e => setNombre(e.target.value)}
              placeholder="Tu nombre"
              style={{
                width: '100%',
                padding: '12px 15px',
                borderRadius: '10px',
                border: '1.5px solid #ddd',
                fontSize: '1rem',
                boxSizing: 'border-box'
              }}
            />
          </div>

          <div style={{ marginBottom: '15px' }}>
            <label style={{ color: '#555', display: 'block', marginBottom: '6px' }}>Email *</label>
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
                boxSizing: 'border-box'
              }}
            />
          </div>

          <div style={{ marginBottom: '15px' }}>
            <label style={{ color: '#555', display: 'block', marginBottom: '6px' }}>Contraseña *</label>
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
                boxSizing: 'border-box'
              }}
            />
          </div>

          <div style={{ marginBottom: '15px' }}>
            <label style={{ color: '#555', display: 'block', marginBottom: '6px' }}>Teléfono *</label>
            <input
              type="tel"
              value={telefono}
              onChange={e => setTelefono(e.target.value)}
              placeholder="+34 600 000 000"
              style={{
                width: '100%',
                padding: '12px 15px',
                borderRadius: '10px',
                border: '1.5px solid #ddd',
                fontSize: '1rem',
                boxSizing: 'border-box'
              }}
            />
          </div>

          <div style={{ marginBottom: '30px' }}>
            <label style={{ color: '#555', display: 'block', marginBottom: '6px' }}>Dirección *</label>
            <input
              type="text"
              value={direccion}
              onChange={e => setDireccion(e.target.value)}
              placeholder="Calle, número, piso..."
              style={{
                width: '100%',
                padding: '12px 15px',
                borderRadius: '10px',
                border: '1.5px solid #ddd',
                fontSize: '1rem',
                boxSizing: 'border-box'
              }}
            />
          </div>

          <button
            onClick={handleRegistro}
            disabled={cargando}
            style={{
              width: '100%',
              backgroundColor: cargando ? '#999' : '#c0392b',
              color: 'white',
              border: 'none',
              padding: '14px',
              borderRadius: '50px',
              fontSize: '1rem',
              cursor: cargando ? 'not-allowed' : 'pointer'
            }}
          >
            {cargando ? 'Registrando...' : 'Registrarse'}
          </button>

          <div style={{ textAlign: 'center', marginTop: '20px' }}>
            <span style={{ color: '#999' }}>
              ¿Ya tienes cuenta?{' '}
              <span
                onClick={() => navigate('/login')}
                style={{ color: '#c0392b', cursor: 'pointer', textDecoration: 'underline' }}
              >
                Inicia sesión aquí
              </span>
            </span>
          </div>
          <div style={{ textAlign: 'center', marginTop: '15px' }}>
            <span
              onClick={() => navigate('/menu')}
              style={{ color: '#999', cursor: 'pointer', fontSize: '0.85rem' }}
              onMouseEnter={e => e.currentTarget.style.color = '#c0392b'}
              onMouseLeave={e => e.currentTarget.style.color = '#999'}
            >
              ← Volver al menú principal
            </span>
          </div>
        </div>
      </div>

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
        <p>Calle Nieves Cano 12, Vitoria-Gasteiz · +34 945 123 456</p>
        <p>© 2026 Masa Madre</p>
      </footer>
    </div>
  )
}

export default Registro