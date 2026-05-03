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
  'pendiente': '#f39c12',
  'preparando': '#3498db',
  'entregado': '#27ae60'
}

function AdminPedidos() {
  const navigate = useNavigate()
  const [pedidos, setPedidos] = useState<Pedido[]>([])
  const [cargando, setCargando] = useState(true)
  const [filtro, setFiltro] = useState('todos')

  useEffect(() => {
    fetch('http://localhost:3000/pedidos')
      .then(res => res.json())
      .then(data => {
        setPedidos(data)
        setCargando(false)
      })
      .catch(() => setCargando(false))
  }, [])

  const cambiarEstado = (id: string, estado: string) => {
    fetch(`http://localhost:3000/pedidos/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ estado })
    })
      .then(res => res.json())
      .then(actualizado => {
        setPedidos(prev => prev.map(p => p._id === id ? actualizado : p))
      })
  }

  const pedidosFiltrados = filtro === 'todos' ? pedidos : pedidos.filter(p => p.estado === filtro)

  return (
    <div style={{ fontFamily: 'Georgia, serif', backgroundColor: '#fdf8f0', minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>

      {/* NAVBAR */}
      <Navbar />
      <div style={{ flex: 1, maxWidth: '1000px', margin: '0 auto', padding: '60px 20px', width: '100%' }}>

        <h1 style={{
          fontFamily: 'Cormorant Garamond, serif',
          fontStyle: 'italic',
          color: '#c0392b',
          fontSize: '3rem',
          marginBottom: '10px'
        }}>
          Panel de Pedidos
        </h1>

        {/* FILTROS */}
        <div style={{ display: 'flex', gap: '10px', marginBottom: '30px' }}>
          {['todos', 'pendiente', 'preparando', 'entregado'].map(f => (
            <button
              key={f}
              onClick={() => setFiltro(f)}
              style={{
                padding: '8px 20px',
                borderRadius: '50px',
                border: `2px solid ${filtro === f ? '#c0392b' : '#ddd'}`,
                backgroundColor: filtro === f ? '#c0392b' : 'white',
                color: filtro === f ? 'white' : '#555',
                cursor: 'pointer',
                fontFamily: 'Georgia, serif',
                fontSize: '0.85rem',
                textTransform: 'capitalize',
                transition: 'all 0.2s'
              }}
            >
              {f.charAt(0).toUpperCase() + f.slice(1)}
            </button>
          ))}
        </div>

        {cargando ? (
          <p style={{ color: '#999', textAlign: 'center' }}>Cargando pedidos...</p>
        ) : pedidosFiltrados.length === 0 ? (
          <p style={{ color: '#999', textAlign: 'center' }}>No hay pedidos</p>
        ) : (
          pedidosFiltrados.map(pedido => (
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
                  <h3 style={{ color: '#2c2c2c', margin: '0 0 5px' }}>{pedido.cliente.nombre}</h3>
                  <p style={{ color: '#999', fontSize: '0.85rem', margin: 0 }}>{pedido.emailUsuario}</p>
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

              <div style={{ borderTop: '1px solid #f0f0f0', paddingTop: '15px', marginBottom: '15px' }}>
                {pedido.items.map((item, i) => (
                  <p key={i} style={{ color: '#555', fontSize: '0.9rem', margin: '3px 0' }}>
                    • {item.pizzaNombre} x{item.cantidad} — {(item.precioUnitario * item.cantidad).toFixed(2)}€
                  </p>
                ))}
                {pedido.instrucciones && (
                  <p style={{ color: '#f39c12', fontSize: '0.85rem', marginTop: '8px' }}>
                    📝 {pedido.instrucciones}
                  </p>
                )}
              </div>

              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <span style={{ color: '#c0392b', fontWeight: 'bold', fontSize: '1.2rem' }}>
                  Total: {pedido.total.toFixed(2)}€
                </span>
                <div style={{ display: 'flex', gap: '10px' }}>
                  {['pendiente', 'preparando', 'entregado'].map(estado => (
                    <button
                      key={estado}
                      onClick={() => cambiarEstado(pedido._id, estado)}
                      style={{
                        padding: '8px 16px',
                        borderRadius: '50px',
                        border: `2px solid ${colorEstado[estado]}`,
                        backgroundColor: pedido.estado === estado ? colorEstado[estado] : 'white',
                        color: pedido.estado === estado ? 'white' : colorEstado[estado],
                        cursor: 'pointer',
                        fontFamily: 'Georgia, serif',
                        fontSize: '0.8rem',
                        textTransform: 'capitalize',
                        transition: 'all 0.2s'
                      }}
                    >
                      {estado}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          ))
        )}
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

export default AdminPedidos