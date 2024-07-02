// index.js
const express = require("express");
const app = express();

app.use(express.json()); // para poder leer json en el body

app.get("/", (req, res) => {
  res.send("Backend inicial Wimbledon!");
});

const port = 3000;
app.listen(port, () => {
  console.log(`sitio escuchando en el puerto ${port}`);
});
