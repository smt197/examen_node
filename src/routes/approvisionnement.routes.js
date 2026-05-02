import { Router } from "express";
import ApprovisionnementController from "../controllers/approvisionnement.controller.js";
import { validate } from "../middlewares/validate.js";
import { createApprovisionnementSchema, updateApprovisionnementSchema } from "../validations/approvisionnement.schema.js";

export default class ApprovisionnementRoute {
  constructor() {
    this.controller = new ApprovisionnementController();
    this.router = Router();
    this.initializeRoutes();
  }

  initializeRoutes() {
    this.router.post("/", validate(createApprovisionnementSchema), (req, res) => this.controller.store(req, res));
    this.router.get("/", (req, res) => this.controller.index(req, res));
    this.router.get("/:id", (req, res) => this.controller.show(req, res));
    this.router.put("/:id", validate(updateApprovisionnementSchema), (req, res) => this.controller.update(req, res));
    this.router.delete("/:id", (req, res) => this.controller.destroy(req, res));
  }

  getRouter() {
    return this.router;
  }
}
