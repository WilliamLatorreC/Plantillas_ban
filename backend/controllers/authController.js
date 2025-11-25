import User from "../models/Usuario.js";
import jwt from "jsonwebtoken";

export const login = async (req, res) => {
  try {
    const { username, password } = req.body;

    const user = await User.findOne({ username });

    if (!user)
      return res.status(401).json({ error: "Usuario o contraseña inválidos" });

    const valid = await user.comparePassword(password);

    if (!valid)
      return res.status(401).json({ error: "Usuario o contraseña inválidos" });

    const token = jwt.sign(
      { id: user._id, username: user.username },
      process.env.JWT_SECRET,
      { expiresIn: "8h" }
    );

    return res.status(200).json({ token });

  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Error en el servidor" });
  }
};