const express = require("express");
const routes = express.Router();

routes.get("/", (req, res) => {
  const categorias = modelCategorias.find().populate("parentCategory");
  res.json(200).json(categorias);
});

routes.get("/:id", (req, res) => {
  const id = req.params.id;
  const categoria = modelCategorias
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
  modelCategorias.create(nuevaCategoria);
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
  const categoriaActualizada = modelCategorias.findAndUpdateById(
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
  const categoriaEliminada = modelCategorias.deleteById(id);
  if (categoriaEliminada) {
    res.status(200).json({ message: `Categoria ${categoriaEliminada.name} eliminada con éxito!` });
  } else {
    res.status(404).json({ message: "Categoria no encontrada" });
  }
});

module.exports = routes;
