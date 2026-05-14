import { useNavigate } from 'react-router-dom'
import { useEffect, useState } from 'react'
import Navbar from '../components/Navbar'

interface Usuario {
  _id: string
  nombre: string
  email: string
  telefono: string
  direccion: string
  rol: 'user' | 'admin'
  createdAt: string
}

function AdminUsuarios() {
  const navigate = useNavigate()
  const [usuarios, setUsuarios] = useState<Usuario[]>([])
  const [cargando, setCargando] = useState(true)
  const [busqueda, setBusqueda] = useState('')
  const [mensaje, setMensaje] = useState<{ texto: string; tipo: 'exito' | 'error' } | null>(null)

  const mostrarMensaje = (texto: string, tipo: 'exito' | 'error') => {
    setMensaje({ texto, tipo })
    setTimeout(() => setMensaje(null), 3000)
  }

  useEffect(() => {
    cargarUsuarios()
  }, [])

  const cargarUsuarios = async () => {
    try {
      const res = await fetch('http://localhost:5000/api/usuarios')
      const data = await res.json()
      setUsuarios(data)
      setCargando(false)
    } catch (error) {
      console.error('Error:', error)
      mostrarMensaje('❌ Error al cargar usuarios', 'error')
      setCargando(false)
    }
  }

  const cambiarRol = async (id: string, rolActual: string) => {
    const nuevoRol = rolActual === 'admin' ? 'user' : 'admin'
    const confirmar = confirm(`¿${nuevoRol === 'admin' ? 'Promover a administrador' : 'Quitar rol de administrador'} a este usuario?`)
    
    if (!confirmar) return

    try {
      const res = await fetch(`http://localhost:5000/api/usuarios/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ rol: nuevoRol })
      })

      if (res.ok) {
        const usuarioActualizado = await res.json()
        setUsuarios(prev => prev.map(u => u._id === id ? { ...u, rol: usuarioActualizado.rol } : u))
        mostrarMensaje(`✅ Usuario actualizado a ${nuevoRol === 'admin' ? 'administrador' : 'usuario normal'}`, 'exito')
      } else {
        mostrarMensaje('❌ Error al actualizar rol', 'error')
      }
    } catch (error) {
      mostrarMensaje('❌ Error de conexión', 'error')
    }
  }

  const eliminarUsuario = async (id: string, nombre: string) => {
    if (!confirm(`¿Eliminar al usuario "${nombre}"? Esta acción no se puede deshacer.`)) return

    try {
      const res = await fetch(`http://localhost:5000/api/usuarios/${id}`, {
        method: 'DELETE'
      })

      if (res.ok) {
        setUsuarios(prev => prev.filter(u => u._id !== id))
        mostrarMensaje(`✅ Usuario "${nombre}" eliminado`, 'exito')
      } else {
        mostrarMensaje('❌ Error al eliminar usuario', 'error')
      }
    } catch (error) {
      mostrarMensaje('❌ Error de conexión', 'error')
    }
  }

  const usuariosFiltrados = usuarios.filter(u =>
    u.nombre.toLowerCase().includes(busqueda.toLowerCase()) ||
    u.email.toLowerCase().includes(busqueda.toLowerCase())
  )

  return (
    <div style={{ fontFamily: 'Georgia, serif', backgroundColor: '#fdf8f0', minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
      
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
          animation: 'slideIn 0.3s ease'
        }}>
          {mensaje.texto}
        </div>
      )}

      <style>{`
        @keyframes slideIn {
          from { transform: translateX(100%); opacity: 0; }
          to { transform: translateX(0); opacity: 1; }
        }
      `}</style>

      <Navbar />

      <div style={{ flex: 1, maxWidth: '1000px', margin: '0 auto', padding: '60px 20px', width: '100%' }}>
        
        <h1 style={{
          fontFamily: 'Cormorant Garamond, serif',
          fontStyle: 'italic',
          color: '#c0392b',
          fontSize: '3rem',
          marginBottom: '10px'
        }}>
          Gestionar Usuarios
        </h1>
        <p style={{ color: '#999', marginBottom: '30px' }}>
          Administra los usuarios y sus roles
        </p>

        {/* BUSCADOR */}
        <div style={{ marginBottom: '30px' }}>
          <input
            type="text"
            placeholder="🔍 Buscar por nombre o email..."
            value={busqueda}
            onChange={e => setBusqueda(e.target.value)}
            style={{
              width: '100%',
              padding: '12px 20px',
              borderRadius: '50px',
              border: '1.5px solid #ddd',
              fontSize: '1rem',
              fontFamily: 'Georgia, serif',
              outline: 'none',
              boxSizing: 'border-box'
            }}
            onFocus={e => e.currentTarget.style.borderColor = '#c0392b'}
            onBlur={e => e.currentTarget.style.borderColor = '#ddd'}
          />
        </div>

        {cargando ? (
          <p style={{ color: '#999', textAlign: 'center' }}>Cargando usuarios...</p>
        ) : usuariosFiltrados.length === 0 ? (
          <p style={{ color: '#999', textAlign: 'center' }}>No se encontraron usuarios</p>
        ) : (
          <div style={{ overflowX: 'auto' }}>
            <table style={{ width: '100%', borderCollapse: 'collapse', backgroundColor: 'white', borderRadius: '16px', overflow: 'hidden', boxShadow: '0 4px 20px rgba(0,0,0,0.06)' }}>
              <thead style={{ backgroundColor: '#c0392b', color: 'white' }}>
                <tr>
                  <th style={{ padding: '15px', textAlign: 'left' }}>Nombre</th>
                  <th style={{ padding: '15px', textAlign: 'left' }}>Email</th>
                  <th style={{ padding: '15px', textAlign: 'left' }}>Teléfono</th>
                  <th style={{ padding: '15px', textAlign: 'left' }}>Rol</th>
                  <th style={{ padding: '15px', textAlign: 'center' }}>Acciones</th>
                </tr>
              </thead>
              <tbody>
                {usuariosFiltrados.map(usuario => (
                  <tr key={usuario._id} style={{ borderBottom: '1px solid #eee' }}>
                    <td style={{ padding: '15px' }}>{usuario.nombre}</td>
                    <td style={{ padding: '15px', color: '#555' }}>{usuario.email}</td>
                    <td style={{ padding: '15px', color: '#555' }}>{usuario.telefono}</td>
                    <td style={{ padding: '15px' }}>
                      <span style={{
                        backgroundColor: usuario.rol === 'admin' ? '#c0392b20' : '#27ae6020',
                        color: usuario.rol === 'admin' ? '#c0392b' : '#27ae60',
                        padding: '5px 12px',
                        borderRadius: '20px',
                        fontSize: '0.85rem',
                        fontWeight: 'bold'
                      }}>
                        {usuario.rol === 'admin' ? '👑 Administrador' : '👤 Usuario'}
                      </span>
                    </td>
                    <td style={{ padding: '15px', textAlign: 'center' }}>
                      <div style={{ display: 'flex', gap: '10px', justifyContent: 'center' }}>
                        <button
                          onClick={() => cambiarRol(usuario._id, usuario.rol)}
                          style={{
                            backgroundColor: usuario.rol === 'admin' ? '#e67e22' : '#27ae60',
                            color: 'white',
                            border: 'none',
                            padding: '6px 15px',
                            borderRadius: '50px',
                            cursor: 'pointer',
                            fontSize: '0.8rem',
                            fontFamily: 'Georgia, serif'
                          }}
                        >
                          {usuario.rol === 'admin' ? 'Quitar admin' : 'Hacer admin'}
                        </button>
                        {usuario.rol !== 'admin' && (
                          <button
                            onClick={() => eliminarUsuario(usuario._id, usuario.nombre)}
                            style={{
                              backgroundColor: 'transparent',
                              border: '2px solid #c0392b',
                              color: '#c0392b',
                              padding: '6px 15px',
                              borderRadius: '50px',
                              cursor: 'pointer',
                              fontSize: '0.8rem',
                              fontFamily: 'Georgia, serif'
                            }}
                          >
                            Eliminar
                          </button>
                        )}
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
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

export default AdminUsuarios