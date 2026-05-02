import ApprovisionnementService from "../services/approvisionnement.service.js";

export default class ApprovisionnementController {
  constructor() {
    this.service = new ApprovisionnementService();
  }

  async index(req, res) {
    try {
      const appros = await this.service.getAll();
      res.status(200).json(appros);
    } catch (error) {
      res.status(error.statusCode || 500).json({ message: error.message || "Erreur serveur" });
    }
  }

  async show(req, res) {
    try {
      const appro = await this.service.getById(req.params.id);
      res.status(200).json(appro);
    } catch (error) {
      res.status(error.statusCode || 500).json({ message: error.message || "Erreur serveur" });
    }
  }

  async store(req, res) {
    try {
      const newAppro = await this.service.create(req.body);
      res.status(201).json(newAppro);
    } catch (error) {
      res.status(error.statusCode || 500).json({ message: error.message || "Erreur serveur" });
    }
  }

  async update(req, res) {
    try {
      const updatedAppro = await this.service.update(req.params.id, req.body);
      res.status(200).json(updatedAppro);
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
