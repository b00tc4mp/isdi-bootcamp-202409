import express from "express";
import "dotenv/config";
import db from "dat";
import cors from "cors";
import errorHandler from "./helpers/errorHandler.js";

// Rutas
import routes from "./routes/index.js";

const { authRoutes, userRoutes, productRoutes, baseRoutes } = routes;

console.warn({ url: process.env.MONGO_URL });

// Conexión a la base de datos
db.connect(process.env.MONGO_URL)
  .then(() => {
    console.log("connected to db", { db, url: process.env.MONGO_URL });
  })
  .catch((error) => {});

const server = express();

// Middleware parsear JSON
server.use(express.json());

//  CORS
server.use(cors());

// archivos estáticos
server.use("/public", express.static("files"));

// Ruta principal (prueba)
server.get("/", (_req, res) => {
  res.send("Hello, API!");
});

server.use("/auth", authRoutes);
server.use("/users", userRoutes);
server.use("/products", productRoutes);
server.use("/datbase", baseRoutes);

server.use(errorHandler);

// Iniciar el servidor
server.listen(process.env.PORT, () => console.log(`API listening on port ${process.env.PORT}`));
