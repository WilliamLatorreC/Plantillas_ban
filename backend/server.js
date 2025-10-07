import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';

const app = express();

// ✅ URL del FRONTEND
const FRONTEND_URL = 'https://plantillas-ban-1.onrender.com';

// 🔹 Configurar CORS
app.use(cors({
  origin: FRONTEND_URL,
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  credentials: true
}));

app.use(bodyParser.json());

// 👉 Endpoint para generar plantilla
app.post('/generate-template', (req, res) => {
  const { nombre, producto } = req.body;
  const plantilla = `
    Buen día ${nombre},
    "${producto}"
    ¡Por favor validar!
  `;
  res.json({ plantilla });
});

// 👉 Endpoint de prueba
app.get('/', (req, res) => {
  res.send('Servidor funcionando correctamente 🚀');
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`✅ Servidor backend en puerto ${PORT}`));
