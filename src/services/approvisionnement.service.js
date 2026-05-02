import ApprovisionnementRepository from "../repositories/approvisionnement.repo.js";
import ProduitService from "./produit.service.js";
import HttpError from "../utils/httpError.js";

export default class ApprovisionnementService {
  constructor() {
    this.repository = new ApprovisionnementRepository();
    this.produitService = new ProduitService();
  }

  async getAll() {
    return await this.repository.findAll();
  }

  async getById(id) {
    const appro = await this.repository.findById(id);
    if (!appro) {
      throw new HttpError("Approvisionnement non trouvé", 404);
    }
    return appro;
  }

  async create(data) {
    if (!data.produitId || !data.quantite) {
        throw new HttpError("produitId et quantite sont requis", 400);
    }
    
    await this.produitService.getById(data.produitId);

    // 2. Create the approvisionnement
    const newAppro = await this.repository.create(data);

    // 3. Increment stock
    await this.produitService.incrementStock(data.produitId, data.quantite);

    return newAppro;
  }

  async update(id, data) {
    await this.getById(id);
    return await this.repository.update(id, data);
  }

  async delete(id) {
    await this.getById(id);
    return await this.repository.delete(id);
  }
}
