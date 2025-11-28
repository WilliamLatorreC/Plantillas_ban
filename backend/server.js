import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import mongoose from 'mongoose';
import dotenv from "dotenv";
import categoriaRoutes from './routes/categorias.js';
import authRoutes from "./routes/auth.js";
import Plantilla from './models/Plantilla.js';

dotenv.config();

const app = express();

// ===========================
// 1. CONFIGURAR CORS
// ===========================
app.use(cors({
  origin: [
    "http://localhost:4200",
    "https://plantillas-ban-1.onrender.com"
  ],
  methods: ["GET", "POST", "PUT", "DELETE"],
  credentials: true
}));

app.use(express.json());
app.use(bodyParser.json());

// ===========================
// 2. CONEXIÓN MONGO
// ===========================
mongoose.connect(process.env.MONGO_URI, {
  serverSelectionTimeoutMS: 10000
})
.then(() => console.log("MongoDB conectado"))
.catch(err => console.error("Error al conectar MongoDB:", err));

// Manejar preflight OPTIONS
app.options('*', cors());

// ===========================
// 3. RUTAS IMPORTADAS
// ===========================


// Rutas de autenticación
app.use("/api/auth", authRoutes);

// Rutas de categorías
app.use('/categorias', categoriaRoutes);

// ===========================
// CRUD de plantillas
// ===========================

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
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Servidor en puerto ${PORT}`));
