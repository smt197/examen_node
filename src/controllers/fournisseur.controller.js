import FournisseurService from "../services/fournisseur.service.js";

export default class FournisseurController {
  constructor() {
    this.service = new FournisseurService();
  }

  async index(req, res) {
    try {
      const fournisseurs = await this.service.getAll();
      res.status(200).json(fournisseurs);
    } catch (error) {
      res.status(error.statusCode || 500).json({ message: error.message || "Erreur serveur" });
    }
  }

  async show(req, res) {
    try {
      const fournisseur = await this.service.getById(req.params.id);
      res.status(200).json(fournisseur);
    } catch (error) {
      res.status(error.statusCode || 500).json({ message: error.message || "Erreur serveur" });
    }
  }

  async store(req, res) {
    try {
      const newFournisseur = await this.service.create(req.body);
      res.status(201).json(newFournisseur);
    } catch (error) {
      res.status(error.statusCode || 500).json({ message: error.message || "Erreur serveur" });
    }
  }

  async update(req, res) {
    try {
      const updatedFournisseur = await this.service.update(req.params.id, req.body);
      res.status(200).json(updatedFournisseur);
    } catch (error) {
      res.status(error.statusCode || 500).json({ message: error.message || "Erreur serveur" });
    }
  }

  async destroy(req, res) {
    try {
      await this.service.delete(req.params.id);
      res.status(204).send();
    } catch (error) {
      res.status(error.statusCode || 500).json({ message: error.message || "Erreur serveur" });
    }
  }
}
