import db from "dat";
import express, { json } from "express";
import logic from "./logic/index.js";
import cors from "cors";

db.connect("mongodb://127.0.0.1:27017/unsocial-test").then(() => {
  console.log("connected to db");

  const server = express();

  server.use(cors());

  const jsonBodyParser = json();

  server.get("/", (_, res) => res.send("Hello, API!"));

  server.post("/authenticate", jsonBodyParser, (req, res) => {
    try {
      const { username, password } = req.body;

      logic
        .authenticateUser(username, password)
        .then((userId) => res.json(userId))
        .catch((error) => {
          res
            .status(401)
            .json({ error: error.constructor.name, message: error.message });

          console.error(error);
        });
    } catch (error) {
      res
        .status(401)
        .json({ error: error.constructor.name, message: error.message });

      console.error(error);
    }
  });

  server.post("/register", jsonBodyParser, (req, res) => {
    try {
      const {
        name,
        email,
        username,
        password,
        "password-repeat": passwordRepeat,
      } = req.body;

      logic
        .registerUser(name, email, username, password, passwordRepeat)
        .then(() => res.status(201).send())
        .catch((error) => {
          res
            .status(400)
            .json({ error: error.constructor.name, message: error.message });

          console.error(error);
        });
    } catch (error) {
      res
        .status(400)
        .json({ error: error.constructor.name, message: error.message });

      console.error(error);
    }
  });

  server.get("/users/:targetUserId/name", (req, res) => {
    try {
      const userId = req.headers.authorization.slice(6);

      const { targetUserId } = req.params;

      const name = logic
        .getUserName(userId, targetUserId)
        .then((name) => res.json(name))
        .catch((error) => {
          res
            .status(400)
            .json({ error: error.constructor.name, message: error.message });

          console.error(error);
        });
    } catch (error) {
      res
        .status(400)
        .json({ error: error.constructor.name, message: error.message });

      console.error(error);
    }
  });

  server.post("/posts", jsonBodyParser, (req, res) => {
    try {
      const userId = req.headers.authorization.slice(6); // 'Basic jiogfdgfdfew

      const { image, text } = req.body;

      logic
        .createPost(userId, image, text)
        .then(() => res.status(201).send())
        .catch((error) => {
          res
            .status(400)
            .json({ error: error.constructor.name, message: error.message });

          console.error(error);
        });
    } catch (error) {
      res
        .status(400)
        .json({ error: error.constructor.name, message: error.message });

      console.error(error);
    }
  });

  server.get("/posts", (req, res) => {
    try {
      const userId = req.headers.authorization.slice(6);

      logic
        .getPosts(userId)
        .then((posts) => res.json(posts))
        .catch((error) => {
          res
            .status(400)
            .json({ error: error.constructor.name, message: error.message });

          console.error(error);
        });
    } catch (error) {
      res
        .status(400)
        .json({ error: error.constructor.name, message: error.message });

      console.error(error);
    }
  });

  server.delete("/posts/:postId", (req, res) => {
    try {
      const { postId } = req.params;
      const userId = req.headers.authorization.slice(6);
      logic
        .deletePost(userId, postId)
        .then(() => res.status(204).send())
        .catch((error) =>
          res
            .status(404)
            .json({ error: error.constructor.name, message: error.message })
        );

      console.error(error);
    } catch (error) {
      res
        .status(404)
        .json({ error: error.constructor.name, message: error.message });

      console.error(error);
    }
  });

  server.patch("/posts/:postId/likes", (req, res) => {
    try {
      const userId = req.headers.authorization.slice(6);
      const { postId } = req.params;

      logic
        .toggleLikePost(userId, postId)
        .then(() => res.status(204).send())
        .catch((error) => {
          res
            .status(400)
            .json({ error: error.constructor.name, message: error.message });

          console.error(error);
        });
    } catch (error) {
      res
        .status(400)
        .json({ error: error.constructor.name, message: error.message });

      console.error(error);
    }
  });

  server.post("/posts/:postId/comments", jsonBodyParser, (req, res) => {
    try {
      const userId = req.headers.authorization.slice(6);
      const { text } = req.body;

      const { postId } = req.params;
      logic
        .addComment(userId, postId, text)
        .then(() => res.status(201).send())
        .catch((error) => {
          res
            .status(400)
            .json({ error: error.constructor.name, message: error.message });

          console.error(error);
        });
    } catch (error) {
      res
        .status(400)
        .json({ error: error.constructor.name, message: error.message });

      console.error(error);
    }
  });

  server.get("/posts/:postId/comments", (req, res) => {
    try {
      const userId = req.headers.authorization.slice(6);
      const { postId } = req.params;

      logic
        .getComments(userId, postId)
        .then((comments) => res.json(comments))
        .catch((error) => {
          res
            .status(400)
            .json({ error: error.constructor.name, message: error.message });

          console.error(error);
        });
    } catch (error) {
      res
        .status(400)
        .json({ error: error.constructor.name, message: error.message });

      console.error(error);
    }
  });

  server.delete("/posts/:postId/comments/:commentId", (req, res) => {
    try {
      const userId = req.headers.authorization.slice(6);

      const { postId, commentId } = req.params;

      logic
        .removeComment(userId, postId, commentId)
        .then(() => res.status(204).send())
        .catch((error) => {
          res
            .status(404)
            .json({ error: error.constructor.name, message: error.message });

          console.error(error);
        });
    } catch (error) {
      res
        .status(404)
        .json({ error: error.constructor.name, message: error.message });

      console.error(error);
    }
  });

  server.listen(8080, () => console.log("api is up"));
});
