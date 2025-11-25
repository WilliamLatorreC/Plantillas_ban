import express from "express";
import Categoria from "../models/Categoria.js";

const router = express.Router();

// Obtener todas las categorías
router.get("/", async (req, res) => {
  try {
    const categorias = await Categoria.find().populate("plantilla");
    res.json(categorias);
  } catch (error) {
    res.status(500).json({ error: "Error al obtener las categorías" });
  }
});

// Crear nueva categoría
router.post("/", async (req, res) => {
  try {
    const nuevaCategoria = new Categoria(req.body);
    await nuevaCategoria.save();
    res.json(nuevaCategoria);
  } catch (error) {
    res.status(500).json({ error: "Error al crear la categoría" });
  }

  app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, 'dist/tu-app/index.html'));
  });
});

export default router;
