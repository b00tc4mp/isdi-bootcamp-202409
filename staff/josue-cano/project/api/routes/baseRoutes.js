import { Router } from "express";
import logic from "../logic/index.js";

const router = Router();

/**
 * Obtener las localidades
 */
router.get("/locations", (_, res) => {
  logic.getLocations().then((locations) => res.json({ data: locations }));
});

/**
 * obtener todas las categorias
 */
router.get("/categories", (_, res) => {
  logic.getCategories().then((categories) => res.json({ data: categories }));
});

/**
 * obtener todas las subcategorias
 */
router.get("/subcategories", (_, res) => {
  logic
    .getSubCategories()
    .then((subcategories) => res.json({ data: subcategories }));
});

export default router;
