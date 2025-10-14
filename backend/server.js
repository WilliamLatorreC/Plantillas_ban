import express from "express";
import cors from "cors";
import bodyParser from "body-parser";
import mongoose from "mongoose";
import Plantilla from "./models/Plantilla.js";

const app = express();

const FRONTEND_URL = "https://plantillas-ban-1.onrender.com";

app.use(cors({
  origin: [FRONTEND_URL, "http://localhost:4200"], // permite local y render
  methods: ["GET", "POST", "PUT", "DELETE"],
  credentials: true,
}));

app.use(bodyParser.json());

// 🔹 Conexión a MongoDB Atlas
const MONGO_URI = "mongodb+srv://andresroot:andres2003@cluster0.dw4y432.mongodb.net/plantillas_db?retryWrites=true&w=majority";

mongoose.connect(MONGO_URI)
  .then(() => console.log("✅ Conectado a MongoDB Atlas"))
  .catch((err) => console.error("❌ Error de conexión a MongoDB:", err));

// 🔹 Endpoint para generar texto
app.post("/generate-template", (req, res) => {
  const { nombre, producto } = req.body;
  const plantilla = `
    Buen día ${nombre},
    "${producto}"
    ¡Por favor validar!
  `;
  res.json({ plantilla });
});

// 🔹 Endpoint para guardar una plantilla
app.post("/plantillas", async (req, res) => {
  try {
    const nueva = new Plantilla(req.body);
    await nueva.save();
    res.status(201).json(nueva);
  } catch (error) {
    console.error("Error al guardar plantilla:", error);
    res.status(500).json({ error: "Error al guardar plantilla" });
  }
});

// 🔹 Endpoint para listar plantillas
app.get("/plantillas", async (req, res) => {
  try {
    const plantillas = await Plantilla.find().sort({ fechaCreacion: -1 });
    res.json(plantillas);
  } catch (error) {
    console.error("Error al obtener plantillas:", error);
    res.status(500).json({ error: "Error al obtener plantillas" });
  }
});

app.get("/", (req, res) => res.send("Servidor funcionando correctamente 🚀"));

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`✅ Servidor backend en puerto ${PORT}`));
