import express from 'express';
import { PizzaPersonalizada } from '../models/PizzaPersonalizada';

const router = express.Router();

// Obtener pizzas personalizadas por email de usuario
router.get('/:email', async (req, res) => {
  try {
    const pizzas = await PizzaPersonalizada.find({ emailUsuario: req.params.email });
    res.json(pizzas);
  } catch (error) {
    res.status(500).json({ error: 'Error al obtener pizzas personalizadas' });
  }
});

// Guardar nueva pizza personalizada
router.post('/', async (req, res) => {
  try {
    const nuevaPizza = new PizzaPersonalizada(req.body);
    await nuevaPizza.save();
    res.status(201).json(nuevaPizza);
  } catch (error) {
    res.status(500).json({ error: 'Error al guardar pizza personalizada' });
  }
});

// Eliminar pizza personalizada
router.delete('/:id', async (req, res) => {
  try {
    const pizza = await PizzaPersonalizada.findByIdAndDelete(req.params.id);
    if (!pizza) {
      return res.status(404).json({ error: 'Pizza no encontrada' });
    }
    res.json({ mensaje: 'Pizza personalizada eliminada' });
  } catch (error) {
    res.status(500).json({ error: 'Error al eliminar pizza personalizada' });
  }
});

export default router;