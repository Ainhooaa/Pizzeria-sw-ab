const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(express.json());

// Conectar a MongoDB
mongoose.connect('mongodb://localhost:27017/pizzeria', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => console.log('Conectado a MongoDB'))
.catch(err => console.error('Error al conectar a MongoDB:', err));

// Esquema de pizza
const pizzaSchema = new mongoose.Schema({
  nombre: String,
  precio: Number,
});

const Pizza = mongoose.model('Pizza', pizzaSchema);

// Rutas de la API
app.get('/pizzas', async (req, res) => {
  const pizzas = await Pizza.find();
  res.json(pizzas);
});

app.post('/pizzas', async (req, res) => {
  const nuevaPizza = new Pizza(req.body);
  await nuevaPizza.save();
  res.json(nuevaPizza);
});

// Levantar servidor
app.listen(3000, () => {
  console.log('Backend corriendo en http://localhost:3000');
});