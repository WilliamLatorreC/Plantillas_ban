import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import mongoose from 'mongoose';
import dotenv from "dotenv";
import categoriaRoutes from './routes/categorias.js';
import authRoutes from "./routes/auth.js";
import Plantilla from './models/Plantilla.js';
import helmet from "helmet";
import rateLimit from "express-rate-limit";
import clientesRoutes from "./routes/clientes.js";
import plantillasRoutes from "./routes/plantillas.js";

dotenv.config();

const app = express();
app.use(helmet());

app.use((req, res, next) => {
    console.log("🔵 Petición recibida:", req.method, req.url);
    next();
});

// ===========================
// 1. CONFIGURAR CORS
// ===========================
app.use(cors({
  origin: [
    "http://localhost:4200",
    "https://plantillas-ban-1.onrender.com",
    "https://plantillas-ban.onrender.com"
  ],
  methods: ["GET", "POST", "PUT", "DELETE"],
  credentials: true
}));

app.use(express.json());
app.use(bodyParser.json());
app.use(express.urlencoded({ extended: true }));

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

const loginLimiter = rateLimit({
  windowMs: 5 * 60 * 1000,
  max: 10,
  message: "Demasiados intentos, intenta más tarde"
});

// El rate limiter SOLO para el login, antes de las rutas
app.use("/api/auth/login", loginLimiter);
app.use("/api/auth", authRoutes);


app.use('/api/clientes', clientesRoutes);
app.use("/api/plantillas", plantillasRoutes);

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
