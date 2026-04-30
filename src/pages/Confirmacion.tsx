import { useNavigate } from 'react-router-dom'
import { useEffect, useState } from 'react'

function Confirmacion() {
  const navigate = useNavigate()
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    setTimeout(() => setVisible(true), 100)
  }, [])

  return (
    <div style={{
      fontFamily: 'Georgia, serif',
      background: 'linear-gradient(160deg, #f5f0e8 0%, #e8f5e9 100%)',
      minHeight: '100vh',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      padding: '20px',
      position: 'relative',
      overflow: 'hidden'
    }}>

      {/* LOGO DE FONDO TRANSPARENTE */}
     <img
  src="/logo.jpeg"
  alt=""
  style={{
    position: 'absolute',
    width: '1700%',
    maxWidth: '1500px',
    opacity: 0.17,
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    pointerEvents: 'none'
  }}
/>

      <div style={{
        textAlign: 'center',
        maxWidth: '550px',
        width: '100%',
        opacity: visible ? 1 : 0,
        transform: visible ? 'translateY(0)' : 'translateY(40px)',
        transition: 'all 0.8s ease',
        position: 'relative'
      }}>
        <h1 style={{
          fontFamily: 'Cormorant Garamond, serif',
          fontStyle: 'italic',
          fontSize: '3.5rem',
          color: '#c0392b',
          margin: '10px 0',
        }}>
          ¡Gracias por tu pedido!
        </h1>

        <p style={{ color: '#555', fontSize: '1.1rem', marginBottom: '30px' }}>
          Tu pizza está en buenas manos
        </p>

        {/* TARJETA NÚMERO PEDIDO */}
        <div style={{
          background: 'white',
          borderTop: '5px solid #27ae60',
          borderRadius: '16px',
          padding: '30px',
          marginBottom: '20px',
          boxShadow: '0 4px 20px rgba(0,0,0,0.08)'
        }}>
          <p style={{ color: '#999', fontSize: '0.85rem', letterSpacing: '2px', textTransform: 'uppercase' }}>
            Número de pedido
          </p>
          <p style={{
            fontSize: '3rem',
            fontWeight: 'bold',
            color: '#c0392b',
            margin: '10px 0',
            letterSpacing: '3px'
          }}>
            #12345
          </p>

          <div style={{
            display: 'flex',
            justifyContent: 'center',
            gap: '40px',
            marginTop: '20px'
          }}>
            <div>
              <p style={{ fontSize: '1.5rem' }}>⏱</p>
              <p style={{ color: '#333', fontWeight: 'bold' }}>30-45 min</p>
              <p style={{ color: '#999', fontSize: '0.8rem' }}>Tiempo estimado</p>
            </div>
            <div style={{ width: '1px', backgroundColor: '#eee' }}></div>
            <div>
              <p style={{ fontSize: '1.5rem' }}>📍</p>
              <p style={{ color: '#333', fontWeight: 'bold' }}>En camino</p>
              <p style={{ color: '#999', fontSize: '0.8rem' }}>Estado del pedido</p>
            </div>
          </div>
        </div>

        {/* BARRA PROGRESO */}
        <div style={{
          background: 'white',
          borderRadius: '16px',
          padding: '20px',
          marginBottom: '30px',
          boxShadow: '0 4px 20px rgba(0,0,0,0.08)'
        }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '10px' }}>
            {['Recibido', 'Preparando', 'En camino', 'Entregado'].map((paso, i) => (
              <div key={i} style={{ textAlign: 'center', flex: 1 }}>
                <p style={{
                  color: i === 0 ? '#27ae60' : '#bbb',
                  fontSize: '0.75rem',
                  fontWeight: i === 0 ? 'bold' : 'normal'
                }}>
                  {paso}
                </p>
              </div>
            ))}
          </div>
          <div style={{ backgroundColor: '#eee', borderRadius: '10px', height: '6px' }}>
            <div style={{
              backgroundColor: '#27ae60',
              width: '25%',
              height: '100%',
              borderRadius: '10px',
              transition: 'width 1s ease'
            }}></div>
          </div>
        </div>

        {/* BOTÓN */}
        <button
          onClick={() => navigate('/')}
          style={{
            background: '#c0392b',
            color: 'white',
            border: 'none',
            padding: '16px 40px',
            fontSize: '1.1rem',
            borderRadius: '50px',
            cursor: 'pointer',
            fontFamily: 'Georgia, serif',
            letterSpacing: '1px',
            boxShadow: '0 4px 15px rgba(192,57,43,0.3)',
            transition: 'transform 0.2s ease, box-shadow 0.2s ease'
          }}
          onMouseEnter={e => {
            e.currentTarget.style.transform = 'scale(1.05)'
            e.currentTarget.style.boxShadow = '0 6px 25px rgba(192,57,43,0.5)'
          }}
          onMouseLeave={e => {
            e.currentTarget.style.transform = 'scale(1)'
            e.currentTarget.style.boxShadow = '0 4px 15px rgba(192,57,43,0.3)'
          }}
        >
          Volver al menú
        </button>

      </div>
    </div>
  )
}

export default Confirmacion