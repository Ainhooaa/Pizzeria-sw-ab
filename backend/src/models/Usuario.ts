import mongoose from 'mongoose';

const usuarioSchema = new mongoose.Schema({
  nombre: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  telefono: {
    type: String,
    required: true,
  },
  direccion: {
    type: String,
    default: '',
  },
  password: {
    type: String,
    required: true,
  },
  rol: {
    type: String,
    enum: ['cliente', 'admin'],
    default: 'cliente',
  },
  pizzasFavoritas: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Pizza',
  }],
}, {
  timestamps: true,
});

export const Usuario = mongoose.model('Usuario', usuarioSchema);