const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(express.json());

// Conectar a MongoDB
mongoose.connect('mongodb://localhost:27017/pizzeria')
  .then(() => console.log('Conectado a MongoDB'))
  .catch(err => console.error('Error al conectar a MongoDB:', err));

// =====================
// ESQUEMAS
// =====================

const pizzaSchema = new mongoose.Schema({
  nombre: String,
  ingredientes: [String],
  precio: Number,
  disponible: Boolean
});

const ingredienteSchema = new mongoose.Schema({
  nombre: String,
  categoria: String,
  precioExtra: Number,
  disponible: Boolean
});

const usuarioSchema = new mongoose.Schema({
  nombre: String,
  email: String,
  telefono: String,
  direccion: String,
  password: String,
  rol: String,
  pizzasFavoritas: Array
});

const pizzaPersonalizadaSchema = new mongoose.Schema({
  emailUsuario: String,
  nombrePizza: String,
  ingredientesElegidos: Array,
  precioBase: Number,
  precioTotal: Number,
  estado: String
});

const pedidoSchema = new mongoose.Schema({
  emailUsuario: String,
  cliente: {
    nombre: String,
    direccion: String,
    telefono: String
  },
  items: Array,
  total: Number,
  estado: String,
  instrucciones: String,
  fecha: { type: Date, default: Date.now }
});

// =====================
// MODELOS
// =====================

const Pizza = mongoose.model('Pizza', pizzaSchema);
const Ingrediente = mongoose.model('Ingrediente', ingredienteSchema);
const Usuario = mongoose.model('Usuario', usuarioSchema);
const PizzaPersonalizada = mongoose.model('PizzaPersonalizada', pizzaPersonalizadaSchema);
const Pedido = mongoose.model('Pedido', pedidoSchema);

// =====================
// RUTAS PIZZAS
// =====================

app.get('/pizzas', async (req, res) => {
  const pizzas = await Pizza.find();
  res.json(pizzas);
});

app.post('/pizzas', async (req, res) => {
  const nueva = new Pizza(req.body);
  await nueva.save();
  res.json(nueva);
});

app.delete('/pizzas/:id', async (req, res) => {
  await Pizza.findByIdAndDelete(req.params.id);
  res.json({ mensaje: 'Pizza eliminada' });
});

// =====================
// RUTAS INGREDIENTES
// =====================

app.get('/ingredientes', async (req, res) => {
  const ingredientes = await Ingrediente.find();
  res.json(ingredientes);
});

app.post('/ingredientes', async (req, res) => {
  const nuevo = new Ingrediente(req.body);
  await nuevo.save();
  res.json(nuevo);
});

// =====================
// RUTAS USUARIOS
// =====================

app.post('/usuarios/registro', async (req, res) => {
  const existe = await Usuario.findOne({ email: req.body.email });
  if (existe) return res.status(400).json({ error: 'El email ya está registrado' });
  const nuevo = new Usuario(req.body);
  await nuevo.save();
  res.json(nuevo);
});

app.post('/usuarios/login', async (req, res) => {
  const usuario = await Usuario.findOne({ email: req.body.email, password: req.body.password });
  if (!usuario) return res.status(401).json({ error: 'Email o contraseña incorrectos' });
  res.json(usuario);
});

// =====================
// RUTAS PIZZAS PERSONALIZADAS
// =====================

app.get('/pizzasPersonalizadas/:email', async (req, res) => {
  const pizzas = await PizzaPersonalizada.find({ emailUsuario: req.params.email });
  res.json(pizzas);
});

app.post('/pizzasPersonalizadas', async (req, res) => {
  const nueva = new PizzaPersonalizada(req.body);
  await nueva.save();
  res.json(nueva);
});

app.delete('/pizzasPersonalizadas/:id', async (req, res) => {
  await PizzaPersonalizada.findByIdAndDelete(req.params.id);
  res.json({ mensaje: 'Pizza personalizada eliminada' });
});

// =====================
// RUTAS PEDIDOS
// =====================

app.get('/pedidos', async (req, res) => {
  const pedidos = await Pedido.find();
  res.json(pedidos);
});

app.get('/pedidos/:email', async (req, res) => {
  const pedidos = await Pedido.find({ emailUsuario: req.params.email });
  res.json(pedidos);
});

app.post('/pedidos', async (req, res) => {
  const nuevo = new Pedido(req.body);
  await nuevo.save();
  res.json(nuevo);
});

app.put('/pedidos/:id', async (req, res) => {
  const pedido = await Pedido.findByIdAndUpdate(req.params.id, { estado: req.body.estado }, { new: true });
  res.json(pedido);
});

// =====================
// ARRANCAR SERVIDOR
// =====================

app.listen(3000, () => {
  console.log('Backend corriendo en http://localhost:3000');
});