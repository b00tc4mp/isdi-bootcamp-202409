import express from "express";
import "dotenv/config";
import db from "dat";
import cors from "cors";
import errorHandler from "./helpers/errorHandler.js";

// Rutas
import routes from "./logic/routes/index.js";

const {
  authRoutes,
  userRoutes,
  productRoutes,
  baseRoutes
} = routes;

console.warn({ url: process.env.MONGO_URL });

// Conexión a la base de datos
db.connect(process.env.MONGO_URL)
  .then(() => {
    console.log("connected to db", { db, url: process.env.MONGO_URL });
  })
  .catch((error) => {
    console.error(error);
  });

// Inicialización de Express
const server = express();

// Middleware para parsear JSON
server.use(express.json());

// Habilitar CORS
server.use(cors());

// Middleware global para manejo de errores
server.use(errorHandler);

// Servir archivos estáticos
server.use("/public", express.static("files"));

// Ruta principal (pública)
server.get("/", (_req, res) => {
  res.send("Hello, API!");
});

/**
 * Usar las rutas segmentadas
 * (Al usar server.use("/", XRoutes), conservamos las rutas tal cual están definidas)
 */
server.use("/", authRoutes);
server.use("/", userRoutes);
server.use("/", productRoutes);
server.use("/", baseRoutes);

// Iniciar el servidor
server.listen(process.env.PORT, () =>
  console.log(`API listening on port ${process.env.PORT}`)
);
