import express from 'express';
import axios from 'axios';

const router = express.Router();

router.post('/crear-ticket', async (req, res) => {

  try {

    console.log('BODY RECIBIDO:');
    console.log(req.body);

    const response = await axios.post(
      'https://ban100.proactivanet.com/proactivanet/api/Incidents',
      req.body,
      {
        headers: {
          Authorization: `Bearer ${process.env.PROACTIVANET_TOKEN}`,
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
        maxRedirects: 0
      }
    );

    console.log('RESPUESTA OK');
    console.log(response.data);
    console.log(process.env.PROACTIVANET_TOKEN);

    console.log('✅ Ruta Proactivanet cargada');

    res.json({
        ok: true,
        codigo: response.data.Code,
        id: response.data.Id
    });

  } catch (error) {

    console.log('ERROR COMPLETO:');

    if (error.response) {

      console.log(error.response.status);

      console.log(error.response.data);

      res.status(error.response.status).json({
        error: error.response.data
      });

    } else {

      console.log(error.message);

      res.status(500).json({
        error: error.message
      });

    }

  }

});

router.get('/categorias/buscar', async (req, res) => {

  try {

    const page = req.query.page || 1;
    const size = 50;

    const response = await axios.get(
      `https://ban100.proactivanet.com/proactivanet/api/categories?page=${page}&pageSize=${size}`,
      {
        headers: {
          Authorization: `Bearer ${process.env.PROACTIVANET_TOKEN}`,
          Accept: 'application/json'
        }
      }
    );

    console.log(response.data);

    res.json(response.data);

  } catch (error) {

    console.log(
      error.response?.data || error.message
    );

    res.status(500).json({
      error: error.response?.data
    });

  }

});

export default router;