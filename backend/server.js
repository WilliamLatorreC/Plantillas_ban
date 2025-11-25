import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import mongoose from 'mongoose';
import Plantilla from './models/Plantilla.js';
import categoriaRoutes from './routes/categorias.js';
import authRoutes from "./routes/auth.js";

const app = express();

// ===========================
// 1. CONFIGURAR CORS CORRECTO
// ===========================
const allowedOrigins = [
  "http://localhost:4200",
  "https://plantillas-ban-1.onrender.com"
];

app.use(cors({
  origin: function (origin, callback) {
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error("No permitido por CORS"));
    }
  },
  methods: "GET,POST,PUT,DELETE",
  allowedHeaders: "Content-Type, Authorization",
  credentials: true
}));

// Manejar preflight OPTIONS correctamente
app.options('*', cors());

app.use(bodyParser.json());

// ===========================
// 2. CONEXIÓN A MONGO
// ===========================
const MONGO_URI = "mongodb+srv://andresroot:andres2003@cluster0.dw4y432.mongodb.net/plantillas_db?retryWrites=true&w=majority";

mongoose.connect(MONGO_URI)
  .then(() => console.log("✅ Conectado a MongoDB Atlas"))
  .catch(err => console.error("❌ Error de conexión a MongoDB:", err));

// ===========================
// 3. RUTAS
// ===========================

// Login primero (IMPORTANTE)
app.use("/api/auth", authRoutes);

// Categorías
app.use('/categorias', categoriaRoutes);

// CRUD Plantillas
app.post('/plantillas', async (req, res) => {
  try {
    const nueva = new Plantilla(req.body);
    const guardada = await nueva.save();
    res.status(201).json(guardada);
  } catch (error) {
    res.status(500).json({ error: "Error al crear plantilla" });
  }
});

app.get('/plantillas', async (req, res) => {
  try {
    const plantillas = await Plantilla.find();
    res.json(plantillas);
  } catch (error) {
    res.status(500).json({ error: "Error al obtener plantillas" });
  }
});

app.put('/plantillas/:id', async (req, res) => {
  try {
    const actualizada = await Plantilla.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json(actualizada);
  } catch (error) {
    res.status(500).json({ error: "Error al actualizar plantilla" });
  }
});

app.delete('/plantillas/:id', async (req, res) => {
  try {
    await Plantilla.findByIdAndDelete(req.params.id);
    res.json({ mensaje: "Plantilla eliminada" });
  } catch (error) {
    res.status(500).json({ error: "Error al eliminar plantilla" });
  }
});

// Página principal
app.get('/', (req, res) => {
  res.send('Servidor funcionando correctamente 🚀');
});

// ===========================
// 4. INICIAR SERVIDOR
// ===========================
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`✅ Servidor backend en puerto ${PORT}`));
