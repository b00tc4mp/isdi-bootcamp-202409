import { Router } from "express";
import busboy from "busboy";
import logic from "../index.js";
import utils from "../../utils/index.js";
import helpers from "../../helpers/index.js";

const router = Router();

/**
 * obtener listado de todos los productos (usuario autenticado)
 */
router.get("/products", helpers.authorizationHandler, (req, res) => {
  const userId = req.userId;
  const keyword = req.query.keyword || '';
  logic
    .getProducts({ userId, keyword })
    .then((getProducts) => res.json({ data: getProducts }));
});

/**
 * obtener listado de todos los productos (usuario no autenticado)
 */
router.get("/public/products", (req, res) => {
  const keyword = req.query.keyword || '';
  logic.getProducts({ keyword })
    .then((getProducts) => res.json({ data: getProducts }));
});

/**
 * obtener detalles del producto
 */
router.get("/public/products/:id", (req, res) => {
  const { id } = req.params;
  console.trace(id);
  console.log('here');
  logic
    .getProductDetails(id)
    .then((producto) => res.json({ data: producto }))
    .catch((msg) => res.status(400).json({ error: msg.message }));
});

/**
 * obtener detalles del producto
 */
router.get("/products/:id", helpers.authorizationHandler, (req, res) => {
  const userId = req.userId;
  logic
    .getProductDetails(req.params.id, userId)
    .then((producto) => res.json({ data: producto }))
    .catch((msg) => res.status(400).json({ error: msg.message }));
});

/**
 * crear producto
 */
router.post("/products", helpers.authorizationHandler, (req, res) => {
  // producto nuevo
  const producto = { author: req.userId };
  // imágenes del producto
  const imagenes = [];
  const bb = busboy({ headers: req.headers });

  //on es un evento, al conseguir un archivo lo guarda en el sitema operativo
  bb.on("file", (name, file, info) => {
    utils.saveFile(file, info.filename, (error) => {
      if (error) {
        res.status(500).json({ error: "SystemError", message: error.message });
        return;
      }
      // agregar la imagen luego de guardarla
      // res.status(201).send("file uploaded");
    });
    imagenes.push(info.filename);
  });
  //cada que encuentre un campo del formulario que no se aun archivo
  bb.on("field", (fieldname, value) => {
    console.log("guardando campo:", { fieldname, value });
    producto[fieldname] = value;
  });

  bb.on("error", (error) =>
    res.status(500).json({ error: "SystemError", message: error.message })
  );
  // aquí es donde se va a procesar el formulario cando busboy termine
  // de guardar las imágenes
  bb.on("finish", () => {
    // insertar los nombres de las imágenes dentro del producto
    producto["images"] = imagenes;
    logic
      .createProduct(producto)
      .then((success) => res.json({ data: success }))
      .catch((err) => {
        console.error(err);
        res.status(400).json({ error: err.message });
      });
  });

  req.pipe(bb);
});

/**
 * Eliminar producto
 */
router.delete("/products/:id", helpers.authorizationHandler, (req, res) => {
  const userId = req.userId;

  logic
    .deleteProduct({ userId, productId: req.params.id })
    .then((result) => res.json({ data: result }))
    .catch((error) => res.json({ error: error.message }));
});

export default router;
