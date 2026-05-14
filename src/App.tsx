import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { CarritoProvider } from './context/CarritoContext'
import ProtectedRoute from './components/ProtectedRoute'
import Inicio from './pages/Inicio'
import Menu from './pages/Menu'
import CreaTuPizza from './pages/CreaTuPizza'
import Carrito from './pages/Carrito'
import Checkout from './pages/Checkout'
import Confirmacion from './pages/Confirmacion'
import SobreNosotros from './pages/SobreNosotros'
import Login from './pages/Login'
import Registro from './pages/Registro'
import MisPedidos from './pages/MisPedidos'
import MisPizzas from './pages/MisPizzas'
import AdminPedidos from './pages/AdminPedidos'
import AdminMenu from './pages/AdminMenu'

function App() {
  return (
    <CarritoProvider>
      <BrowserRouter>
        <Routes>
          {/* Rutas públicas (sin protección) */}
          <Route path="/" element={<Inicio />} />
          <Route path="/menu" element={<Menu />} />
          <Route path="/crea-tu-pizza" element={<CreaTuPizza />} />
          <Route path="/carrito" element={<Carrito />} />
          <Route path="/sobre-nosotros" element={<SobreNosotros />} />
          <Route path="/login" element={<Login />} />
          <Route path="/registro" element={<Registro />} />

          {/* Rutas protegidas (solo usuarios logueados) */}
          <Route path="/checkout" element={
            <ProtectedRoute>
              <Checkout />
            </ProtectedRoute>
          } />
          <Route path="/confirmacion" element={
            <ProtectedRoute>
              <Confirmacion />
            </ProtectedRoute>
          } />
          <Route path="/mis-pedidos" element={
            <ProtectedRoute>
              <MisPedidos />
            </ProtectedRoute>
          } />
          <Route path="/mis-pizzas" element={
            <ProtectedRoute>
              <MisPizzas />
            </ProtectedRoute>
          } />

          {/* Rutas protegidas solo para admin */}
          <Route path="/admin/pedidos" element={
            <ProtectedRoute adminOnly={true}>
              <AdminPedidos />
            </ProtectedRoute>
          } />
          <Route path="/admin/menu" element={
            <ProtectedRoute adminOnly={true}>
              <AdminMenu />
            </ProtectedRoute>
          } />
        </Routes>
      </BrowserRouter>
    </CarritoProvider>
  )
}

export default App