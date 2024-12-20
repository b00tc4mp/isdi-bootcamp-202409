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

    server.use("/public", express.static("files"));

    server.get("/", (req, res) => {
      // console.log(req);
      res.send("Hello, API!");
    });

    server.post("/login", (req, res) => {
      const user = req.body;
      logic
        .authenticateUser(user)
        .then((token) => res.json({ data: token }))
        .catch((msg) => res.status(400).json({ error: msg.message }));
    });

    server.get("/users/details/:id?", helpers.authorizationHandler, (req, res) => {
      let userId;
      if (req.params.id) {
        userId = req.params.id;
      } else {
        userId = req.userId;
      }

      logic
        .getUserDetails(userId)
        .then((user) => res.json({ data: user }))
        .catch((msg) => res.status(400).json({ error: msg.message }));
    });

    /**
     * Get All products created by the user
     * */
    server.get("/user/products", helpers.authorizationHandler, (req, res) => {
      const userId = req.userId;

      logic
        .getUserProducts(userId)
        .then((user) => res.json({ data: user }))
        .catch((msg) => res.status(400).json({ error: msg.message }));
    });

    /**
     * Get All comments made by the user
     * */
    server.get("/user/chat/:chatId", helpers.authorizationHandler, (req, res) => {
      const userId = req.userId;

      const { chatId } = req.params;

      logic
        .getUserChat(chatId)
        .then((chats) => res.json({ data: chats }))
        .catch((msg) => res.status(400).json({ error: msg.message }));
    });
    /**
     * Get All chats
     * */
    server.post("/user/chats/", helpers.authorizationHandler, (req, res) => {
      const userId = req.userId;

      const { productOwner } = req.body;

      logic
        .getUserChats({ userId, productOwner })
        .then((chats) => res.json({ data: chats }))
        .catch((msg) => res.status(400).json({ error: msg.message }));
    });
    /**
     * Start a new chat
     * */
    server.post("/user/chat/", helpers.authorizationHandler, (req, res) => {
      const userId = req.userId;

      const { message, productOwner } = req.body;

      const payload = {
        userId,
        message,
        productOwner,
      };

      logic
        .createChat(payload)
        .then((chat) => res.json({ data: chat }))
        .catch((msg) => res.status(400).json({ error: msg.message }));
    });

    /**
     * Insert a new message in a chat
     * */
    server.post("/user/chat/message", helpers.authorizationHandler, (req, res) => {
      const userId = req.userId;

      const { message, chatId } = req.body;

      const payload = {
        userId,
        message,
        chatId,
      };

      logic
        .addChatMessage(payload)
        .then((chat) => res.json({ data: chat }))
        .catch((msg) => res.status(400).json({ error: msg.message }));
    });

    /**
     * Post a new comment on a product
     * */
    // server.post("/user/comments/", helpers.authorizationHandler, (req, res) => {
    //   const userId = req.params.id;

    //   const {productId, message, productOwner} = req.body;

    //   const payload = {
    //     userId,
    //     productId,
    //     message,
    //     productOwner
    //   }

    //   logic
    //     .addUserComment()
    //     .then((user) => res.json({ data: user }))
    //     .catch((msg) => res.status(400).json({ error: msg.message }));
    // });

    //validatessesion
    server.get("/validate-session", (req, res) => {
      const token = req.headers.authorization.slice(7);
      res.json({ data: { status: utils.validateToken(token) } });
      // .then((status) => res.json(status))
    });

    // get favorite products
    server.get("/favorites", helpers.authorizationHandler, (req, res) => {
      const id = req.userId;

      logic
        .getUserFavorites({ id })
        .then((products) => res.json({ data: products }))
        .catch((msg) => res.status(400).json({ error: msg.message }));
    });

    // set favorite products
    server.patch("/favorites", helpers.authorizationHandler, (req, res) => {
      const { favorite } = req.body;
      const id = req.userId;

      logic
        .setUserFavorites({ id, favorite })
        .then((token) => res.json({ data: token }))
        .catch((msg) => res.status(400).json({ error: msg.message }));
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
     * obtener listado de todos los productos (usuario autenticado)
     */
    server.get("/products", helpers.authorizationHandler, (req, res) => {
      const userId = req.userId;
      logic.getProducts(userId).then((getProducts) => res.json({ data: getProducts }));
    });

    /**
     * obtener listado de todos los productos (usuario no autenticado)
     */
    server.get("/public/products", (_, res) => {
      logic.getProducts().then((getProducts) => res.json({ data: getProducts }));
    });

    /**
     * obtener detalles del producto
     */
    server.get("/public/products/:id", (req, res) =>
      logic.getProductDetails(req.params.id).then((producto) => res.json({ data: producto }))
    );
    /**
     * obtener detalles del producto
     */
    server.get("/products/:id", helpers.authorizationHandler, (req, res) => {
      const userId = req.userId;
      logic.getProductDetails(req.params.id, userId).then((producto) => res.json({ data: producto }));
    });

    /**
     * crear producto
     */
    server.post("/products", helpers.authorizationHandler, (req, res) => {
      // producto nuevo
      const producto = { author: req.userId };
      // imágenes del producto
      const imagenes = [];
      const bb = busboy({ headers: req.headers });

      // console.log({'headers': req.headers, userId: req.userId});

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

      bb.on("error", (error) => res.status(500).json({ error: "SystemError", message: error.message }));
      // aquí es donde se va a procesar el formulario cando busboy termine
      // de guardar las imágenes
      bb.on("finish", () => {
        // insertar los nombres de las imágenes dentro del producto
        producto["images"] = imagenes;
        logic
          .createProducto(producto)
          .then((success) => res.json({ data: success }))
          .catch((err) => console.error(err));
      });

      req.pipe(bb);
    });

    /**
     * Eliminar producto
     */
    server.delete("/products/:id", helpers.authorizationHandler, (req, res) => {
      const userId = req.userId;

      logic
        .deleteProduct({ userId, productId: req.params.id })
        .then((result) => res.json({ data: result }))
        .catch((error) => res.json({ error: error.message }));
    });

    /**
     * Obtener las localidades
     *
     * */
    server.get("/locations", (_, res) => {
      logic.getLocations().then((locations) => res.json({ data: locations }));
    });
    /**
     * obtener todas las categorias
     */
    server.get("/categorias", (_, res) => {
      logic.getCategorias().then((categorias) => res.json({ data: categorias }));
    });
    /**
     * obtener todas las subcategorias
     */
    server.get("/subcategorias", (_, res) => {
      logic.getSubCategorias().then((subcategorias) => res.json({ data: subcategorias }));
    });

    server.listen(process.env.PORT, () => console.log(`API listening on port ${process.env.PORT}`));
  })
  .catch((error) => {
    console.error(error);
  });
