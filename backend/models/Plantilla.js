import mongoose from 'mongoose';

const plantillaSchema = new mongoose.Schema({
  nombre: { type: String, required: true },
  producto: { type: String, required: true },
  contenido: { type: String, required: true },
  resolucion: { type: String, required: false },
  categoria: { 
    type: mongoose.Schema.Types.ObjectId, 
    ref: 'Categoria' 
  }
}, {
  timestamps: true 
});

const Plantilla = mongoose.model('Plantilla', plantillaSchema);
export default Plantilla;