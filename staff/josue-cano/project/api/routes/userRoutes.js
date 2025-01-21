import { Router } from "express";
import logic from "../logic/index.js";
import helpers from "../helpers/index.js";

const router = Router();

// GET /users/details/:id?
router.get("/details/:id?", helpers.authorizationHandler, (req, res) => {
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
 */
router.get("/products", helpers.authorizationHandler, (req, res) => {
  const userId = req.userId;

  logic
    .getUserProducts(userId)
    .then((user) => res.json({ data: user }))
    .catch((msg) => res.status(400).json({ error: msg.message }));
});

/**
 * Get All comments made by the user
 */
router.get("/chat/:chatId", helpers.authorizationHandler, (req, res) => {
  const userId = req.userId;
  const { chatId } = req.params;

  logic
    .getUserChat(chatId)
    .then((chats) => res.json({ data: chats }))
    .catch((msg) => res.status(400).json({ error: msg.message }));
});

/**
 * Get All chats
 */
router.post("/chats/", helpers.authorizationHandler, async (req, res) => {
  const userId = req.userId;
  const { productOwner } = req.body;

  try {
    const chats = await logic.getUserChats({ userId, productOwner });
    res.json({ data: chats });
  } catch (msg) {
    res.status(400).json({ error: msg.message });
  }
});

/**
 * Start a new chat
 */
router.post("/chat/", helpers.authorizationHandler, (req, res) => {
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
 */
router.post("/chat/message", helpers.authorizationHandler, (req, res) => {
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

// GET /favorites
router.get("/favorites", helpers.authorizationHandler, (req, res) => {
  const id = req.userId;

  logic
    .getUserFavorites({ id })
    .then((products) => res.json({ data: products }))
    .catch((msg) => res.status(400).json({ error: msg.message }));
});

// PATCH /favorites
router.patch("/favorites", helpers.authorizationHandler, (req, res) => {
  const { favorite } = req.body;
  const id = req.userId;

  logic
    .setUserFavorites({ id, favorite })
    .then((product) => res.json({ data: product }))
    .catch((msg) => res.status(400).json({ error: msg.message }));
});

export default router;
