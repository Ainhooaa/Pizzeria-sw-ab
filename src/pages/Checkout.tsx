import { useNavigate } from 'react-router-dom'
import { useState } from 'react'

function Checkout() {
  const navigate = useNavigate()
  const [forma, setForma] = useState<'entrega' | 'recogida'>('entrega')

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
          Carrito
        </button>
      </nav>

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

          {[
            { label: 'Nombre completo', type: 'text', placeholder: 'Tu nombre' },
            { label: 'Teléfono', type: 'tel', placeholder: '+34 600 000 000' },
            ...(forma === 'entrega' ? [{ label: 'Dirección de entrega', type: 'text', placeholder: 'Calle, número, piso...' }] : [])
          ].map(campo => (
            <div key={campo.label} style={{ marginBottom: '20px' }}>
              <label style={{ color: '#555', fontSize: '0.9rem', display: 'block', marginBottom: '6px' }}>
                {campo.label}
              </label>
              <input
                type={campo.type}
                placeholder={campo.placeholder}
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
          ))}

          <div>
            <label style={{ color: '#555', fontSize: '0.9rem', display: 'block', marginBottom: '6px' }}>
              Instrucciones especiales (opcional)
            </label>
            <textarea
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

        {/* BOTÓN CONFIRMAR */}
        <button
          onClick={() => navigate('/confirmacion')}
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
          Confirmar pedido →
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