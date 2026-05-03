import { useNavigate } from 'react-router-dom'
import { useEffect, useState } from 'react'
import Navbar from '../components/Navbar'

interface Pedido {
  _id: string
  emailUsuario: string
  cliente: { nombre: string, direccion: string, telefono: string }
  items: { tipo: string, pizzaNombre: string, cantidad: number, precioUnitario: number }[]
  total: number
  estado: string
  instrucciones: string
  fecha: string
}

const colorEstado: Record<string, string> = {
  'entregado': '#27ae60',
  'preparando': '#f39c12',
  'pendiente': '#c0392b'
}

function MisPedidos() {
  const navigate = useNavigate()
  const [pedidos, setPedidos] = useState<Pedido[]>([])
  const [cargando, setCargando] = useState(true)

  const usuarioStr = localStorage.getItem('usuario')
  const usuario = usuarioStr ? JSON.parse(usuarioStr) : null

  useEffect(() => {
    if (!usuario) {
      navigate('/login')
      return
    }
    fetch(`http://localhost:3000/pedidos/${usuario.email}`)
      .then(res => res.json())
      .then(data => {
        setPedidos(data)
        setCargando(false)
      })
      .catch(() => setCargando(false))
  }, [])

  return (
    <div style={{ fontFamily: 'Georgia, serif', backgroundColor: '#fdf8f0', minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>

      <Navbar />

      <div style={{ flex: 1, maxWidth: '800px', margin: '0 auto', padding: '60px 20px', width: '100%' }}>

        <h1 style={{
          fontFamily: 'Cormorant Garamond, serif',
          fontStyle: 'italic',
          color: '#c0392b',
          fontSize: '3rem',
          marginBottom: '10px'
        }}>
          Mis Pedidos
        </h1>
        <p style={{ color: '#999', marginBottom: '40px' }}>Historial de todos tus pedidos</p>

        {cargando ? (
          <p style={{ color: '#999', textAlign: 'center' }}>Cargando...</p>
        ) : pedidos.length === 0 ? (
          <div style={{
            backgroundColor: 'white',
            borderRadius: '16px',
            padding: '60px',
            textAlign: 'center',
            boxShadow: '0 4px 20px rgba(0,0,0,0.06)'
          }}>
            <p style={{ fontSize: '3rem' }}>🍕</p>
            <p style={{ color: '#999', fontSize: '1.1rem', marginTop: '10px' }}>No tienes pedidos todavía</p>
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
        ) : (
          pedidos.map(pedido => (
            <div
              key={pedido._id}
              style={{
                backgroundColor: 'white',
                borderRadius: '16px',
                padding: '25px',
                marginBottom: '20px',
                boxShadow: '0 4px 20px rgba(0,0,0,0.06)',
                borderLeft: `5px solid ${colorEstado[pedido.estado] || '#ddd'}`
              }}
            >
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '15px' }}>
                <div>
                  <h3 style={{ color: '#2c2c2c', margin: '0 0 5px' }}>Pedido</h3>
                  <p style={{ color: '#999', fontSize: '0.85rem', margin: 0 }}>{pedido.fecha?.slice(0, 10)}</p>
                </div>
                <span style={{
                  backgroundColor: (colorEstado[pedido.estado] || '#ddd') + '20',
                  color: colorEstado[pedido.estado] || '#ddd',
                  padding: '6px 16px',
                  borderRadius: '20px',
                  fontSize: '0.85rem',
                  fontWeight: 'bold',
                  textTransform: 'capitalize'
                }}>
                  {pedido.estado}
                </span>
              </div>

              <div style={{ borderTop: '1px solid #f0f0f0', paddingTop: '15px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <div>
                  {pedido.items.map((item, i) => (
                    <p key={i} style={{ color: '#555', fontSize: '0.9rem', margin: '3px 0' }}>
                      • {item.pizzaNombre} x{item.cantidad}
                    </p>
                  ))}
                  {pedido.instrucciones && (
                    <p style={{ color: '#f39c12', fontSize: '0.85rem', marginTop: '8px' }}>
                      📝 {pedido.instrucciones}
                    </p>
                  )}
                </div>
                <div style={{ textAlign: 'right' }}>
                  <p style={{ color: '#c0392b', fontWeight: 'bold', fontSize: '1.3rem', margin: 0 }}>
                    {pedido.total.toFixed(2)}€
                  </p>
                  <button
                    onClick={() => navigate('/menu')}
                    style={{
                      marginTop: '10px',
                      backgroundColor: 'transparent',
                      border: '2px solid #c0392b',
                      color: '#c0392b',
                      padding: '6px 16px',
                      borderRadius: '50px',
                      cursor: 'pointer',
                      fontFamily: 'Georgia, serif',
                      fontSize: '0.8rem',
                      transition: 'all 0.2s'
                    }}
                    onMouseEnter={e => {
                      e.currentTarget.style.backgroundColor = '#c0392b'
                      e.currentTarget.style.color = 'white'
                    }}
                    onMouseLeave={e => {
                      e.currentTarget.style.backgroundColor = 'transparent'
                      e.currentTarget.style.color = '#c0392b'
                    }}
                  >
                    Repetir pedido
                  </button>
                </div>
              </div>
            </div>
          ))
        )}
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

export default MisPedidos