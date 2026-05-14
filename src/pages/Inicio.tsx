import { useNavigate } from 'react-router-dom'
import { useState } from 'react'
import Navbar from '../components/Navbar'
import { useCarrito } from '../context/CarritoContext'

function Inicio() {
  const navigate = useNavigate()
  const { agregarAlCarrito } = useCarrito()
  const [mensaje, setMensaje] = useState<{ texto: string; tipo: 'exito' | 'error' } | null>(null)

  const mostrarMensaje = (texto: string, tipo: 'exito' | 'error') => {
    setMensaje({ texto, tipo })
    setTimeout(() => setMensaje(null), 3000)
  }

  const pizzasDestacadas = [
    {
      id: 'margherita',
      nombre: 'Margherita',
      ingredientes: 'Tomate, mozzarella, albahaca',
      precio: '9.99',
      imagen: 'https://images.unsplash.com/photo-1574071318508-1cdbab80d002?w=400&h=400&fit=crop'
    },
    {
      id: 'pepperoni',
      nombre: 'Pepperoni',
      ingredientes: 'Tomate, mozzarella, pepperoni',
      precio: '11.99',
      imagen: 'https://images.unsplash.com/photo-1628840042765-356cda07504e?w=400&h=400&fit=crop'
    },
    {
      id: 'cuatro-quesos',
      nombre: 'Cuatro Quesos',
      ingredientes: 'Mozzarella, gorgonzola, parmesano, brie',
      precio: '12.99',
      imagen: 'https://images.unsplash.com/photo-1513104890138-7c749659a591?w=400&h=400&fit=crop'
    }
  ]

  const handleAgregarAlCarrito = (pizza: any) => {
    agregarAlCarrito({
      id: pizza.id,
      nombre: pizza.nombre,
      ingredientes: pizza.ingredientes,
      precio: parseFloat(pizza.precio),
      imagen: pizza.imagen,
      tipo: 'menu'
    })
    mostrarMensaje(`🍕 "${pizza.nombre}" añadida al carrito`, 'exito')
  }

  return (
    <div style={{ fontFamily: 'Georgia, serif', backgroundColor: '#fdf8f0' }}>
      {/* BANNER DE MENSAJE */}
      {mensaje && (
        <div style={{
          position: 'fixed',
          top: '20px',
          right: '20px',
          backgroundColor: mensaje.tipo === 'exito' ? '#27ae60' : '#c0392b',
          color: 'white',
          padding: '15px 25px',
          borderRadius: '10px',
          boxShadow: '0 4px 15px rgba(0,0,0,0.2)',
          zIndex: 1000,
          animation: 'slideIn 0.3s ease',
          fontFamily: 'Georgia, serif'
        }}>
          {mensaje.texto}
        </div>
      )}

      <style>{`
        @keyframes slideIn {
          from {
            transform: translateX(100%);
            opacity: 0;
          }
          to {
            transform: translateX(0);
            opacity: 1;
          }
        }
      `}</style>

      <Navbar />

      {/* HERO */}
      <div style={{
        backgroundImage: 'url(https://images.unsplash.com/photo-1555396273-367ea4eb4db5?w=1600&fit=crop)',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        minHeight: '85vh',
        display: 'flex',
        alignItems: 'center',
        padding: '0 80px',
        position: 'relative'
      }}>
        <div style={{
          position: 'absolute',
          inset: 0,
          backgroundColor: 'rgba(0,0,0,0.45)'
        }}></div>
        <div style={{ position: 'relative', color: 'white', maxWidth: '600px' }}>
          <p style={{ color: '#f39c12', letterSpacing: '3px', textTransform: 'uppercase', fontSize: '0.9rem' }}>
            Pizzería artesanal · Vitoria-Gasteiz
          </p>
          <h1 style={{
            fontFamily: 'Cormorant Garamond, serif',
            fontStyle: 'italic',
            fontSize: '5rem',
            lineHeight: 1.1,
            margin: '10px 0 20px'
          }}>
            Tu pizza favorita, a un click
          </h1>
          <p style={{ fontSize: '1.1rem', color: '#ddd', marginBottom: '30px' }}>
            Masa madre de fermentación lenta e ingredientes frescos del País Vasco.
          </p>
          <div style={{ display: 'flex', gap: '15px', flexWrap: 'wrap' }}>
            <button
              onClick={() => navigate('/menu')}
              style={{
                backgroundColor: '#c0392b',
                color: 'white',
                border: 'none',
                padding: '14px 35px',
                fontSize: '1rem',
                borderRadius: '50px',
                cursor: 'pointer',
                fontFamily: 'Georgia, serif',
                boxShadow: '0 4px 15px rgba(192,57,43,0.4)',
                transition: 'transform 0.2s'
              }}
              onMouseEnter={e => e.currentTarget.style.transform = 'scale(1.05)'}
              onMouseLeave={e => e.currentTarget.style.transform = 'scale(1)'}
            >
              Ver menú completo
            </button>
            <button
              onClick={() => navigate('/crea-tu-pizza')}
              style={{
                backgroundColor: 'transparent',
                color: 'white',
                border: '2px solid white',
                padding: '14px 35px',
                fontSize: '1rem',
                borderRadius: '50px',
                cursor: 'pointer',
                fontFamily: 'Georgia, serif',
                transition: 'transform 0.2s'
              }}
              onMouseEnter={e => e.currentTarget.style.transform = 'scale(1.05)'}
              onMouseLeave={e => e.currentTarget.style.transform = 'scale(1)'}
            >
              Crea tu pizza
            </button>
            <button
              onClick={() => navigate('/mis-pedidos')}
              style={{
                backgroundColor: 'transparent',
                color: 'white',
                border: '2px solid white',
                padding: '14px 35px',
                fontSize: '1rem',
                borderRadius: '50px',
                cursor: 'pointer',
                fontFamily: 'Georgia, serif',
                transition: 'transform 0.2s'
              }}
              onMouseEnter={e => e.currentTarget.style.transform = 'scale(1.05)'}
              onMouseLeave={e => e.currentTarget.style.transform = 'scale(1)'}
            >
              Mis pedidos
            </button>
            <button
              onClick={() => navigate('/mis-pizzas')}
              style={{
                backgroundColor: 'transparent',
                color: 'white',
                border: '2px solid white',
                padding: '14px 35px',
                fontSize: '1rem',
                borderRadius: '50px',
                cursor: 'pointer',
                fontFamily: 'Georgia, serif',
                transition: 'transform 0.2s'
              }}
              onMouseEnter={e => e.currentTarget.style.transform = 'scale(1.05)'}
              onMouseLeave={e => e.currentTarget.style.transform = 'scale(1)'}
            >
              Mis pizzas
            </button>
          </div>
        </div>
      </div>

      {/* PIZZAS DESTACADAS */}
      <div style={{ padding: '80px 40px', textAlign: 'center' }}>
        <p style={{ color: '#c0392b', letterSpacing: '3px', textTransform: 'uppercase', fontSize: '0.85rem' }}>
          Las más pedidas
        </p>
        <h2 style={{
          fontFamily: 'Cormorant Garamond, serif',
          fontStyle: 'italic',
          fontSize: '3rem',
          color: '#2c2c2c',
          margin: '10px 0 50px'
        }}>
          Nuestras Favoritas
        </h2>
        <div style={{ display: 'flex', justifyContent: 'center', gap: '30px', flexWrap: 'wrap' }}>
          {pizzasDestacadas.map((pizza) => (
            <div
              key={pizza.id}
              style={{
                backgroundColor: 'white',
                borderRadius: '20px',
                padding: '20px',
                width: '280px',
                boxShadow: '0 4px 20px rgba(0,0,0,0.08)',
                transition: 'transform 0.3s, box-shadow 0.3s',
                cursor: 'pointer'
              }}
              onMouseEnter={e => {
                e.currentTarget.style.transform = 'translateY(-8px)'
                e.currentTarget.style.boxShadow = '0 12px 30px rgba(0,0,0,0.15)'
              }}
              onMouseLeave={e => {
                e.currentTarget.style.transform = 'translateY(0)'
                e.currentTarget.style.boxShadow = '0 4px 20px rgba(0,0,0,0.08)'
              }}
            >
              <img
                src={pizza.imagen}
                alt={pizza.nombre}
                style={{ width: '100%', height: '200px', objectFit: 'cover', borderRadius: '12px' }}
              />
              <h3 style={{ color: '#2c2c2c', margin: '15px 0 5px', fontSize: '1.3rem' }}>{pizza.nombre}</h3>
              <p style={{ color: '#999', fontSize: '0.85rem', marginBottom: '15px' }}>{pizza.ingredientes}</p>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <span style={{ color: '#c0392b', fontWeight: 'bold', fontSize: '1.3rem' }}>{pizza.precio}€</span>
                <button
                  onClick={(e) => {
                    e.stopPropagation()
                    handleAgregarAlCarrito(pizza)
                  }}
                  style={{
                    backgroundColor: '#c0392b',
                    color: 'white',
                    border: 'none',
                    padding: '8px 18px',
                    borderRadius: '50px',
                    cursor: 'pointer',
                    fontFamily: 'Georgia, serif',
                    fontSize: '0.85rem',
                    transition: 'transform 0.2s'
                  }}
                  onMouseEnter={e => e.currentTarget.style.transform = 'scale(1.05)'}
                  onMouseLeave={e => e.currentTarget.style.transform = 'scale(1)'}
                >
                  Añadir
                </button>
              </div>
            </div>
          ))}
        </div>
        <button
          onClick={() => navigate('/menu')}
          style={{
            marginTop: '50px',
            backgroundColor: 'transparent',
            border: '2px solid #c0392b',
            color: '#c0392b',
            padding: '12px 35px',
            borderRadius: '50px',
            cursor: 'pointer',
            fontFamily: 'Georgia, serif',
            fontSize: '1rem',
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
          Ver menú completo →
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

export default Inicio