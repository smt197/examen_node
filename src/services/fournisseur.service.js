import FournisseurRepository from "../repositories/fournisseur.repo.js";
import HttpError from "../utils/httpError.js";

export default class FournisseurService {
  constructor() {
    this.repository = new FournisseurRepository();
  }

  async getAll() {
    return await this.repository.findAll();
  }

  async getById(id) {
    const fournisseur = await this.repository.findById(id);
    if (!fournisseur) {
      throw new HttpError("Fournisseur non trouvé", 404);
    }
    return fournisseur;
  }

  async create(data) {
    try {
      return await this.repository.create(data);
    } catch (error) {
      if (error.code === 'P2002') {
        throw new HttpError("Un fournisseur avec ce nom ou ce téléphone existe déjà.", 409);
      }
      throw error;
    }
  }

  async update(id, data) {
    await this.getById(id);
    try {
      return await this.repository.update(id, data);
    } catch (error) {
      if (error.code === 'P2002') {
        throw new HttpError("Un fournisseur avec ce nom ou ce téléphone existe déjà.", 409);
      }
      throw error;
    }
  }

  async delete(id) {
    await this.getById(id); // Check existence
    return await this.repository.delete(id);
  }
}
