import { useNavigate } from 'react-router-dom'
import { useState } from 'react'
import Navbar from '../components/Navbar'
import { useCarrito } from '../context/CarritoContext'

function Checkout() {
  const navigate = useNavigate()
  const { items, total, vaciarCarrito } = useCarrito()
  const [forma, setForma] = useState<'entrega' | 'recogida'>('entrega')
  const [instrucciones, setInstrucciones] = useState('')
  const [cargando, setCargando] = useState(false)
  const [error, setError] = useState('')

  const usuarioStr = localStorage.getItem('usuario')
  const usuario = usuarioStr ? JSON.parse(usuarioStr) : null

  const confirmarPedido = async () => {
    if (!usuario) {
      alert('Debes iniciar sesión para hacer un pedido')
      navigate('/login')
      return
    }

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
        nombre: usuario.nombre,
        direccion: forma === 'entrega' ? usuario.direccion : 'Recogida en local',
        telefono: usuario.telefono
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
      <Navbar />

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
        <p style={{ color: '#999', marginBottom: '40px' }}>Confirma los detalles de tu pedido</p>

        {/* DATOS DEL USUARIO */}
        <div style={{
          backgroundColor: 'white',
          borderRadius: '16px',
          padding: '25px',
          marginBottom: '25px',
          boxShadow: '0 4px 20px rgba(0,0,0,0.06)'
        }}>
          <h3 style={{ color: '#2c2c2c', marginBottom: '15px' }}>Tus datos</h3>
          <p style={{ color: '#555', marginBottom: '5px' }}><strong>Nombre:</strong> {usuario?.nombre}</p>
          <p style={{ color: '#555', marginBottom: '5px' }}><strong>Teléfono:</strong> {usuario?.telefono}</p>
          <p style={{ color: '#555', marginBottom: '5px' }}><strong>Dirección:</strong> {usuario?.direccion}</p>
        </div>

        {/* RESUMEN DEL PEDIDO */}
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
                  fontWeight: forma === op ? 'bold' : 'normal'
                }}
              >
                {op === 'entrega' ? 'Entrega a domicilio' : 'Recoger en local'}
              </button>
            ))}
          </div>
        </div>

        {/* INSTRUCCIONES ESPECIALES */}
        <div style={{
          backgroundColor: 'white',
          borderRadius: '16px',
          padding: '25px',
          marginBottom: '25px',
          boxShadow: '0 4px 20px rgba(0,0,0,0.06)'
        }}>
          <h3 style={{ color: '#2c2c2c', marginBottom: '15px' }}>Instrucciones especiales</h3>
          <textarea
            value={instrucciones}
            onChange={e => setInstrucciones(e.target.value)}
            placeholder="Sin cebolla, alergias, instrucciones para el repartidor..."
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
              resize: 'vertical'
            }}
            onFocus={e => e.currentTarget.style.borderColor = '#c0392b'}
            onBlur={e => e.currentTarget.style.borderColor = '#ddd'}
          />
        </div>

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
            fontFamily: 'Georgia, serif'
          }}
        >
          {cargando ? 'Procesando...' : 'Confirmar pedido →'}
        </button>
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

export default Checkout