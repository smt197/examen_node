import ProduitService from "../services/produit.service.js";

export default class ProduitController {
  constructor() {
    this.service = new ProduitService();
  }

  async index(req, res) {
    try {
      const produits = await this.service.getAll();
      res.status(200).json(produits);
    } catch (error) {
      res.status(error.statusCode || 500).json({ message: error.message || "Erreur serveur" });
    }
  }

  async show(req, res) {
    try {
      const produit = await this.service.getById(req.params.id);
      res.status(200).json(produit);
    } catch (error) {
      res.status(error.statusCode || 500).json({ message: error.message || "Erreur serveur" });
    }
  }

  async store(req, res) {
    try {
      const newProduit = await this.service.create(req.body, req.file);
      res.status(201).json(newProduit);
    } catch (error) {
      res.status(error.statusCode || 500).json({ message: error.message || "Erreur serveur" });
    }
  }

  async update(req, res) {
    try {
      const updatedProduit = await this.service.update(req.params.id, req.body, req.file);
      res.status(200).json(updatedProduit);
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

  async incrementStock(req, res) {
      try {
          const { id } = req.params;
          const { quantite } = req.body;
          if(!quantite || parseInt(quantite) <= 0) {
              return res.status(400).json({ message: "Quantité invalide" });
          }
          const updated = await this.service.incrementStock(id, quantite);
          res.status(200).json(updated);
      } catch (error) {
          res.status(error.statusCode || 500).json({ message: error.message || "Erreur serveur" });
      }
  }

  async decrementStock(req, res) {
      try {
          const { id } = req.params;
          const { quantite } = req.body;
          if(!quantite || parseInt(quantite) <= 0) {
              return res.status(400).json({ message: "Quantité invalide" });
          }
          const updated = await this.service.decrementStock(id, quantite);
          res.status(200).json(updated);
      } catch (error) {
          res.status(error.statusCode || 500).json({ message: error.message || "Erreur serveur" });
      }
  }
}
