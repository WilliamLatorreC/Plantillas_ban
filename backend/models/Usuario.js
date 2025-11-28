import mongoose from "mongoose";
import Joi from "joi";

const UsuarioSchema = new mongoose.Schema({
  correo: { type: String, required: true, unique: true },
  contrasena: { type: String, required: true }
});

const schema = Joi.object({
  correo: Joi.string().email().required(),
  contrasena: Joi.string().min(6).required()
});

export default mongoose.model("Usuario", UsuarioSchema);