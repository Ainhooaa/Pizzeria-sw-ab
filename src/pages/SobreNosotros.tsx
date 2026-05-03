import { useNavigate } from 'react-router-dom'
import Navbar from '../components/Navbar'

function SobreNosotros() {
  const navigate = useNavigate()

  return (
    <div style={{ fontFamily: 'Georgia, serif', backgroundColor: '#fdf8f0' }}>

      {/* NAVBAR */}
      <Navbar />

      {/* HERO */}
      <div style={{
        backgroundImage: 'url(https://upload.wikimedia.org/wikipedia/commons/thumb/2/2d/Flag_of_the_Basque_Country.svg/1280px-Flag_of_the_Basque_Country.svg.png)',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        minHeight: '40vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        position: 'relative'
      }}>
        <div style={{
          position: 'absolute',
          inset: 0,
          backgroundColor: 'rgba(0,0,0,0.45)'
        }}></div>
        <div style={{ position: 'relative', color: 'white', textAlign: 'center' }}>
          <p style={{ color: '#f39c12', letterSpacing: '3px', textTransform: 'uppercase', fontSize: '0.9rem' }}>
            Nuestra historia
          </p>
          <h1 style={{
            fontFamily: 'Cormorant Garamond, serif',
            fontStyle: 'italic',
            fontSize: '4rem',
            margin: '10px 0'
          }}>
            Sobre Nosotros
          </h1>
        </div>
      </div>

      {/* CONTENIDO */}
      <div style={{ maxWidth: '800px', margin: '0 auto', padding: '60px 20px' }}>

        <div style={{
          backgroundColor: 'white',
          borderLeft: '6px solid #27ae60',
          padding: '35px',
          marginBottom: '30px',
          borderRadius: '0 16px 16px 0',
          boxShadow: '0 4px 20px rgba(0,0,0,0.06)'
        }}>
          <h2 style={{ color: '#c0392b', fontFamily: 'Cormorant Garamond, serif', fontSize: '2rem', fontStyle: 'italic' }}>¿Quiénes somos?</h2>
          <p style={{ lineHeight: '1.9', color: '#444', marginTop: '15px' }}>
             Tres compañeros de universidad con un sueño en común, 
            crear algo especial.
            <strong> Masa Madre</strong> nació de nuestra pasión por la pizza artesanal
            y las ganas de aprender desarrollando algo real.
          </p>
          <p style={{ lineHeight: '1.9', color: '#444', marginTop: '10px' }}>
            Usamos masa madre de fermentación lenta e ingredientes frescos del País Vasco
            para ofrecerte una experiencia única.
          </p>
        </div>

        <div style={{
          backgroundColor: 'white',
          borderLeft: '6px solid #c0392b',
          padding: '35px',
          marginBottom: '30px',
          borderRadius: '0 16px 16px 0',
          boxShadow: '0 4px 20px rgba(0,0,0,0.06)'
        }}>
          <h2 style={{ color: '#27ae60', fontFamily: 'Cormorant Garamond, serif', fontSize: '2rem', fontStyle: 'italic' }}>Horario</h2>
          <p style={{ color: '#444', marginTop: '15px', lineHeight: '2' }}>Lunes a Jueves: <strong>12:00 - 23:00</strong></p>
          <p style={{ color: '#444', lineHeight: '2' }}>Viernes y Sábado: <strong>12:00 - 00:00</strong></p>
          <p style={{ color: '#444', lineHeight: '2' }}>Domingo: <strong>13:00 - 22:00</strong></p>
        </div>

        <div style={{
          backgroundColor: 'white',
          borderLeft: '6px solid #27ae60',
          padding: '35px',
          marginBottom: '30px',
          borderRadius: '0 16px 16px 0',
          boxShadow: '0 4px 20px rgba(0,0,0,0.06)'
        }}>
          <h2 style={{ color: '#c0392b', fontFamily: 'Cormorant Garamond, serif', fontSize: '2rem', fontStyle: 'italic' }}>Contacto</h2>
          <p style={{ color: '#444', marginTop: '15px', lineHeight: '2' }}>Teléfono: +34 945 123 456</p>
          <p style={{ color: '#444', lineHeight: '2' }}>Email: info@masamadre.com</p>
          <p style={{ color: '#444', lineHeight: '2' }}>WhatsApp: +34 600 123 456</p>
          <p style={{ color: '#444', lineHeight: '2' }}>Calle Nieves Cano 12, Vitoria-Gasteiz</p>
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

export default SobreNosotros