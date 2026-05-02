import Database from "../config/db.js";
import { InterfaceRepository } from "./InterfaceRepository.js";
import cloudinary from "../config/cloudinary.js";

export default class ProduitRepository extends InterfaceRepository {
  constructor() {
    super();
    this.db = new Database();
    this.model = this.db.prisma.produit;
  }

  async findAll() {
    return await this.model.findMany();
  }

  async findById(id) {
    return await this.model.findUnique({
      where: { id: parseInt(id) },
    });
  }

  async create(data) {
    return await this.model.create({
      data: {
        libelle: data.libelle,
        qteStock: parseInt(data.qteStock) || 0,
        prixUnitaire: parseFloat(data.prixUnitaire),
        image: data.image || null,
      },
    });
  }

  async update(id, data) {
    const updateData = {};
    if (data.libelle) updateData.libelle = data.libelle;
    if (data.qteStock !== undefined)
      updateData.qteStock = parseInt(data.qteStock);
    if (data.prixUnitaire !== undefined)
      updateData.prixUnitaire = parseFloat(data.prixUnitaire);
    if (data.image) updateData.image = data.image;

    return await this.model.update({
      where: { id: parseInt(id) },
      data: updateData,
    });
  }

  async delete(id) {
    return await this.model.delete({
      where: { id: parseInt(id) },
    });
  }
}
