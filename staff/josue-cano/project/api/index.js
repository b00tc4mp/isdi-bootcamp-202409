import express from "express";
import "dotenv/config";
import db from "dat";
import busboy from "busboy";
import logic from "./logic/index.js";
import utils from "./utils/index.js";
import helpers from "./helpers/index.js";
import cors from "cors";

console.warn({ url: process.env.MONGO_URL });
db.connect(process.env.MONGO_URL)
  .then(() => {
    console.log("connected to db", { db, url: process.env.MONGO_URL });

    //   const jsonBodyParser = json()
    const server = express();
    //convierte el req.body en json
    server.use(express.json());

    server.use(cors());

    server.get("/", (req, res) => {
      console.log(req);
      res.send("Hello, API!");
    });

    server.post("/login", (req, res) => {
      const user = req.body;
      logic
        .authenticateUser(user)
        .then((token) => res.json({ data: token }))
        .catch((msg) => res.status(400).json({ error: msg.message }));
    });

    //validatessesion
    server.get("/validate-session", (req, res) => {
      const token = req.headers.authorization.slice(7);
      res.json({ data: { status: utils.validateToken(token) } });
      // .then((status) => res.json(status))
    });

    //register
    server.post("/register", (req, res) => {
      const user = req.body;
      logic
        .registerUser(user)
        .then((created) => res.json({ data: created }))
        .catch((msg) => res.status(400).json({ error: msg }));

      // console.log(user);
    });
    /**
     * obtener listadoo de todos los productos
     */
    server.get("/products", (req, res) =>
      res.json({ mensaje: "ruta get:products" })
    );
    /**
     * obtener detalles dle producto
     */
    server.get("/products/:id", (req, res) =>
      res.json({ mensaje: "ruta get:product/" + req.params.id })
    );

    /**
     * crear producto
     */
    server.post("/products", helpers.authorizationHandler, (req, res) => {
      const producto = { author: req.userId };
      const bb = busboy({ headers: req.headers });
      //on es un evento, al conseguir un archivo lo guarda en el sitema operativo
      bb.on("file", (name, file, info) =>
        logic.saveFile(file, info.filename, (error) => {
          if (error) {
            res
              .status(500)
              .json({ error: "SystemError", message: error.message });

            return;
          }
          res.status(201).send("file uploaded");
        })
      );
      //cada que encuentre un campo del formulario que no se aun archivo
      bb.on("field", (fieldname, value) => {
        producto[fieldname] = value;
      });
      // bb.on('error', error => res.status(500).json({ error: 'SystemError', message: error.message }))
      logic.createProducto();
      req.pipe(bb);
    });
    /**
     * obtener todas las categorias
     */
    server.get("/categorias", (req, res) => {
      logic
        .getCategorias()
        .then((categorias) => res.json({ data: categorias }));
    });
    /**
     * obtener todas las subcategorias
     */
    server.get("/subcategorias", (req, res) => {
      logic
        .getSubCategorias()
        .then((subcategorias) => res.json({ data: subcategorias }));
    });

    server.listen(process.env.PORT, () =>
      console.log(`API listening on port ${process.env.PORT}`)
    );
  })
  .catch((error) => {
    console.error(error);
  });
