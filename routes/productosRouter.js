const express = require("express");
const productModel = require("../models/productModel");
const routes = express.Router();

routes.get("/", async (req, res) => {
  try {
    const productos = await productModel.find().populate("category");
    res.status(200).json(productos);
  } catch (error) {
    res.status(500).json({ message: "Error al obtener productos" });
  }
});

routes.get("/:id",  async (req, res) => {
  const id = req.params.id;
  try {
    const producto = await productModel.findById(id).populate("category");
    if (producto) {
      res.status(200).json(producto);
    } else {
      res.status(404).json({ message: "Producto no encontrado" });
    }
  } catch (error) {
    res.status(500).json({ message: "Error al obtener el producto" });
  }
});


routes.post("/", async (req, res) => {
  const nuevoProducto = req.body;
  try {
    const productoCreado = await productModel.create(nuevoProducto);
    res.status(201).json({
      message: "Producto creado con éxito!",
      producto: productoCreado,
    });
  } catch (error) {
    res.status(500).json({ message: "Error al crear el producto" });
  }
});

routes.put("/:id", async (req, res) => {
  const id = req.params.id;
  const datosActualizados = req.body;
  try {
    const productoActualizado = await productModel.findByIdAndUpdate(
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
  } catch (error) {
    res.status(500).json({ message: "Error al actualizar el producto" });
  }
});


routes.delete("/:id", async (req, res) => {
  const id = req.params.id;
  try {
    const productoEliminado = await productModel.findByIdAndDelete(id);
    if (productoEliminado) {
      res.status(200).json({
        message: `Producto ${productoEliminado.name} eliminado con éxito!`,
      });
    } else {
      res.status(404).json({ message: "Producto no encontrado" });
    }
  } catch (error) {
    res.status(500).json({ message: "Error al eliminar el producto" });
  }
});


module.exports = routes;
