import mongoose from 'mongoose';

const pizzaSchema = new mongoose.Schema({
  nombre: {
    type: String,
    required: true,
  },
  ingredientes: [{
    type: String,
    required: true,
  }],
  precio: {
    type: Number,
    required: true,
  },
  imagen: {
    type: String,
    required: true,
  },
  categoria: {
    type: String,
    enum: ['clasica', 'especial', 'personalizada'],
    default: 'clasica',
  },
  destacada: {
    type: Boolean,
    default: false,
  }
}, {
  timestamps: true,
});

export const Pizza = mongoose.model('Pizza', pizzaSchema);