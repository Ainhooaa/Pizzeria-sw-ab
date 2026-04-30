import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom'
import { AnimatePresence } from 'framer-motion'
import PageWrapper from './PageWrapper'
import Inicio from './pages/Inicio'
import Menu from './pages/Menu'
import CreaTuPizza from './pages/CreaTuPizza'
import Carrito from './pages/Carrito'
import Checkout from './pages/Checkout'
import Confirmacion from './pages/Confirmacion'
import SobreNosotros from './pages/SobreNosotros'
import Login from './pages/Login'
import MisPedidos from './pages/MisPedidos'
import MisPizzas from './pages/MisPizzas'
import AdminPedidos from './pages/AdminPedidos'
import AdminMenu from './pages/AdminMenu'

function AnimatedRoutes() {
  const location = useLocation()
  return (
    <AnimatePresence mode='wait' initial={false}>
      <Routes location={location} key={location.pathname}>
        <Route path="/" element={<PageWrapper><Inicio /></PageWrapper>} />
        <Route path="/menu" element={<PageWrapper><Menu /></PageWrapper>} />
        <Route path="/crea-tu-pizza" element={<PageWrapper><CreaTuPizza /></PageWrapper>} />
        <Route path="/carrito" element={<PageWrapper><Carrito /></PageWrapper>} />
        <Route path="/checkout" element={<PageWrapper><Checkout /></PageWrapper>} />
        <Route path="/confirmacion" element={<PageWrapper><Confirmacion /></PageWrapper>} />
        <Route path="/sobre-nosotros" element={<PageWrapper><SobreNosotros /></PageWrapper>} />
        <Route path="/login" element={<PageWrapper><Login /></PageWrapper>} />
        <Route path="/mis-pedidos" element={<PageWrapper><MisPedidos /></PageWrapper>} />
        <Route path="/mis-pizzas" element={<PageWrapper><MisPizzas /></PageWrapper>} />
        <Route path="/admin/pedidos" element={<PageWrapper><AdminPedidos /></PageWrapper>} />
        <Route path="/admin/menu" element={<PageWrapper><AdminMenu /></PageWrapper>} />
      </Routes>
    </AnimatePresence>
  )
}

function App() {
  return (
    <BrowserRouter>
      <AnimatedRoutes />
    </BrowserRouter>
  )
}

export default App