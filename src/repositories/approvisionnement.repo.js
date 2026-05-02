import Database from "../config/db.js";
import { InterfaceRepository } from "./InterfaceRepository.js";

export default class ApprovisionnementRepository extends InterfaceRepository {
  constructor() {
    super();
    this.db = new Database();
    this.model = this.db.prisma.approvisionnement;
  }

  async findAll() {
    return await this.model.findMany({
      include: {
        fournisseur: true,
        produit: true
      }
    });
  }

  async findById(id) {
    return await this.model.findUnique({
      where: { id: parseInt(id) },
      include: {
        fournisseur: true,
        produit: true
      }
    });
  }

  async create(data) {
    return await this.model.create({
      data: {
        quantite: parseInt(data.quantite),
        fournisseurId: parseInt(data.fournisseurId),
        produitId: parseInt(data.produitId),
      },
      include: {
        fournisseur: true,
        produit: true
      }
    });
  }

  async update(id, data) {
    const updateData = {};
    if (data.quantite) updateData.quantite = parseInt(data.quantite);
    if (data.fournisseurId) updateData.fournisseurId = parseInt(data.fournisseurId);
    if (data.produitId) updateData.produitId = parseInt(data.produitId);

    return await this.model.update({
      where: { id: parseInt(id) },
      data: updateData,
      include: {
        fournisseur: true,
        produit: true
      }
    });
  }

  async delete(id) {
    return await this.model.delete({
      where: { id: parseInt(id) },
    });
  }
}
