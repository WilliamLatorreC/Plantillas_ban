const express = require('express');
const router = express.Router();
const Categoria = require('../models/Categoria');

// Obtener todas las categorías (con plantillas asociadas)
router.get('/', async (req, res) => {
  try {
    const categorias = await Categoria.find().populate('plantillas');
    res.json(categorias);
  } catch (err) {
    res.status(500).json({ error: 'Error al obtener categorías' });
  }
});

// Crear nueva categoría
router.post('/', async (req, res) => {
  try {
    const nueva = new Categoria({
      nombre: req.body.nombre,
      descripcion: req.body.descripcion,
      plantillas: req.body.plantillas || []
    });

    await nueva.save();
    res.status(201).json({ mensaje: 'Categoría creada correctamente' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Error al crear categoría' });
  }

  app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, 'dist/tu-app/index.html'));
  });
});

module.exports = router;
