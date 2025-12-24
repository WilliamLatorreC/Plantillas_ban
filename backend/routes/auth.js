import express from "express";
import Usuario from "../models/Usuario.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import {verifyToken} from "../Middlewares/authMiddleware.js";

const router = express.Router();

// ✔ Crear usuario admin SOLO una vez
/*router.get("/crear-admin", async (req, res) => {
  try {
    const existe = await Usuario.findOne({ correo: "admin@ban100.com.co" });

    if (existe) {
      return res.json({ message: "El admin ya existe" });
    }

    const pass = await bcrypt.hash("admin123", 10);

    await Usuario.create({
      correo: "admin@ban100.com.co",
      contrasena: pass
    });

    res.json({ message: "Admin creado correctamente" });

  } catch (error) {
    console.error("❌ ERROR CREANDO ADMIN:", error);
    res.status(500).json({ message: "Error al crear admin" });
  }
});*/

router.post("/crear-usuario", verifyToken, async (req, res) => {
  try {
    const { correo, contrasena } = req.body;

    // Validación básica
    if (!correo || !contrasena) {
      return res.status(400).json({ message: "Datos incompletos" });
    }

    // Verificar si ya existe
    const existe = await Usuario.findOne({ correo });
    if (existe) {
      return res.status(400).json({ message: "El usuario ya existe" });
    }

    const hash = await bcrypt.hash(contrasena, 10);

    const nuevo = await Usuario.create({
      correo,
      contrasena: hash
    });

    res.json({ message: "Usuario creado", usuario: nuevo });

  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error al crear usuario" });
  }
});


// ✔ LOGIN
router.post("/login", async (req, res) => {

  //console.log("BODY RECIBIDO:", req.body);
  try {
    const { correo, contrasena } = req.body;

    if (!correo || !contrasena) {
      return res.status(400).json({ message: "Datos incompletos" });
    }

    // Buscar por el campo correcto
    //console.log("BUSCANDO USUARIO:", correo);
    const usuario = await Usuario.findOne({ correo });
    if (!usuario) {
      return res.status(400).json({ message: "Usuario no encontrado" });
    }

    //console.log("RESULTADO:", usuario);
    // Comparar la contraseña (con el campo correcto)
    const validPassword = await bcrypt.compare(contrasena, usuario.contrasena);
    if (!validPassword) {
      return res.status(400).json({ message: "Contraseña incorrecta" });
    }

    // Crear token
    const token = jwt.sign({ id: usuario._id }, process.env.JWT_SECRET, { expiresIn: "1h" });

    res.json({
      message: "Login exitoso",
      token,
      usuario: {
        correo: usuario.correo
      }
    });

  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error en el servidor" });
  }
});


export default router;
