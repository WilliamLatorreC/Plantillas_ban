import mongoose from "mongoose";

const categoriaSchema = new mongoose.Schema({
  nombre: { type: String, required: true },
  descripcion: { type: String },
  resolucion: { type: String },
  plantillaId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Plantilla",
    required: true,
  },
});

export default mongoose.model("Categoria", categoriaSchema);
