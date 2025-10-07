import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';

const app = express();

// URL del frontend desplegado en Render
const FRONTEND_URL = 'https://plantillas-ban-1.onrender.com';

// Configurar CORS
app.use(cors({
  origin: FRONTEND_URL, // Permite solicitudes solo desde tu frontend
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  credentials: true
}));

app.use(bodyParser.json());

// 👉 Endpoint para generar plantilla SIN fecha
app.post('/generate-template', (req, res) => {
  const { nombre, producto } = req.body;
  const plantilla = `
    Buen día ${nombre},
    "${producto}"
    ¡Por favor validar!
  `;
  res.json({ plantilla });
});

app.get('/', (req, res) => {
  res.send('Servidor funcionando correctamente 🚀');
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`✅ Servidor backend en puerto ${PORT}`));
