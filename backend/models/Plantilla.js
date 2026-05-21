import mongoose from "mongoose";

const plantillaSchema = new mongoose.Schema(
{
  // =====================================
  // DATOS PRINCIPALES
  // =====================================
  nombre: {
    type: String,
    required: true,
    trim: true
  },

  producto: {
    type: String,
    required: true,
    trim: true
  },

  contenido: {
    type: String,
    required: true
  },

  resolucion: {
    type: String,
    default: ""
  },

  // =====================================
  // CONFIGURACIÓN PROACTIVANET
  // =====================================

  // Tipo ticket
  tipoId: {
    type: String,
    default: ""
  },

  tipoNombre: {
    type: String,
    default: ""
  },

  // Prioridad
  prioridadId: {
    type: String,
    default: ""
  },

  prioridadNombre: {
    type: String,
    default: ""
  },

  // Categoría
  categoriaId: {
    type: String,
    default: ""
  },

  categoriaNombre: {
    type: String,
    default: ""
  },

  // =====================================
  // RELACIONES
  // =====================================

  categoria: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Categoria"
  },

  creador: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Usuario"
  },

  // =====================================
  // ESTADO
  // =====================================

  activa: {
    type: Boolean,
    default: true
  }

},
{
  timestamps: true
});

export default mongoose.model("Plantilla", plantillaSchema);