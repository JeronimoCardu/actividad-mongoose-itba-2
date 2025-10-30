const express = require("express");
const routes = express.Router();
const categoryModel = require("../models/categoryModel");

routes.get("/", async (req, res) => {
  try {
    const categorias = await categoryModel.find().populate("parentCategory");
    res.status(200).json(categorias);
  } catch (error) {
    res.status(500).json({ message: "Error al obtener las categorías" });
  }
});

routes.get("/:id", async (req, res) => {
  const id = req.params.id;
  try {
    const categoria = await categoryModel
      .findById(id)
      .populate("parentCategory");
    if (categoria) {
      res.status(200).json(categoria);
    } else {
      res.status(404).json({ message: "Categoria no encontrada" });
    }
  } catch (error) {
    res.status(500).json({ message: "Error al obtener la categoría" });
  }
});

routes.post("/", async (req, res) => {
  const nuevaCategoria = req.body;
  try {
    const categoriaCreada = await categoryModel.create(nuevaCategoria);
    res.status(201).json({
      message: "Categoria criada com sucesso!",
      categoria: categoriaCreada,
    });
  } catch (error) {
    res.status(500).json({ message: "Error al crear la categoría" });
  }
});

routes.put("/:id", async (req, res) => {
  const id = req.params.id;
  const datosActualizados = req.body;
  try {
    const categoriaActualizada = await categoryModel.findByIdAndUpdate(
      id,
      datosActualizados,
      { new: true, runValidators: true }
    );
    if (categoriaActualizada) {
      res.status(200).json({
        message: "Categoria actualizada con éxito!",
        categoria: categoriaActualizada,
      });
    } else {
      res.status(404).json({ message: "Categoria no encontrada" });
    }
  } catch (error) {
    res.status(500).json({ message: "Error al actualizar la categoría" });
  }
});

routes.delete("/:id", async (req, res) => {
  const id = req.params.id;
  try {
    const categoriaEliminada = await categoryModel.findByIdAndDelete(id);
    if (categoriaEliminada) {
      res.status(200).json({
        message: `Categoria ${categoriaEliminada.name} eliminada con éxito!`,
      });
    } else {
      res.status(404).json({ message: "Categoria no encontrada" });
    }
  } catch (error) {
    res.status(500).json({ message: "Error al eliminar la categoría" });
  }
});

module.exports = routes;
