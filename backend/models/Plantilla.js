import mongoose from "mongoose";

const plantillaSchema = new mongoose.Schema({
  nombre: { type: String, required: true },
  producto: { type: String, required: true },
  contenido: { type: String, required: true },
  fechaCreacion: { type: Date, default: Date.now }
});

const Plantilla = mongoose.model("Plantilla", plantillaSchema);

export default Plantilla;
