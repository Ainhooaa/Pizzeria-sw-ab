import { useNavigate } from 'react-router-dom'
import { useEffect, useState } from 'react'
import Navbar from '../components/Navbar'

interface Pizza {
  _id: string
  nombre: string
  ingredientes: string[]
  precio: number
  disponible: boolean
}

function AdminMenu() {
  const navigate = useNavigate()
  const [pizzas, setPizzas] = useState<Pizza[]>([])
  const [cargando, setCargando] = useState(true)
  const [mostrarFormulario, setMostrarFormulario] = useState(false)
  const [nombre, setNombre] = useState('')
  const [ingredientes, setIngredientes] = useState('')
  const [precio, setPrecio] = useState('')

  useEffect(() => {
    fetch('http://localhost:3000/pizzas')
      .then(res => res.json())
      .then(data => {
        setPizzas(data)
        setCargando(false)
      })
      .catch(() => setCargando(false))
  }, [])

  const eliminar = (id: string) => {
    fetch(`http://localhost:3000/pizzas/${id}`, { method: 'DELETE' })
      .then(() => setPizzas(prev => prev.filter(p => p._id !== id)))
  }

  const añadir = () => {
    if (!nombre || !ingredientes || !precio) return
    const nueva = {
      nombre,
      ingredientes: ingredientes.split(',').map(i => i.trim()),
      precio: parseFloat(precio),
      disponible: true
    }
    fetch('http://localhost:3000/pizzas', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(nueva)
    })
      .then(res => res.json())
      .then(data => {
        setPizzas(prev => [...prev, data])
        setNombre('')
        setIngredientes('')
        setPrecio('')
        setMostrarFormulario(false)
      })
  }

  return (
    <div style={{ fontFamily: 'Georgia, serif', backgroundColor: '#fdf8f0', minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>

      {/* NAVBAR */}
      <Navbar />

      <div style={{ flex: 1, maxWidth: '900px', margin: '0 auto', padding: '60px 20px', width: '100%' }}>

        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '30px' }}>
          <h1 style={{
            fontFamily: 'Cormorant Garamond, serif',
            fontStyle: 'italic',
            color: '#c0392b',
            fontSize: '3rem',
            margin: 0
          }}>
            Gestionar Menú
          </h1>
          <button
            onClick={() => setMostrarFormulario(!mostrarFormulario)}
            style={{
              backgroundColor: '#27ae60',
              color: 'white',
              border: 'none',
              padding: '12px 25px',
              borderRadius: '50px',
              cursor: 'pointer',
              fontFamily: 'Georgia, serif',
              fontSize: '0.95rem'
            }}
          >
            {mostrarFormulario ? 'Cancelar' : '+ Añadir pizza'}
          </button>
        </div>

        {/* FORMULARIO AÑADIR */}
        {mostrarFormulario && (
          <div style={{
            backgroundColor: 'white',
            borderRadius: '16px',
            padding: '25px',
            marginBottom: '30px',
            boxShadow: '0 4px 20px rgba(0,0,0,0.06)',
            borderTop: '5px solid #27ae60'
          }}>
            <h3 style={{ color: '#2c2c2c', marginBottom: '20px' }}>Nueva pizza</h3>
            {[
              { label: 'Nombre', value: nombre, setter: setNombre, placeholder: 'Ej: Napolitana' },
              { label: 'Ingredientes (separados por comas)', value: ingredientes, setter: setIngredientes, placeholder: 'Ej: Tomate, Mozzarella, Anchoas' },
              { label: 'Precio (€)', value: precio, setter: setPrecio, placeholder: 'Ej: 11.99' }
            ].map(campo => (
              <div key={campo.label} style={{ marginBottom: '15px' }}>
                <label style={{ color: '#555', fontSize: '0.9rem', display: 'block', marginBottom: '6px' }}>
                  {campo.label}
                </label>
                <input
                  type="text"
                  value={campo.value}
                  onChange={e => campo.setter(e.target.value)}
                  placeholder={campo.placeholder}
                  style={{
                    width: '100%',
                    padding: '12px 15px',
                    borderRadius: '10px',
                    border: '1.5px solid #ddd',
                    fontSize: '1rem',
                    fontFamily: 'Georgia, serif',
                    outline: 'none',
                    boxSizing: 'border-box'
                  }}
                  onFocus={e => e.currentTarget.style.borderColor = '#27ae60'}
                  onBlur={e => e.currentTarget.style.borderColor = '#ddd'}
                />
              </div>
            ))}
            <button
              onClick={añadir}
              style={{
                backgroundColor: '#27ae60',
                color: 'white',
                border: 'none',
                padding: '12px 30px',
                borderRadius: '50px',
                cursor: 'pointer',
                fontFamily: 'Georgia, serif',
                fontSize: '0.95rem'
              }}
            >
              Guardar pizza
            </button>
          </div>
        )}

        {/* LISTA PIZZAS */}
        {cargando ? (
          <p style={{ color: '#999', textAlign: 'center' }}>Cargando...</p>
        ) : (
          pizzas.map(pizza => (
            <div
              key={pizza._id}
              style={{
                backgroundColor: 'white',
                borderRadius: '16px',
                padding: '20px 25px',
                marginBottom: '15px',
                boxShadow: '0 4px 20px rgba(0,0,0,0.06)',
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center'
              }}
            >
              <div>
                <h3 style={{ color: '#2c2c2c', margin: '0 0 5px' }}>{pizza.nombre}</h3>
                <p style={{ color: '#999', fontSize: '0.85rem', margin: 0 }}>
                  {pizza.ingredientes.join(', ')}
                </p>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '20px' }}>
                <span style={{ color: '#c0392b', fontWeight: 'bold', fontSize: '1.2rem' }}>
                  {pizza.precio.toFixed(2)}€
                </span>
                <button
                  onClick={() => eliminar(pizza._id)}
                  style={{
                    backgroundColor: 'transparent',
                    border: '2px solid #ddd',
                    color: '#999',
                    padding: '8px 18px',
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
        <p style={{ marginTop: '8px' }}>Calle Nieves Cano 12, Vitoria-Gasteiz · +34 945 123 456</p>
        <p style={{ marginTop: '8px' }}>© 2026 Masa Madre</p>
      </footer>

    </div>
  )
}

export default AdminMenu