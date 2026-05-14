import mongoose from 'mongoose';
import bcrypt from 'bcrypt';

// Interfaz para los métodos del usuario
export interface IUsuarioMethods {
  compararPassword(password: string): Promise<boolean>;
}

// Interfaz para el documento del usuario
export interface IUsuario extends mongoose.Document {
  nombre: string;
  email: string;
  telefono: string;
  direccion: string;
  password: string;
  rol: 'user' | 'admin' | 'cliente';
  pizzasFavoritas: mongoose.Types.ObjectId[];
  createdAt: Date;
  updatedAt: Date;
  compararPassword(password: string): Promise<boolean>;
}

const usuarioSchema = new mongoose.Schema<IUsuario, {}, IUsuarioMethods>({
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
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  rol: {
    type: String,
    enum: ['user', 'admin'],
    default: 'user',
  },
  pizzasFavoritas: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Pizza',
  }],
}, {
  timestamps: true,
});

// Middleware: Hashear la contraseña antes de guardar
usuarioSchema.pre('save', function() {
  // Solo hashear si la contraseña fue modificada o es nueva
  if (!this.isModified('password')) {
    return;
  }
  
  const self = this;
  
  // Usar Promise para manejar la asincronía
  return new Promise((resolve, reject) => {
    bcrypt.genSalt(10, (err: any, salt: string) => {
      if (err) return reject(err);
      
      bcrypt.hash(self.password, salt, async (err: any, hash: string) => {
        if (err) return reject(err);
        self.password = hash;
        resolve();
      });
    });
  });
});

// Método para comparar contraseñas
usuarioSchema.methods.compararPassword = async function(password: string): Promise<boolean> {
  return bcrypt.compare(password, this.password);
};

export const Usuario = mongoose.model<IUsuario, any>('Usuario', usuarioSchema);