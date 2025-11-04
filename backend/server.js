import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import mongoose from 'mongoose';
import Plantilla from './models/Plantilla.js';
import categoriaRoutes from './routes/categorias.js';

const app = express();

// ✅ Configurar CORS
app.use(cors({
  origin: ['http://localhost:4200', 'https://plantillas-ban-1.onrender.com'],
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  credentials: true
}));

app.use(bodyParser.json());

// ✅ Conexión a MongoDB Atlas
const MONGO_URI = "mongodb+srv://andresroot:andres2003@cluster0.dw4y432.mongodb.net/plantillas_db?retryWrites=true&w=majority";
mongoose.connect(MONGO_URI)
  .then(() => console.log("✅ Conectado a MongoDB Atlas"))
  .catch(err => console.error("❌ Error de conexión a MongoDB:", err));

// ✅ Rutas de Categorías
app.use('/categorias', categoriaRoutes);

// =============================
//  ENDPOINTS CRUD DE PLANTILLAS
// =============================

// Crear nueva plantilla
app.post('/plantillas', async (req, res) => {
  try {
    const nueva = new Plantilla(req.body);
    const guardada = await nueva.save();
    res.status(201).json(guardada);
  } catch (error) {
    console.error("❌ Error al crear plantilla:", error);
    res.status(500).json({ error: "Error al crear plantilla" });
  }
});

// Obtener todas las plantillas
app.get('/plantillas', async (req, res) => {
  try {
    const plantillas = await Plantilla.find();
    res.json(plantillas);
  } catch (error) {
    res.status(500).json({ error: "Error al obtener plantillas" });
  }
});

// Actualizar plantilla
app.put('/plantillas/:id', async (req, res) => {
  try {
    const actualizada = await Plantilla.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json(actualizada);
  } catch (error) {
    res.status(500).json({ error: "Error al actualizar plantilla" });
  }
});

// Eliminar plantilla
app.delete('/plantillas/:id', async (req, res) => {
  try {
    await Plantilla.findByIdAndDelete(req.params.id);
    res.json({ mensaje: "Plantilla eliminada" });
  } catch (error) {
    res.status(500).json({ error: "Error al eliminar plantilla" });
  }
});

// Endpoint de prueba
app.get('/', (req, res) => {
  res.send('Servidor funcionando correctamente 🚀');
});

// ✅ Iniciar servidor
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`✅ Servidor backend en puerto ${PORT}`));
