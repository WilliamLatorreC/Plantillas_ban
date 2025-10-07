import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';

const app = express();
app.use(cors());
app.use(bodyParser.json());

// 👉 Endpoint para generar plantilla SIN fecha
app.post('/generate-template', (req, res) => {
    const { nombre, producto } = req.body;
    const plantilla = `
        Buen dia ${nombre},
        "${producto}"
        ¡Por favor validar!
    `;
    res.json({ plantilla });
});

app.get('/', (req, res) => {
  res.send('Servidor funcionando correctamente 🚀');
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Servidor en puerto ${PORT}`));
