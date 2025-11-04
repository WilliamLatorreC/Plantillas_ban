import express from "express";
import Categoria from "../models/Categoria.js";
import "../models/Plantilla.js";

const router = express.Router();

// 🔹 Obtener todas las categorías
router.get("/", async (req, res) => {
  try {
    const categorias = await Categoria.find()
      .populate("plantillaId", "nombre");
    res.json(categorias);
  } catch (error) {
    console.error("❌ Error detallado al obtener categorías:", error);
    res.status(500).json({ error: "Error al obtener las categorías" });
  }
});

// 🔹 Crear nueva categoría
router.post("/", async (req, res) => {
  try {
    const { nombre, descripcion, plantillaId } = req.body;

    if (!plantillaId) {
      return res.status(400).json({ error: "Debe seleccionar una plantilla válida" });
    }

    // Validar que la plantilla exista
    const plantillaExiste = await mongoose.model('Plantilla').findById(plantillaId);
    if (!plantillaExiste) {
      return res.status(400).json({ error: "La plantilla seleccionada no existe" });
    }

    const nuevaCategoria = new Categoria({ nombre, descripcion, plantillaId });
    await nuevaCategoria.save();
    res.json(nuevaCategoria);
  } catch (error) {
    console.error("❌ Error al crear categoría:", error);
    res.status(500).json({ error: "Error al crear la categoría" });
  }
});

export default router;
