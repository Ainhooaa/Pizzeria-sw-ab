import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { CarritoProvider } from './context/CarritoContext'
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
import Registro from './pages/Registro'

function App() {
  return (
    <CarritoProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Inicio />} />
          <Route path="/menu" element={<Menu />} />
          <Route path="/crea-tu-pizza" element={<CreaTuPizza />} />
          <Route path="/carrito" element={<Carrito />} />
          <Route path="/checkout" element={<Checkout />} />
          <Route path="/confirmacion" element={<Confirmacion />} />
          <Route path="/sobre-nosotros" element={<SobreNosotros />} />
          <Route path="/login" element={<Login />} />
          <Route path="/mis-pedidos" element={<MisPedidos />} />
          <Route path="/mis-pizzas" element={<MisPizzas />} />
          <Route path="/admin/pedidos" element={<AdminPedidos />} />
          <Route path="/admin/menu" element={<AdminMenu />} />
          <Route path="/registro" element={<Registro />} />
        </Routes>
      </BrowserRouter>
    </CarritoProvider>
  )
}

export default App

//PROBANDOOOOOO