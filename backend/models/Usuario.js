import mongoose from "mongoose";

const UsuarioSchema = new mongoose.Schema({
  correo: { type: String, required: true, unique: true },
  contrasena: { type: String, required: true }
});

export default mongoose.model("Usuario", UsuarioSchema);