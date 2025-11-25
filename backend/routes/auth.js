import express from "express";
import Usuario from "../models/Usuario.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";

const router = express.Router();

router.post("/login", async (req, res) => {
  try {
    const { correo, contraseña } = req.body;

    // ⛔ Validar dominio permitido
    if (!correo.endsWith("@ban100.com.co")) {
      return res.status(401).json({ message: "Correo no permitido" });
    }

    const usuario = await Usuario.findOne({ correo });

    if (!usuario) {
      return res.status(401).json({ message: "El usuario no existe" });
    }

    // Validar contraseña
    const validarPass = await bcrypt.compare(contraseña, usuario.contraseña);
    if (!validarPass) {
      return res.status(401).json({ message: "Contraseña incorrecta" });
    }

    // Crear token
    const token = jwt.sign(
      { id: usuario._id, correo: usuario.correo },
      process.env.JWT_SECRET,
      { expiresIn: "8h" }
    );

    res.json({ token });

  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error interno del servidor" });
  }
});

export default router;
