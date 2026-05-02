import { Router } from "express";
import FournisseurController from "../controllers/fournisseur.controller.js";
import { validate } from "../middlewares/validate.js";
import { createFournisseurSchema, updateFournisseurSchema } from "../validations/fournisseur.schema.js";

export default class FournisseurRoute {
  constructor() {
    this.controller = new FournisseurController();
    this.router = Router();
    this.initializeRoutes();
  }

  initializeRoutes() {
    this.router.post("/", validate(createFournisseurSchema), (req, res) => this.controller.store(req, res));
    this.router.get("/", (req, res) => this.controller.index(req, res));
    this.router.get("/:id", (req, res) => this.controller.show(req, res));
    this.router.put("/:id", validate(updateFournisseurSchema), (req, res) => this.controller.update(req, res));
    this.router.delete("/:id", (req, res) => this.controller.destroy(req, res));
  }

  getRouter() {
    return this.router;
  }
}
