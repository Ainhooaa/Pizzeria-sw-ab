import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { connectDB } from './config/database';
import pizzaRoutes from './routes/pizzas';

console.log('1️⃣ Iniciando servidor...');

dotenv.config();
console.log('2️⃣ Variables de entorno cargadas');

console.log('3️⃣ Conectando a MongoDB...');
connectDB();

const app = express();
const PORT = process.env.PORT || 5000;
console.log(`4️⃣ Puerto configurado: ${PORT}`);

app.use(cors());
app.use(express.json());
console.log('5️⃣ Middlewares configurados');

app.use('/api/pizzas', pizzaRoutes);

app.get('/api/health', (req, res) => {
  res.json({ message: 'Servidor funcionando' });
});
console.log('6️⃣ Rutas configuradas');

app.listen(PORT, () => {
  console.log(`7️⃣ 🚀 Servidor en http://localhost:${PORT}`);
});

console.log('8️⃣ Código completo, esperando conexiones...');