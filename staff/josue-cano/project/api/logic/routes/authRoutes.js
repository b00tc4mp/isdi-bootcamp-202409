import { Router } from "express";
import logic from "../index.js";
import utils from "../../utils/index.js";

const router = Router();

// POST /login
//todo:CAMBIAR LOGIN POR AUTH
router.post("/", (req, res) => {
  const user = req.body;
  logic
    .authenticateUser(user)
    .then((token) => res.json({ data: token }))
    .catch((msg) => res.status(400).json({ error: msg.message }));
});

// POST /register
router.post("/register", (req, res) => {
  const user = req.body;
  logic
    .registerUser(user)
    .then((created) => res.json({ data: created }))
    .catch((msg) => res.status(400).json({ error: msg }));
});

// GET /validate-session
router.get("/validate-session", (req, res) => {
  const token = req.headers.authorization.slice(7);
  res.json({ data: { status: utils.validateToken(token) } });
});

export default router;
