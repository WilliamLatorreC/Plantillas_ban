import express from "express";
import Categoria from "../models/Categoria.js";
import "../models/Plantilla.js";
import mongoose, { Types } from "mongoose";

const router = express.Router();

// 🔹 Obtener todas las categorías
router.get("/", async (req, res) => {
  try {
    const categorias = await Categoria.find()
      .populate("plantillaId", "nombre producto");
    res.json(categorias);
  } catch (error) {
    console.error("❌ Error detallado al obtener categorías:", error);
    res.status(500).json({ error: "Error al obtener las categorías" });
  }
});

// 🔹 Crear nueva categoría
router.post("/", async (req, res) => {
  try {
    const { nombre, descripcion, tipo, plantillaId } = req.body;

    if (!plantillaId) {
      return res.status(400).json({ error: "El campo plantillaId es obligatorio" });
    }

    if (!tipo || !["Requerimiento", "Incidencia"].includes(tipo)) {
      return res.status(400).json({ error: "El campo tipo debe ser 'Requerimiento' o 'Incidencia'" });
    }

    const nuevaCategoria = new Categoria({
      nombre,
      descripcion,
      tipo,
      plantillaId: new Types.ObjectId(plantillaId),
    });

    await nuevaCategoria.save();
    res.json(nuevaCategoria);
  } catch (error) {
    console.error("❌ Error al crear categoría:", error);
    res.status(500).json({ error: "Error al crear la categoría" });
  }
});

export default router;
