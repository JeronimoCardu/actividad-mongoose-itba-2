const express = require("express");
const productModel = require("../models/productModel");
const routes = express.Router();

routes.get("/", async (req, res) => {
  try {
    // Return only products that are available (logical deletion)
    const productos = await productModel
      .find({ isAvailable: true, isDeleted: false })
      .populate("category");
    res.status(200).json(productos);
  } catch (error) {
    res.status(500).json({ message: "Error al obtener productos" });
  }
});

routes.get("/:id",  async (req, res) => {
  const id = req.params.id;
  try {
    // Only return the product if it is available (logical deletion)
    const producto = await productModel
      .findOne({ _id: id, isAvailable: true, isDeleted: false })
      .populate("category");
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

routes.delete("/", async (req, res) => {
  try {
    await productModel.deleteMany({ isDeleted: true });
    res.status(200).json({ message: "Productos eliminados con éxito!" });
  } catch (error) {
    res.status(500).json({ message: "Error al eliminar productos" });
  }
});

routes.delete("/:id", async (req, res) => {
  const id = req.params.id;
  try {
    const productoActualizado = await productModel.findByIdAndUpdate(
      id,
      { isAvailable: false, isDeleted: true },
      { new: true }
    );
    if (productoActualizado) {
      res.status(200).json({
        message: `Producto ${productoActualizado.name} marcado como no disponible.`,
        producto: productoActualizado,
      });
    } else {
      res.status(404).json({ message: "Producto no encontrado" });
    }
  } catch (error) {
    res.status(500).json({ message: "Error al eliminar el producto" });
  }
});


module.exports = routes;
