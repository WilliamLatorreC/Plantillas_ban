import mongoose from "mongoose";

const categoriaSchema = new mongoose.Schema({
  nombre: { type: String, required: true },
  descripcion: { type: String },
  tipo: { 
      type: String, 
      enum: ["Requerimiento", "Incidencia"],
      required: true 
    },
  plantillaId: { type: mongoose.Schema.Types.ObjectId, ref: "Plantilla" }
});

export default mongoose.model('Categoria', categoriaSchema);
