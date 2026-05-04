import { useNavigate } from 'react-router-dom'
import { useEffect, useState } from 'react'
import Navbar from '../components/Navbar'
import { useCarrito } from '../context/CarritoContext'

interface Pizza {
  _id: string
  nombre: string
  ingredientes: string[]
  precio: number
  disponible: boolean
}

function Menu() {
  const navigate = useNavigate()
  const [pizzas, setPizzas] = useState<Pizza[]>([])
  const [cargando, setCargando] = useState(true)
  const { agregarAlCarrito } = useCarrito()

  useEffect(() => {
    fetch('http://localhost:5000/api/pizzas')
      .then(res => res.json())
      .then(data => {
        setPizzas(data)
        setCargando(false)
      })
      .catch(err => {
        console.error('Error al cargar pizzas:', err)
        setCargando(false)
      })
  }, [])

  const getImagen = (nombre: string) => {
    const imagenes: Record<string, string> = {
      'Margarita': 'https://images.unsplash.com/photo-1574071318508-1cdbab80d002?w=400&h=400&fit=crop',
      'Barbacoa': 'https://images.unsplash.com/photo-1555072956-7758afb20e8f?w=400&h=400&fit=crop',
      'Vegetariana': 'https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?w=400&h=400&fit=crop',
      'Cuatro Quesos': 'https://images.unsplash.com/photo-1513104890138-7c749659a591?w=400&h=400&fit=crop',
      'Pepperoni': 'https://images.unsplash.com/photo-1628840042765-356cda07504e?w=400&h=400&fit=crop',
    }
    return imagenes[nombre] || 'https://images.unsplash.com/photo-1574071318508-1cdbab80d002?w=400&h=400&fit=crop'
  }

  const handleAgregarAlCarrito = (pizza: Pizza) => {
    agregarAlCarrito({
      id: pizza._id,
      nombre: pizza.nombre,
      ingredientes: pizza.ingredientes.join(', '),
      precio: pizza.precio,
      imagen: getImagen(pizza.nombre),
      tipo: 'menu'
    })
    // Feedback opcional: mostrar un mensaje o notificación
    console.log(`🍕 ${pizza.nombre} añadida al carrito`)
  }

  return (
    <div style={{ fontFamily: 'Georgia, serif', backgroundColor: '#fdf8f0' }}>

      {/* NAVBAR */}
      <Navbar />

      {/* HERO */}
      <div style={{
        backgroundColor: '#c0392b',
        color: 'white',
        textAlign: 'center',
        padding: '60px 20px'
      }}>
        <p style={{ color: '#f39c12', letterSpacing: '3px', textTransform: 'uppercase', fontSize: '0.9rem' }}>
          Lo mejor de Vitoria-Gasteiz
        </p>
        <h1 style={{
          fontFamily: 'Cormorant Garamond, serif',
          fontStyle: 'italic',
          fontSize: '3.5rem',
          margin: '10px 0'
        }}>
          Nuestro Menú
        </h1>
        <p style={{ fontSize: '1.1rem', opacity: 0.9 }}>
          Todas nuestras pizzas con masa madre de fermentación lenta
        </p>
      </div>

      {/* PIZZAS */}
      <div style={{ maxWidth: '1100px', margin: '0 auto', padding: '60px 20px' }}>

        {cargando ? (
          <div style={{ textAlign: 'center', padding: '60px' }}>
            <p style={{ color: '#999', fontSize: '1.2rem' }}>Cargando pizzas...</p>
          </div>
        ) : pizzas.length === 0 ? (
          <div style={{ textAlign: 'center', padding: '60px' }}>
            <p style={{ color: '#999', fontSize: '1.2rem' }}>No hay pizzas disponibles</p>
          </div>
        ) : (
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))',
            gap: '30px'
          }}>
            {pizzas.filter(p => p.disponible).map(pizza => (
              <div
                key={pizza._id}
                style={{
                  backgroundColor: 'white',
                  borderRadius: '20px',
                  overflow: 'hidden',
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
                  src={getImagen(pizza.nombre)}
                  alt={pizza.nombre}
                  style={{ width: '100%', height: '200px', objectFit: 'cover' }}
                />
                <div style={{ padding: '20px' }}>
                  <h3 style={{ color: '#2c2c2c', margin: '0 0 8px', fontSize: '1.3rem' }}>
                    {pizza.nombre}
                  </h3>
                  <p style={{ color: '#999', fontSize: '0.85rem', marginBottom: '15px' }}>
                    {pizza.ingredientes.join(', ')}
                  </p>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <span style={{ color: '#c0392b', fontWeight: 'bold', fontSize: '1.4rem' }}>
                      {pizza.precio.toFixed(2)}€
                    </span>
                    <button
                      onClick={(e) => {
                        e.stopPropagation() // Evita que el click en el botón active el div padre
                        handleAgregarAlCarrito(pizza)
                      }}
                      style={{
                        backgroundColor: '#c0392b',
                        color: 'white',
                        border: 'none',
                        padding: '10px 20px',
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
              </div>
            ))}
          </div>
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

export default Menu