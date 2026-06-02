import mongoose from "mongoose";

const categoriaSchema = new mongoose.Schema({

  nombre: {
    type: String,
    required: true
  },

  typeId: {
    type: String,
    required: true
  },

  categoryId: {
    type: String,
    required: true
  },

  portfolioId: {
    type: String,
    required: true
  }

});

export default mongoose.model(
  "Categoria",
  categoriaSchema
);