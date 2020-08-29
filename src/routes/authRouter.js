const { Router } = require("express");
const { makeCall } = require("../helpers");
const { jwtMiddleware } = require("../middleware/jwt");
const auth = require("../controllers/authController");

const authRouter = Router();

authRouter.post("/register", (req, res) => makeCall(req, res, auth.register));
authRouter.post("/login", (req, res) => makeCall(req, res, auth.logIn));
authRouter.post("/logout/:authorization", jwtMiddleware, (req, res) =>
  makeCall(req, res, auth.logOut)
);

module.exports = authRouter;
