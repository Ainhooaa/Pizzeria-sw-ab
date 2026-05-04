import { useNavigate } from 'react-router-dom'
import { useEffect, useState } from 'react'
import Navbar from '../components/Navbar'

interface PizzaPersonalizada {
  _id: string
  nombrePizza: string
  ingredientesElegidos: { nombre: string, precioExtra: number, cantidad: number }[]
  precioBase: number
  precioTotal: number
  estado: string
}

function MisPizzas() {
  const navigate = useNavigate()
  const [pizzas, setPizzas] = useState<PizzaPersonalizada[]>([])
  const [cargando, setCargando] = useState(true)

  const usuarioStr = localStorage.getItem('usuario')
  const usuario = usuarioStr ? JSON.parse(usuarioStr) : null
  const emailUsuario = usuario?.email
  
  useEffect(() => {
    fetch(`http://localhost:5000/api/pizzasPersonalizadas/${emailUsuario}`)
      .then(res => res.json())
      .then(data => {
        setPizzas(data)
        setCargando(false)
      })
      .catch(() => setCargando(false))
  }, [])

  const eliminar = (id: string) => {
    fetch(`http://localhost:5000/api/pizzasPersonalizadas/${id}`, { method: 'DELETE' })
      .then(() => setPizzas(prev => prev.filter(p => p._id !== id)))
  }

  return (
    <div style={{ fontFamily: 'Georgia, serif', backgroundColor: '#fdf8f0', minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>

      {/* NAVBAR */}
      <Navbar />

      <div style={{ flex: 1, maxWidth: '800px', margin: '0 auto', padding: '60px 20px', width: '100%' }}>

        <h1 style={{
          fontFamily: 'Cormorant Garamond, serif',
          fontStyle: 'italic',
          color: '#c0392b',
          fontSize: '3rem',
          marginBottom: '10px'
        }}>
          Mis Pizzas Guardadas
        </h1>
        <p style={{ color: '#999', marginBottom: '40px' }}>Tus pizzas personalizadas guardadas</p>

        {cargando ? (
          <p style={{ color: '#999', textAlign: 'center' }}>Cargando...</p>
        ) : pizzas.length === 0 ? (
          <div style={{
            backgroundColor: 'white',
            borderRadius: '16px',
            padding: '60px',
            textAlign: 'center',
            boxShadow: '0 4px 20px rgba(0,0,0,0.06)'
          }}>
            <p style={{ fontSize: '3rem' }}>🍕</p>
            <p style={{ color: '#999', fontSize: '1.1rem', marginTop: '10px' }}>No tienes pizzas guardadas</p>
            <button
              onClick={() => navigate('/crea-tu-pizza')}
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
              Crea tu pizza
            </button>
          </div>
        ) : (
          pizzas.map(pizza => (
            <div
              key={pizza._id}
              style={{
                backgroundColor: 'white',
                borderRadius: '16px',
                padding: '25px',
                marginBottom: '20px',
                boxShadow: '0 4px 20px rgba(0,0,0,0.06)',
                borderLeft: '5px solid #c0392b'
              }}
            >
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '15px' }}>
                <h3 style={{ color: '#2c2c2c', margin: 0 }}>{pizza.nombrePizza}</h3>
                <span style={{ color: '#c0392b', fontWeight: 'bold', fontSize: '1.3rem' }}>
                  {pizza.precioTotal.toFixed(2)}€
                </span>
              </div>
              <p style={{ color: '#999', fontSize: '0.85rem', marginBottom: '15px' }}>
                {pizza.ingredientesElegidos.map(i => i.nombre).join(', ')}
              </p>
              <div style={{ display: 'flex', gap: '10px' }}>
                <button
                  onClick={() => navigate('/carrito')}
                  style={{
                    backgroundColor: '#c0392b',
                    color: 'white',
                    border: 'none',
                    padding: '10px 20px',
                    borderRadius: '50px',
                    cursor: 'pointer',
                    fontFamily: 'Georgia, serif',
                    fontSize: '0.85rem'
                  }}
                >
                  Añadir al carrito
                </button>
                <button
                  onClick={() => eliminar(pizza._id)}
                  style={{
                    backgroundColor: 'transparent',
                    color: '#999',
                    border: '2px solid #ddd',
                    padding: '10px 20px',
                    borderRadius: '50px',
                    cursor: 'pointer',
                    fontFamily: 'Georgia, serif',
                    fontSize: '0.85rem',
                    transition: 'all 0.2s'
                  }}
                  onMouseEnter={e => {
                    e.currentTarget.style.borderColor = '#c0392b'
                    e.currentTarget.style.color = '#c0392b'
                  }}
                  onMouseLeave={e => {
                    e.currentTarget.style.borderColor = '#ddd'
                    e.currentTarget.style.color = '#999'
                  }}
                >
                  Eliminar
                </button>
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
        <p style={{ marginTop: '8px' }}>Calle Nieves Cano 12, Vitoria-Gasteiz ·+34 945 123 456</p>
        <p style={{ marginTop: '8px' }}>© 2026 Masa Madre</p>
      </footer>

    </div>
  )
}

export default MisPizzas