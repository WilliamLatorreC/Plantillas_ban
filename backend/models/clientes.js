import mongoose, { mongo } from "mongoose";


const ClienteSchema = new mongoose.Schema({
    nombre: { type: String, required: true},
    cc: {type: String, required: true},
    telefono: {type: String},
    email: { type: String},
    notas: { type: String}
}, {
    timestamps: true
});

export default mongoose.model("Cliente", ClienteSchema);