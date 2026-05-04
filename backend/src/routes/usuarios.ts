import express from 'express';
import { Usuario } from '../models/Usuario';

const router = express.Router();

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