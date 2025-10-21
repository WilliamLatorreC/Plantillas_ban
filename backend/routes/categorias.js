import express from "express";
import Categoria from "../models/Categoria.js";

const router = express.Router();

// 🔹 Obtener todas las categorías
router.get("/", async (req, res) => {
  try {
    const categorias = await Categoria.find().populate("plantilla");
    res.json(categorias);
  } catch (error) {
    console.error("❌ Error al obtener categorías:", error);
    res.status(500).json({ error: "Error al obtener las categorías" });
  }
});

// 🔹 Crear nueva categoría
router.post("/", async (req, res) => {
  try {
    const nuevaCategoria = new Categoria(req.body);
    await nuevaCategoria.save();
    res.json(nuevaCategoria);
  } catch (error) {
    console.error("❌ Error al crear categoría:", error);
    res.status(500).json({ error: "Error al crear la categoría" });
  }
});

export default router;
