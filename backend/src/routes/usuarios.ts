import express from 'express';
import { Usuario } from '../models/Usuario';

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
    const existe = await Usuario.findOne({ email: req.body.email });
    if (existe) {
      return res.status(400).json({ error: 'El email ya está registrado' });
    }
    const nuevo = new Usuario(req.body);
    await nuevo.save();
    res.status(201).json(nuevo);
  } catch (error) {
    res.status(500).json({ error: 'Error al registrar usuario' });
  }
});

// Login de usuario
router.post('/login', async (req, res) => {
  try {
    const usuario = await Usuario.findOne({ 
      email: req.body.email, 
      password: req.body.password 
    });
    if (!usuario) {
      return res.status(401).json({ error: 'Email o contraseña incorrectos' });
    }
    res.json(usuario);
  } catch (error) {
    res.status(500).json({ error: 'Error al iniciar sesión' });
  }
});

export default router;