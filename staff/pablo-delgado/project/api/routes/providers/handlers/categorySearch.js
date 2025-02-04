import express from "express";
import { Provider } from "../../../../dat/models.js"

const app = express();

app.get("/providers/search", async (req, res) => {
  const { name, category, postalCode } = req.query;  // Recibe los parámetros de búsqueda

  try {
      let filtro = {}; 

      if (name) {
          filtro.name = { $regex: name, $options: "i" };  // Búsqueda insensible a mayúsculas/minúsculas
      }

      if (category) {
          filtro.categories = category;
      }

      if (postalCode) {
          filtro.postalCode = postalCode;
      }

      // Realiza la búsqueda en la base de datos
      const providers = await Provider.find(filtro).populate("categories");

      if (!providers || providers.length === 0) {
          return res.status(404).json({ message: "No se encontraron proveedores" });
      }

      res.json(providers);  // Responde con los proveedores encontrados
  } catch (error) {
      console.error("Error al buscar proveedores:", error);
      res.status(500).json({ message: "Error al buscar proveedores" });
  }
});

export default app;
