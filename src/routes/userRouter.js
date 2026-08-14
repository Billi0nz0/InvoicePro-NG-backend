const express = require("express");
const { signUp } = require("../controllers/auth/signUp");
const { regLimiter  } = require("../services/rateLimit");

const route = express.Router();

route.post("/sign-up", regLimiter, signUp);

module.exports = route;