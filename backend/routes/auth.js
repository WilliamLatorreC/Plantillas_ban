import express from "express";
import Usuario from "../models/Usuario.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

const router = express.Router();

// ✔ Crear usuario admin SOLO una vez
router.get("/crear-admin", async (req, res) => {
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
});

// ✔ LOGIN
router.post("/login", async (req, res) => {
  try {
    const { correo, contrasena } = req.body;

    const usuario = await Usuario.findOne({ correo });
    if (!usuario) {
      return res.status(400).json({ message: "Usuario no encontrado" });
    }

    if (usuario.contrasena !== contrasena) {
      return res.status(400).json({ message: "Contraseña incorrecta" });
    }

    res.json({
      message: "Login correcto",
      token: "TOKEN_DE_EJEMPLO"
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error en login" });
  }
});

export default router;
