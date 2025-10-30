const express = require("express");
const app = express();
const connectDB = require("./db");
const port = 3000;
const productosRouter = require("./routes/productosRouter");
const categoriasRouter = require("./routes/categoriasRouter");
const authGuard  = require('./middlewares/auth-guard')

app.use(express.json());


// Conectamos a la base de datos
connectDB();

// endpoints

app.use("/api/productos", productosRouter);
app.use("/api/categorias", categoriasRouter);

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});
