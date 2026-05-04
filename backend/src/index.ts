import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { connectDB } from './config/database';
import pizzaRoutes from './routes/pizzas';
import pedidosRoutes from './routes/pedidos';
import usuariosRoutes from './routes/usuarios';
import pizzasPersonalizadasRoutes from './routes/pizzasPersonalizadas';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// Rutas con prefijo /api
app.use('/api/pizzas', pizzaRoutes);
app.use('/api/pedidos', pedidosRoutes);
app.use('/api/usuarios', usuariosRoutes);
app.use('/api/pizzasPersonalizadas', pizzasPersonalizadasRoutes);

// Ruta de salud
app.get('/api/health', (req, res) => {
  res.json({ message: 'Servidor funcionando' });
});

// Arranque del servidor
const startServer = async () => {
  try {
    console.log('🔍 Intentando conectar a MongoDB...');
    await connectDB();
    console.log('✅ Conectado correctamente a MongoDB');

    app.listen(PORT, () => {
      console.log(`🚀 Servidor funcionando en http://localhost:${PORT}`);
    });

  } catch (error) {
    console.error('❌ No se pudo iniciar el servidor por error en MongoDB');
    process.exit(1);
  }
};

startServer();