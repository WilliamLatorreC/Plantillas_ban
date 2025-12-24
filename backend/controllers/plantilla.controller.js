import Plantilla from "../models/Plantilla.js";

export const buscarPlantillas = async (req, res) => {
  try {
    const q = req.query.q || "";

    const plantillas = await Plantilla.find({
      nombre: { $regex: q, $options: "i" }
    }).limit(20);

    res.json(plantillas);
  } catch (error) {
    res.status(500).json({ error: "Error al buscar plantillas" });
  }
};

export const crearPlantilla = async (req, res) => {
  try {
    const plantilla = new Plantilla(req.body);
    await plantilla.save();
    res.json(plantilla);
  } catch (error) {
    res.status(500).json({ error: "Error al crear plantilla" });
  }
};

export const obtenerPlantilla = async (req, res) => {
  try {
    const plantilla = await Plantilla.findById(req.params.id);
    res.json(plantilla);
  } catch (error) {
    res.status(500).json({ error: "Plantilla no encontrada" });
  }
};
