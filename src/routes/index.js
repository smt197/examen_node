import "dotenv/config";
import express from "express";
import { verifyToken } from "../middlewares/auth.middleware.js";


export default class Routes {
  constructor(app) {
    this.app = app;
    this.uri = process.env.URI;
    this.initializeRoutes();
  }

  async initializeRoutes() {
    const { default: ProduitRoute } = await import("./produit.routes.js");
    const { default: FournisseurRoute } = await import("./fournisseur.routes.js");
    const { default: ApprovisionnementRoute } = await import("./approvisionnement.routes.js");
    const { default: AuthRoute } = await import("./auth.routes.js");

    const produitRoute = new ProduitRoute();
    const fournisseurRoute = new FournisseurRoute();
    const approvisionnementRoute = new ApprovisionnementRoute();
    const authRoute = new AuthRoute();

    // Routes publiques
    this.app.use(`${this.uri}/auth`, authRoute.getRouter());

    // Routes protégées
    this.app.use(`${this.uri}/produits`, verifyToken, produitRoute.getRouter());
    this.app.use(`${this.uri}/fournisseurs`, verifyToken, fournisseurRoute.getRouter());
    this.app.use(`${this.uri}/approvisionnements`, verifyToken, approvisionnementRoute.getRouter());
  }
}