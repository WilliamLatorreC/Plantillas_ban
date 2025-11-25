import mongoose from "mongoose";
import bcrypt from "bcryptjs";

const UsuarioSchema = new mongoose.Schema({
  nombre: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true }
});

// Hashear contraseña antes de guardar
UsuarioSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return next();
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
  next();
});

// Comparar contraseñas
UsuarioSchema.methods.comparePassword = async function (password) {
  return bcrypt.compare(password, this.password);
};

const Usuario = mongoose.model("Usuario", UsuarioSchema);

export default Usuario;
