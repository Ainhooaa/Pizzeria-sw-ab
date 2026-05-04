import { useNavigate } from 'react-router-dom'
import { useCarrito } from '../context/CarritoContext'

function Carrito() {
  const navigate = useNavigate()
  const { items, cambiarCantidad, eliminarItem, total } = useCarrito()

  const procederAlPago = () => {
    const usuarioStr = localStorage.getItem('usuario')
    const usuario = usuarioStr ? JSON.parse(usuarioStr) : null
    
    if (!usuario) {
      alert('Debes iniciar sesión para hacer un pedido')
      navigate('/login')
      return
    }
    
    if (items.length === 0) {
      alert('Tu carrito está vacío')
      return
    }
    
    navigate('/checkout')
  }

  return (
    <div style={{ fontFamily: 'Georgia, serif', backgroundColor: '#fdf8f0', minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>

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
          {items.length}
        </button>
      </nav>

      <div style={{ flex: 1, maxWidth: '800px', margin: '0 auto', padding: '60px 20px', width: '100%' }}>

        <h1 style={{
          fontFamily: 'Cormorant Garamond, serif',
          fontStyle: 'italic',
          color: '#c0392b',
          fontSize: '3rem',
          marginBottom: '10px'
        }}>
          Tu carrito
        </h1>

        {items.length === 0 ? (
          <div style={{
            backgroundColor: 'white',
            borderRadius: '16px',
            padding: '60px',
            textAlign: 'center',
            boxShadow: '0 4px 20px rgba(0,0,0,0.06)'
          }}>
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
        ) : (
          <>
            {/* ITEMS */}
            <div style={{ marginBottom: '25px' }}>
              {items.map(item => (
                <div
                  key={item.id}
                  style={{
                    backgroundColor: 'white',
                    borderRadius: '16px',
                    padding: '20px',
                    marginBottom: '15px',
                    boxShadow: '0 4px 20px rgba(0,0,0,0.06)',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '20px'
                  }}
                >
                  <img
                    src={item.imagen}
                    alt={item.nombre}
                    style={{ width: '80px', height: '80px', borderRadius: '12px', objectFit: 'cover' }}
                  />
                  <div style={{ flex: 1 }}>
                    <h3 style={{ color: '#2c2c2c', margin: '0 0 5px' }}>{item.nombre}</h3>
                    <p style={{ color: '#999', fontSize: '0.85rem', margin: 0 }}>{item.ingredientes}</p>
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                    <button
                      onClick={() => cambiarCantidad(item.id, -1)}
                      style={{
                        width: '32px', height: '32px',
                        borderRadius: '50%',
                        border: '2px solid #ddd',
                        backgroundColor: 'white',
                        cursor: 'pointer',
                        fontSize: '1rem',
                        display: 'flex', alignItems: 'center', justifyContent: 'center'
                      }}
                    >−</button>
                    <span style={{ fontWeight: 'bold', minWidth: '20px', textAlign: 'center' }}>{item.cantidad}</span>
                    <button
                      onClick={() => cambiarCantidad(item.id, 1)}
                      style={{
                        width: '32px', height: '32px',
                        borderRadius: '50%',
                        border: '2px solid #ddd',
                        backgroundColor: 'white',
                        cursor: 'pointer',
                        fontSize: '1rem',
                        display: 'flex', alignItems: 'center', justifyContent: 'center'
                      }}
                    >+</button>
                  </div>
                  <span style={{ color: '#c0392b', fontWeight: 'bold', fontSize: '1.2rem', minWidth: '70px', textAlign: 'right' }}>
                    {(item.precio * item.cantidad).toFixed(2)}€
                  </span>
                  <button
                    onClick={() => eliminarItem(item.id)}
                    style={{
                      backgroundColor: 'transparent',
                      border: 'none',
                      cursor: 'pointer',
                      fontSize: '1.2rem',
                      color: '#ccc',
                      transition: 'color 0.2s'
                    }}
                    onMouseEnter={e => e.currentTarget.style.color = '#c0392b'}
                    onMouseLeave={e => e.currentTarget.style.color = '#ccc'}
                  >
                    ✕
                  </button>
                </div>
              ))}
            </div>

            {/* TOTAL Y BOTÓN */}
            <div style={{
              backgroundColor: 'white',
              borderRadius: '16px',
              padding: '25px',
              boxShadow: '0 4px 20px rgba(0,0,0,0.06)'
            }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '20px' }}>
                <span style={{ color: '#555', fontSize: '1.1rem' }}>Total</span>
                <span style={{ color: '#c0392b', fontWeight: 'bold', fontSize: '1.8rem' }}>
                  {total.toFixed(2)}€
                </span>
              </div>
              <button
                onClick={procederAlPago}
                style={{
                  width: '100%',
                  backgroundColor: '#c0392b',
                  color: 'white',
                  border: 'none',
                  padding: '16px',
                  borderRadius: '50px',
                  fontSize: '1.1rem',
                  cursor: 'pointer',
                  fontFamily: 'Georgia, serif',
                  letterSpacing: '1px',
                  boxShadow: '0 4px 15px rgba(192,57,43,0.3)',
                  transition: 'transform 0.2s'
                }}
                onMouseEnter={e => e.currentTarget.style.transform = 'scale(1.02)'}
                onMouseLeave={e => e.currentTarget.style.transform = 'scale(1)'}
              >
                Proceder al pago →
              </button>
            </div>
          </>
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

export default Carrito