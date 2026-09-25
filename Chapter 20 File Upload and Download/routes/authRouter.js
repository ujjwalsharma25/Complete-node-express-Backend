// External Module
const express = require("express");
const authRouter = express.Router();

// Local Module
const authControllers = require("../Controllers/authControllers"); 
// Dhyaan rahe: folder ka naam capital C hai

// Routes
authRouter.get("/login", authControllers.getLogin);
authRouter.post("/login", authControllers.postLogin);
authRouter.post("/logout", authControllers.postLogout);
authRouter.get("/signup", authControllers.getSignup);
authRouter.post("/signup", authControllers.postSignup);

module.exports = authRouter;
