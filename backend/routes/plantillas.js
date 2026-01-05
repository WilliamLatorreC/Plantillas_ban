import { Router } from "express";
import express from "express";
import {
  buscarPlantillas,
  crearPlantilla,
  obtenerPlantilla
} from "../controllers/plantilla.controller.js";
import Plantilla from "../models/Plantilla.js";

const router = express.Router();

// routes/plantillas.js
router.get("/buscar", async (req, res) => {
  try {
    const q = req.query.q || "";

    const resultados = await Plantilla.find({
      nombre: { $regex: q, $options: "i" }
    });

    res.json(resultados);
  } catch (error) {
    console.error("❌ ERROR BUSCAR:", error);
    res.status(500).json({ error: "Error al buscar plantillas" });
  }
});

// 📄 OBTENER POR ID (SIEMPRE ABAJO)
router.get("/:id", async (req, res) => {
  try {
    const plantilla = await Plantilla.findById(req.params.id);

    if (!plantilla) {
      return res.status(404).json({ error: "Plantilla no encontrada" });
    }

    res.json(plantilla);
  } catch (error) {
    res.status(500).json({ error: "Error al obtener plantilla" });
  }
});

// Actualizar plantilla
router.put('/:id', async (req, res) => {
  try {
    const plantillaActualizada = await Plantilla.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );

    if (!plantillaActualizada) {
      return res.status(404).json({ error: 'Plantilla no encontrada' });
    }

    res.json(plantillaActualizada);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error al actualizar la plantilla' });
  }
});

export default router;
