import { Router } from "express";
import AuthController from "../controllers/auth.controller.js";
import { validate } from "../middlewares/validate.js";
import { registerSchema, loginSchema } from "../validations/auth.schema.js";

export default class AuthRoute {
  constructor() {
    this.controller = new AuthController();
    this.router = Router();
    this.initializeRoutes();
  }

  initializeRoutes() {
    this.router.post("/register", validate(registerSchema), (req, res) => this.controller.register(req, res));
    this.router.post("/login", validate(loginSchema), (req, res) => this.controller.login(req, res));
  }

  getRouter() {
    return this.router;
  }
}
