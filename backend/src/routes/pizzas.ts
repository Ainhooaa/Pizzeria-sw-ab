import express from 'express';
import { Pizza } from '../models/Pizza';

const router = express.Router();

router.get('/', async (req, res) => {
  const pizzas = await Pizza.find();
  res.json(pizzas);
});

router.post('/', async (req, res) => {
  const pizza = new Pizza(req.body);
  await pizza.save();
  res.status(201).json(pizza);
});

export default router;