const express = require("express");
const app = express();
const connectDB = require("./db");
const port = 3000;

// Conectamos a la base de datos 
connectDB();

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});
