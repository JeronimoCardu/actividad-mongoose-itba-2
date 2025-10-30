const express = require("express");
const Category = require("../models/categoryModel");
const router = express.Router();

// Crear categoría
router.post("/", async (req, res) => {
  try {
    const category = await Category.create(req.body);
    res.status(201).json(category);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// Listar categorías
router.get("/", async (req, res) => {
  const categories = await Category.find().populate("parentCategory");
  res.json(categories);
});

// Obtener por ID
router.get("/:id", async (req, res) => {
  const category = await Category.findById(req.params.id);
  if (!category) return res.status(404).json({ error: "Categoria no encontrada" });
  res.json(category);
});

// Actualizar
router.put("/:id", async (req, res) => {
  try {
    const category = await Category.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json(category);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// Borrar lógico
router.delete("/:id", async (req, res) => {
  await Category.findByIdAndUpdate(req.params.id, { isActive: false });
  res.json({ message: "Categoria desactivada" });
});

module.exports = router;
