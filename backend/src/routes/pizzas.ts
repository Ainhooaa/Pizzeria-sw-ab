import express from 'express';
import { Pizza } from '../models/Pizza';

const router = express.Router();

// Obtener todas las pizzas
router.get('/', async (req, res) => {
  try {
    const pizzas = await Pizza.find();
    res.json(pizzas);
  } catch (error) {
    res.status(500).json({ error: 'Error al obtener pizzas' });
  }
});

// Crear nueva pizza
router.post('/', async (req, res) => {
  try {
    const pizza = new Pizza(req.body);
    await pizza.save();
    res.status(201).json(pizza);
  } catch (error) {
    res.status(500).json({ error: 'Error al crear pizza' });
  }
});

// Actualizar pizza
router.put('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const { nombre, ingredientes, precio, disponible, imagen, categoria, destacada } = req.body;
    
    const pizza = await Pizza.findByIdAndUpdate(
      id,
      { nombre, ingredientes, precio, disponible, imagen, categoria, destacada },
      { new: true, runValidators: true }
    );
    
    if (!pizza) {
      return res.status(404).json({ error: 'Pizza no encontrada' });
    }
    
    res.json(pizza);
  } catch (error) {
    console.error('Error PUT /pizzas:', error);
    res.status(500).json({ error: 'Error al actualizar pizza' });
  }
});

// Eliminar pizza
router.delete('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const pizza = await Pizza.findByIdAndDelete(id);
    
    if (!pizza) {
      return res.status(404).json({ error: 'Pizza no encontrada' });
    }
    
    res.json({ mensaje: 'Pizza eliminada correctamente', pizza });
  } catch (error) {
    res.status(500).json({ error: 'Error al eliminar pizza' });
  }
});

export default router;