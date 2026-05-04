import express from 'express';
import { Pedido } from '../models/Pedido';

const router = express.Router();

// Obtener todos los pedidos
router.get('/', async (req, res) => {
  try {
    const pedidos = await Pedido.find();
    res.json(pedidos);
  } catch (error) {
    res.status(500).json({ error: 'Error al obtener pedidos' });
  }
});

// Obtener pedidos por email de usuario
router.get('/:email', async (req, res) => {
  try {
    const pedidos = await Pedido.find({ emailUsuario: req.params.email });
    res.json(pedidos);
  } catch (error) {
    res.status(500).json({ error: 'Error al obtener pedidos del usuario' });
  }
});

// Crear nuevo pedido
router.post('/', async (req, res) => {
  try {
    const pedido = new Pedido(req.body);
    await pedido.save();
    res.status(201).json(pedido);
  } catch (error) {
    res.status(500).json({ error: 'Error al crear el pedido' });
  }
});

// Actualizar estado del pedido
router.put('/:id', async (req, res) => {
  try {
    const pedido = await Pedido.findByIdAndUpdate(
      req.params.id,
      { estado: req.body.estado },
      { new: true }
    );
    if (!pedido) {
      return res.status(404).json({ error: 'Pedido no encontrado' });
    }
    res.json(pedido);
  } catch (error) {
    res.status(500).json({ error: 'Error al actualizar el pedido' });
  }
});

export default router;