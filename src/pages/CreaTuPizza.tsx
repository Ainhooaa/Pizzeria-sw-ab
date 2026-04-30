import { useNavigate } from 'react-router-dom'
import { useState } from 'react'

const bases = [
  { id: 'tomate', nombre: 'Tomate'},
  { id: 'blanca', nombre: 'Blanca'},
  { id: 'barbacoa', nombre: 'Barbacoa'},
]

const ingredientes = [
  { id: 'mozzarella', nombre: 'Mozzarella', precio: 1.00 },
  { id: 'pepperoni', nombre: 'Pepperoni', precio: 1.50 },
  { id: 'jamon', nombre: 'Jamón', precio: 1.50 },
  { id: 'champinones', nombre: 'Champiñones', precio: 1.00 },
  { id: 'cebolla', nombre: 'Cebolla', precio: 0.50 },
  { id: 'pimiento', nombre: 'Pimiento', precio: 0.50 },
  { id: 'aceitunas', nombre: 'Aceitunas', precio: 0.75 },
  { id: 'rucula', nombre: 'Rúcula', precio: 0.75 },
  { id: 'anchoas', nombre: 'Anchoas', precio: 1.25 },
  { id: 'pollo', nombre: 'Pollo', precio: 1.50 },
  { id: 'tomate_cherry', nombre: 'Tomate cherry', precio: 0.75 },
  { id: 'gorgonzola', nombre: 'Gorgonzola', precio: 1.25 },
]

const PRECIO_BASE = 7.99

function CreaTuPizza() {
  const navigate = useNavigate()
  const [base, setBase] = useState('tomate')
  const [seleccionados, setSeleccionados] = useState<string[]>([])
  const [nombre, setNombre] = useState('')

  const toggleIngrediente = (id: string) => {
    setSeleccionados(prev =>
      prev.includes(id) ? prev.filter(i => i !== id) : [...prev, id]
    )
  }

  const precioTotal = PRECIO_BASE + seleccionados.reduce((total, id) => {
    const ing = ingredientes.find(i => i.id === id)
    return total + (ing ? ing.precio : 0)
  }, 0)

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

      {/* HERO */}
      <div style={{
        backgroundColor: '#c0392b',
        color: 'white',
        textAlign: 'center',
        padding: '50px 20px'
      }}>
        <p style={{ color: '#f39c12', letterSpacing: '3px', textTransform: 'uppercase', fontSize: '0.9rem' }}>
          A tu manera
        </p>
        <h1 style={{
          fontFamily: 'Cormorant Garamond, serif',
          fontStyle: 'italic',
          fontSize: '3.5rem',
          margin: '10px 0'
        }}>
          Crea tu Pizza
        </h1>
        <p style={{ opacity: 0.9 }}>Elige tu base e ingredientes favoritos</p>
      </div>

      {/* CONTENIDO */}
      <div style={{ maxWidth: '800px', margin: '0 auto', padding: '50px 20px', width: '100%', flex: 1 }}>

        {/* BASE */}
        <div style={{
          backgroundColor: 'white',
          borderRadius: '16px',
          padding: '25px',
          marginBottom: '25px',
          boxShadow: '0 4px 20px rgba(0,0,0,0.06)'
        }}>
          <h3 style={{ color: '#2c2c2c', marginBottom: '15px' }}>1. Elige tu base</h3>
          <div style={{ display: 'flex', gap: '15px' }}>
            {bases.map(b => (
              <button
                key={b.id}
                onClick={() => setBase(b.id)}
                style={{
                  flex: 1,
                  padding: '15px',
                  borderRadius: '12px',
                  border: `2px solid ${base === b.id ? '#c0392b' : '#ddd'}`,
                  backgroundColor: base === b.id ? '#fdf8f0' : 'white',
                  color: base === b.id ? '#c0392b' : '#555',
                  cursor: 'pointer',
                  fontFamily: 'Georgia, serif',
                  fontSize: '1rem',
                  fontWeight: base === b.id ? 'bold' : 'normal',
                  transition: 'all 0.2s'
                }}
              >
                {b.emoji} {b.nombre}
              </button>
            ))}
          </div>
        </div>

        {/* INGREDIENTES */}
        <div style={{
          backgroundColor: 'white',
          borderRadius: '16px',
          padding: '25px',
          marginBottom: '25px',
          boxShadow: '0 4px 20px rgba(0,0,0,0.06)'
        }}>
          <h3 style={{ color: '#2c2c2c', marginBottom: '15px' }}>2. Elige tus ingredientes</h3>
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(170px, 1fr))',
            gap: '10px'
          }}>
            {ingredientes.map(ing => {
              const seleccionado = seleccionados.includes(ing.id)
              return (
                <button
                  key={ing.id}
                  onClick={() => toggleIngrediente(ing.id)}
                  style={{
                    padding: '12px',
                    borderRadius: '10px',
                    border: `2px solid ${seleccionado ? '#c0392b' : '#ddd'}`,
                    backgroundColor: seleccionado ? '#fdf8f0' : 'white',
                    color: seleccionado ? '#c0392b' : '#555',
                    cursor: 'pointer',
                    fontFamily: 'Georgia, serif',
                    fontSize: '0.9rem',
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    transition: 'all 0.2s'
                  }}
                >
                  <span>{ing.nombre}</span>
                  <span style={{ fontWeight: 'bold', fontSize: '0.8rem' }}>+{ing.precio.toFixed(2)}€</span>
                </button>
              )
            })}
          </div>
        </div>

        {/* NOMBRE */}
        <div style={{
          backgroundColor: 'white',
          borderRadius: '16px',
          padding: '25px',
          marginBottom: '25px',
          boxShadow: '0 4px 20px rgba(0,0,0,0.06)'
        }}>
          <h3 style={{ color: '#2c2c2c', marginBottom: '15px' }}>3. Dale un nombre a tu pizza</h3>
          <input
            type="text"
            value={nombre}
            onChange={e => setNombre(e.target.value)}
            placeholder="Mi pizza especial..."
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

        {/* RESUMEN Y BOTONES */}
        <div style={{
          backgroundColor: 'white',
          borderRadius: '16px',
          padding: '25px',
          boxShadow: '0 4px 20px rgba(0,0,0,0.06)',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center'
        }}>
          <div>
            <p style={{ color: '#999', fontSize: '0.9rem' }}>Precio total</p>
            <p style={{ color: '#c0392b', fontSize: '2rem', fontWeight: 'bold', margin: 0 }}>
              {precioTotal.toFixed(2)}€
            </p>
          </div>
          <div style={{ display: 'flex', gap: '15px' }}>
            <button
              style={{
                backgroundColor: 'transparent',
                border: '2px solid #27ae60',
                color: '#27ae60',
                padding: '12px 25px',
                borderRadius: '50px',
                cursor: 'pointer',
                fontFamily: 'Georgia, serif',
                transition: 'all 0.2s'
              }}
              onMouseEnter={e => {
                e.currentTarget.style.backgroundColor = '#27ae60'
                e.currentTarget.style.color = 'white'
              }}
              onMouseLeave={e => {
                e.currentTarget.style.backgroundColor = 'transparent'
                e.currentTarget.style.color = '#27ae60'
              }}
            >
              Guardar pizza
            </button>
            <button
              onClick={() => navigate('/carrito')}
              style={{
                backgroundColor: '#c0392b',
                color: 'white',
                border: 'none',
                padding: '12px 25px',
                borderRadius: '50px',
                cursor: 'pointer',
                fontFamily: 'Georgia, serif',
                boxShadow: '0 4px 15px rgba(192,57,43,0.3)',
                transition: 'transform 0.2s'
              }}
              onMouseEnter={e => e.currentTarget.style.transform = 'scale(1.05)'}
              onMouseLeave={e => e.currentTarget.style.transform = 'scale(1)'}
            >
              Añadir al carrito
            </button>
          </div>
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

export default CreaTuPizza