// External Module
const express = require("express");
const authRouter = express.Router();

// Local Module
const authControllers = require("../Controllers/authControllers");

authRouter.get("/login", authControllers.getLogin);
authRouter.post("/login", authControllers.postLogin);
authRouter.post("/logout", authControllers.postLogout);

module.exports = authRouter;