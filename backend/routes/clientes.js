import express from 'express';
import Cliente from '../models/clientes.js';

const router = express.Router();

router.get('/buscar/:q', async (req, res) => {
  console.log('🔍 Buscando cliente:', req.params.q);

  try {
    const q = req.params.q;

    const clientes = await Cliente.find({
      $or: [
        { nombre: { $regex: q, $options: 'i' } },
        { cc: { $regex: q, $options: 'i' } },
        { email: { $regex: q, $options: 'i' } }
      ]
    });

    res.json(clientes);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error buscando clientes' });
  }
});

router.post('/', async (req, res) => {
  try {
    const cliente = new Cliente(req.body);
    await cliente.save();
    res.status(201).json(cliente);
  } catch (error) {
    res.status(400).json({ error: 'No se pudo crear el cliente' });
  }
});

export default router;
