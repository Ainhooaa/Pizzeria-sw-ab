import express from 'express';
import { Usuario, IUsuario } from '../models/Usuario';

const router = express.Router();

// Obtener todos los usuarios
router.get('/', async (req, res) => {
  try {
    const usuarios = await Usuario.find().select('-password');
    res.json(usuarios);
  } catch (error) {
    res.status(500).json({ error: 'Error al obtener usuarios' });
  }
});

// Actualizar usuario
router.put('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const { nombre, email, telefono, direccion, rol } = req.body;
    
    const usuario = await Usuario.findByIdAndUpdate(
      id,
      { nombre, email, telefono, direccion, rol },
      { new: true, runValidators: true }
    ).select('-password');
    
    if (!usuario) {
      return res.status(404).json({ error: 'Usuario no encontrado' });
    }
    
    res.json(usuario);
  } catch (error) {
    res.status(500).json({ error: 'Error al actualizar usuario' });
  }
});

// Registro de usuario
router.post('/registro', async (req, res) => {
  try {
    console.log('📝 Registrando usuario:', req.body.email);
    const existe = await Usuario.findOne({ email: req.body.email });
    if (existe) {
      return res.status(400).json({ error: 'El email ya está registrado' });
    }
    const nuevo = new Usuario(req.body);
    await nuevo.save();
    
    // Devolver el usuario sin la contraseña
    const usuarioResponse = nuevo.toObject();
    delete (usuarioResponse as Partial<IUsuario>).password;
    console.log('✅ Usuario guardado con contraseña hasheada');

    res.status(201).json(usuarioResponse);
  } catch (error) {
    console.error('Error en registro:', error);
    res.status(500).json({ error: 'Error al registrar usuario' });
  }
});

// Login de usuario
router.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;
    
    const usuario = await Usuario.findOne({ email });
    
    if (!usuario) {
      return res.status(401).json({ error: 'Email o contraseña incorrectos' });
    }
    
    // Comparar contraseña usando el método del modelo
    const passwordValida = await usuario.compararPassword(password);
    
    if (!passwordValida) {
      return res.status(401).json({ error: 'Email o contraseña incorrectos' });
    }
    
    // Devolver usuario sin contraseña
    const usuarioResponse = usuario.toObject();
    delete (usuarioResponse as Partial<IUsuario>).password;
    
    res.json(usuarioResponse);
  } catch (error) {
    console.error('Error en login:', error);
    res.status(500).json({ error: 'Error al iniciar sesión' });
  }
});

export default router;