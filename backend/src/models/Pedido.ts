import mongoose from 'mongoose';

const pedidoSchema = new mongoose.Schema({
  emailUsuario: {
    type: String,
    required: true,
  },
  cliente: {
    nombre: { type: String, required: true },
    direccion: { type: String, required: true },
    telefono: { type: String, required: true },
  },
  items: [{
    tipo: { type: String, default: 'pizza' },
    pizzaNombre: { type: String, required: true },
    cantidad: { type: Number, required: true, min: 1 },
    precioUnitario: { type: Number, required: true },
  }],
  total: {
    type: Number,
    required: true,
  },
  estado: {
    type: String,
    enum: ['pendiente', 'preparando', 'entregado'],
    default: 'pendiente',
  },
  instrucciones: {
    type: String,
    default: '',
  },
  fecha: {
    type: Date,
    default: Date.now,
  },
}, {
  timestamps: true,
});

export const Pedido = mongoose.model('Pedido', pedidoSchema);