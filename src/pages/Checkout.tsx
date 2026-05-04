import { useNavigate } from 'react-router-dom'
import { useState } from 'react'
import Navbar from '../components/Navbar'
import { useCarrito } from '../context/CarritoContext'

function Checkout() {
  const navigate = useNavigate()
  const { items, total, vaciarCarrito } = useCarrito()
  const [forma, setForma] = useState<'entrega' | 'recogida'>('entrega')
  const [nombre, setNombre] = useState('')
  const [telefono, setTelefono] = useState('')
  const [direccion, setDireccion] = useState('')
  const [instrucciones, setInstrucciones] = useState('')
  const [cargando, setCargando] = useState(false)
  const [error, setError] = useState('')

  const usuarioStr = localStorage.getItem('usuario')
  const usuario = usuarioStr ? JSON.parse(usuarioStr) : null

  const confirmarPedido = async () => {
    // Validar usuario logueado
    if (!usuario) {
      alert('Debes iniciar sesión para hacer un pedido')
      navigate('/login')
      return
    }

    // Validar campos obligatorios
    if (!nombre || !telefono) {
      setError('El nombre y teléfono son obligatorios')
      return
    }

    if (forma === 'entrega' && !direccion) {
      setError('La dirección es obligatoria para envío a domicilio')
      return
    }

    // Validar que el carrito no esté vacío
    if (items.length === 0) {
      alert('Tu carrito está vacío')
      navigate('/menu')
      return
    }

    setCargando(true)
    setError('')

    const pedido = {
      emailUsuario: usuario.email,
      cliente: {
        nombre,
        direccion: forma === 'entrega' ? direccion : 'Recogida en local',
        telefono
      },
      items: items.map(item => ({
        tipo: item.tipo,
        pizzaNombre: item.nombre,
        cantidad: item.cantidad,
        precioUnitario: item.precio
      })),
      total: total,
      estado: 'pendiente',
      instrucciones
    }

    try {
      const res = await fetch('http://localhost:5000/api/pedidos', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(pedido)
      })

      if (res.ok) {
        const data = await res.json()
        console.log('Pedido creado:', data)
        vaciarCarrito()
        navigate('/confirmacion')
      } else {
        const errorData = await res.json()
        setError(errorData.error || 'Error al crear el pedido')
      }
    } catch (error) {
      console.error('Error:', error)
      setError('Error de conexión con el servidor')
    } finally {
      setCargando(false)
    }
  }

  // Si el carrito está vacío, mostrar mensaje y botón para volver al menú
  if (items.length === 0 && !cargando) {
    return (
      <div style={{ fontFamily: 'Georgia, serif', backgroundColor: '#fdf8f0', minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
        <Navbar />
        <div style={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '60px 20px' }}>
          <div style={{ backgroundColor: 'white', borderRadius: '16px', padding: '60px', textAlign: 'center', maxWidth: '500px' }}>
            <p style={{ fontSize: '3rem' }}>🛒</p>
            <p style={{ color: '#999', fontSize: '1.1rem', marginTop: '10px' }}>Tu carrito está vacío</p>
            <button
              onClick={() => navigate('/menu')}
              style={{
                marginTop: '20px',
                backgroundColor: '#c0392b',
                color: 'white',
                border: 'none',
                padding: '12px 30px',
                borderRadius: '50px',
                cursor: 'pointer',
                fontFamily: 'Georgia, serif'
              }}
            >
              Ver menú
            </button>
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
          <p style={{ marginTop: '8px' }}>Calle Nieves Cano 12, Vitoria-Gasteiz · +34 945 123 456</p>
          <p style={{ marginTop: '8px' }}>© 2026 Masa Madre</p>
        </footer>
      </div>
    )
  }

  return (
    <div style={{ fontFamily: 'Georgia, serif', backgroundColor: '#fdf8f0', minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>

      {/* NAVBAR */}
      <Navbar />

      {/* CONTENIDO */}
      <div style={{ flex: 1, maxWidth: '700px', margin: '0 auto', padding: '60px 20px', width: '100%' }}>

        <h1 style={{
          fontFamily: 'Cormorant Garamond, serif',
          fontStyle: 'italic',
          color: '#c0392b',
          fontSize: '3rem',
          marginBottom: '10px'
        }}>
          Tu pedido
        </h1>
        <p style={{ color: '#999', marginBottom: '40px' }}>Rellena tus datos para confirmar el pedido</p>

        {/* Resumen del pedido */}
        <div style={{
          backgroundColor: 'white',
          borderRadius: '16px',
          padding: '25px',
          marginBottom: '25px',
          boxShadow: '0 4px 20px rgba(0,0,0,0.06)'
        }}>
          <h3 style={{ color: '#2c2c2c', marginBottom: '15px' }}>Resumen de tu pedido</h3>
          {items.map((item, idx) => (
            <div key={idx} style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '10px' }}>
              <span>{item.nombre} x{item.cantidad}</span>
              <span style={{ color: '#c0392b' }}>{(item.precio * item.cantidad).toFixed(2)}€</span>
            </div>
          ))}
          <div style={{ borderTop: '1px solid #ddd', marginTop: '10px', paddingTop: '10px', display: 'flex', justifyContent: 'space-between' }}>
            <strong>Total</strong>
            <strong style={{ color: '#c0392b' }}>{total.toFixed(2)}€</strong>
          </div>
        </div>

        {/* FORMA DE ENTREGA */}
        <div style={{
          backgroundColor: 'white',
          borderRadius: '16px',
          padding: '25px',
          marginBottom: '25px',
          boxShadow: '0 4px 20px rgba(0,0,0,0.06)'
        }}>
          <h3 style={{ color: '#2c2c2c', marginBottom: '15px' }}>¿Cómo quieres recibirlo?</h3>
          <div style={{ display: 'flex', gap: '15px' }}>
            {(['entrega', 'recogida'] as const).map(op => (
              <button
                key={op}
                onClick={() => setForma(op)}
                style={{
                  flex: 1,
                  padding: '12px',
                  borderRadius: '10px',
                  border: `2px solid ${forma === op ? '#c0392b' : '#ddd'}`,
                  backgroundColor: forma === op ? '#fdf8f0' : 'white',
                  color: forma === op ? '#c0392b' : '#555',
                  cursor: 'pointer',
                  fontFamily: 'Georgia, serif',
                  fontSize: '0.95rem',
                  fontWeight: forma === op ? 'bold' : 'normal',
                  transition: 'all 0.2s'
                }}
              >
                {op === 'entrega' ? 'Entrega a domicilio' : 'Recoger en local'}
              </button>
            ))}
          </div>
        </div>

        {/* DATOS PERSONALES */}
        <div style={{
          backgroundColor: 'white',
          borderRadius: '16px',
          padding: '25px',
          marginBottom: '25px',
          boxShadow: '0 4px 20px rgba(0,0,0,0.06)'
        }}>
          <h3 style={{ color: '#2c2c2c', marginBottom: '20px' }}>Datos personales</h3>

          {/* Nombre */}
          <div style={{ marginBottom: '20px' }}>
            <label style={{ color: '#555', fontSize: '0.9rem', display: 'block', marginBottom: '6px' }}>
              Nombre completo *
            </label>
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
                fontFamily: 'Georgia, serif',
                outline: 'none',
                boxSizing: 'border-box',
                transition: 'border-color 0.2s'
              }}
              onFocus={e => e.currentTarget.style.borderColor = '#c0392b'}
              onBlur={e => e.currentTarget.style.borderColor = '#ddd'}
            />
          </div>

          {/* Teléfono */}
          <div style={{ marginBottom: '20px' }}>
            <label style={{ color: '#555', fontSize: '0.9rem', display: 'block', marginBottom: '6px' }}>
              Teléfono *
            </label>
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
                fontFamily: 'Georgia, serif',
                outline: 'none',
                boxSizing: 'border-box',
                transition: 'border-color 0.2s'
              }}
              onFocus={e => e.currentTarget.style.borderColor = '#c0392b'}
              onBlur={e => e.currentTarget.style.borderColor = '#ddd'}
            />
          </div>

          {/* Dirección (solo si es entrega) */}
          {forma === 'entrega' && (
            <div style={{ marginBottom: '20px' }}>
              <label style={{ color: '#555', fontSize: '0.9rem', display: 'block', marginBottom: '6px' }}>
                Dirección de entrega *
              </label>
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
                  fontFamily: 'Georgia, serif',
                  outline: 'none',
                  boxSizing: 'border-box',
                  transition: 'border-color 0.2s'
                }}
                onFocus={e => e.currentTarget.style.borderColor = '#c0392b'}
                onBlur={e => e.currentTarget.style.borderColor = '#ddd'}
              />
            </div>
          )}

          {/* Instrucciones */}
          <div>
            <label style={{ color: '#555', fontSize: '0.9rem', display: 'block', marginBottom: '6px' }}>
              Instrucciones especiales (opcional)
            </label>
            <textarea
              value={instrucciones}
              onChange={e => setInstrucciones(e.target.value)}
              placeholder="Sin cebolla, alérgias, instrucciones para el repartidor..."
              rows={3}
              style={{
                width: '100%',
                padding: '12px 15px',
                borderRadius: '10px',
                border: '1.5px solid #ddd',
                fontSize: '1rem',
                fontFamily: 'Georgia, serif',
                outline: 'none',
                boxSizing: 'border-box',
                resize: 'vertical',
                transition: 'border-color 0.2s'
              }}
              onFocus={e => e.currentTarget.style.borderColor = '#c0392b'}
              onBlur={e => e.currentTarget.style.borderColor = '#ddd'}
            />
          </div>
        </div>

        {/* Mensaje de error */}
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

        {/* BOTÓN CONFIRMAR */}
        <button
          onClick={confirmarPedido}
          disabled={cargando}
          style={{
            width: '100%',
            backgroundColor: cargando ? '#999' : '#c0392b',
            color: 'white',
            border: 'none',
            padding: '16px',
            borderRadius: '50px',
            fontSize: '1.1rem',
            cursor: cargando ? 'not-allowed' : 'pointer',
            fontFamily: 'Georgia, serif',
            letterSpacing: '1px',
            boxShadow: '0 4px 15px rgba(192,57,43,0.3)',
            transition: 'transform 0.2s'
          }}
          onMouseEnter={e => { if (!cargando) e.currentTarget.style.transform = 'scale(1.02)' }}
          onMouseLeave={e => e.currentTarget.style.transform = 'scale(1)'}
        >
          {cargando ? 'Procesando...' : 'Confirmar pedido →'}
        </button>

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

export default Checkout