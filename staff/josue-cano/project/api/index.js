import express from "express";
import "dotenv/config";
import db from "dat";
import logic from "./logic/index.js";
import utils from "./utils/index.js";
import cors from "cors";

db.connect(process.env.MONGO_URL).then(() => {
  console.log("connected to db");

  //   const jsonBodyParser = json()
  const server = express();
  //convierte el req.body en json
  server.use(express.json());

  server.use(cors());

  server.get("/", (req, res) => res.send("Hello, API!"));

  server.post("/login", (req, res) => {
    const user = req.body;
    logic
      .authenticateUser(user)
      .then((token) => res.json(token))
      .catch((msg) => res.status(400).send(msg.message));
  });

  //validatessesion
  server.get("/validate-session", (req, res) => {
    const token = req.headers.authorization.slice(7);
    res.json({ status: utils.validateToken(token) });
    // .then((status) => res.json(status))
  });

  //register
  server.post("/register", (req, res) => {
    const user = req.body;
    logic
      .registerUser(user)
      .then((created) => res.json({ created }))
      .catch((msg) => res.status(400).send(msg));

    console.log(user);
  });

  server.get("/products", (req, res) =>
    res.json({ mensaje: "ruta get:products" })
  );
  server.get("/products/:id", (req, res) =>
    res.json({ mensaje: "ruta get:product/" + req.params.id })
  );

  server.get("/categorias", (req, res) => {
    logic.getCategorias().then((categorias) => res.json({ data: categorias }));
  });

  server.listen(process.env.PORT, () =>
    console.log(`API listening on port ${process.env.PORT}`)
  );
});
