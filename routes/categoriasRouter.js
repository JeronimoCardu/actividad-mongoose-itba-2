const express = require("express");
const routes = express.Router();
const categoryModel = require("../models/categoryModel");

routes.get("/", (req, res) => {
  const categorias = categoryModel.find().populate("parentCategory");
  res.json(200).json(categorias);
});

routes.get("/:id", (req, res) => {
  const id = req.params.id;
  const categoria = categoryModel
    .findById(id)
    .populate("parentCategory");
  if (categoria) {
    res.status(200).json(categoria);
  } else {
    res.status(404).json({ message: "Categoria no encontrada" });
  }
});

routes.post("/", (req, res) => {
  const nuevaCategoria = req.body;
  categoryModel.create(nuevaCategoria);
  res
    .status(201)
    .json({
      message: "Categoria criada com sucesso!",
      categoria: nuevaCategoria,
    });
});

routes.put("/:id", (req, res) => {
  const id = req.params.id;
  const datosActualizados = req.body;
  const categoriaActualizada = categoryModel.findAndUpdateById(
    id,
    datosActualizados,{ new: true , runValidators: true}
  );
  if (categoriaActualizada) {
    res
      .status(200)
      .json({
        message: "Categoria actualizada con éxito!",
        categoria: categoriaActualizada,
      });
  } else {
    res.status(404).json({ message: "Categoria no encontrada" });
  }
});

routes.delete("/:id", (req, res) => {
  const id = req.params.id;
  const categoriaEliminada = categoryModel.deleteById(id);
  if (categoriaEliminada) {
    res.status(200).json({ message: `Categoria ${categoriaEliminada.name} eliminada con éxito!` });
  } else {
    res.status(404).json({ message: "Categoria no encontrada" });
  }
});

module.exports = routes;
