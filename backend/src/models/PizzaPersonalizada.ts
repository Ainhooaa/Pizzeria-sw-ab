import mongoose from 'mongoose';

const pizzaPersonalizadaSchema = new mongoose.Schema({
  emailUsuario: {
    type: String,
    required: true,
  },
  nombrePizza: {
    type: String,
    required: true,
  },
  ingredientesElegidos: [{
    nombre: { type: String, required: true },
    precioExtra: { type: Number, required: true },
    cantidad: { type: Number, default: 1 },
  }],
  precioBase: {
    type: Number,
    required: true,
  },
  precioTotal: {
    type: Number,
    required: true,
  },
  estado: {
    type: String,
    default: 'activa',
  },
}, {
  timestamps: true,
});

export const PizzaPersonalizada = mongoose.model('PizzaPersonalizada', pizzaPersonalizadaSchema);