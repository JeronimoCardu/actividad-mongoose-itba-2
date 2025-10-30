const express = require("express");
const productModel = require("../models/productModel");
const routes = express.Router();

routes.get("/", (req, res) => {
  const productos = productModel.find().populate("category");
  res.json(200).json(productos);
});

routes.get("/:id", (req, res) => {
  const id = req.params.id;
  const producto = modelProductos.findById(id).populate("category");
  if (producto) {
    res.status(200).json(producto);
  } else {
    res.status(404).json({ message: "Producto no encontrado" });
  }
});

routes.post("/", (req, res) => {
  const nuevoProducto = req.body;
  modelProductos.create(nuevoProducto);
  res.status(201).json({
    message: "Producto creado con éxito!",
    producto: nuevoProducto,
  });
});

routes.put("/:id", (req, res) => {
  const id = req.params.id;
  const datosActualizados = req.body;
  const productoActualizado = modelProductos.findAndUpdateById(
    id,
    datosActualizados,
    { new: true, runValidators: true }
  );
  if (productoActualizado) {
    res.status(200).json({
      message: "Producto actualizado con éxito!",
      producto: productoActualizado,
    });
  } else {
    res.status(404).json({ message: "Producto no encontrado" });
  }
});

routes.delete("/:id", (req, res) => {
  const id = req.params.id;
  const productoEliminado = modelProductos.deleteById(id);
  if (productoEliminado) {
    res
      .status(200)
      .json({
        message: `Producto ${productoEliminado.name} eliminado con éxito!`,
      });
  } else {
    res.status(404).json({ message: "Producto no encontrado" });
  }
});

module.exports = routes;
