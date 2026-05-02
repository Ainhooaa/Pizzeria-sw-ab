/*import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { connectDB } from './config/database';
import pizzaRoutes from './routes/pizzas';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

app.use('/api/pizzas', pizzaRoutes);

app.get('/api/health', (req, res) => {
  res.json({ message: 'Servidor funcionando' });
});

// Iniciar servidor PRIMERO
app.listen(PORT, () => {
  console.log(`🚀 Servidor en http://localhost:${PORT}`);
});

// Conectar a MongoDB DESPUÉS (sin detener el servidor si falla)
connectDB().catch(err => {
  console.error('⚠️ No se pudo conectar a MongoDB, pero el servidor sigue funcionando');
});*/

import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { connectDB } from './config/database';
import pizzaRoutes from './routes/pizzas';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());
app.use('/api/pizzas', pizzaRoutes);

app.get('/api/health', (req, res) => {
  res.json({ message: 'Servidor funcionando' });
});

// 👇 ARRANQUE CORRECTO
const startServer = async () => {
  try {
    console.log('🔍 Intentando conectar a MongoDB...');
    await connectDB(); // ⬅️ ESPERA a Mongo

    app.listen(PORT, () => {
      console.log(`🚀 Servidor en http://localhost:${PORT}`);
    });

  } catch (error) {
    console.error('❌ No se pudo iniciar el servidor por error en MongoDB');
    process.exit(1);
  }
};

startServer();