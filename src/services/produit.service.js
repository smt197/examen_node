import ProduitRepository from "../repositories/produit.repo.js";
import cloudinary from "../config/cloudinary.js";
import HttpError from "../utils/httpError.js";

export default class ProduitService {
  constructor() {
    this.repository = new ProduitRepository();
  }

  async getAll() {
    return await this.repository.findAll();
  }

  async getById(id) {
    const produit = await this.repository.findById(id);
    if (!produit) {
      throw new HttpError("Produit non trouvé", 404);
    }
    return produit;
  }

  async create(data, file) {
    let imageUrl = null;
    if (file) {
      const result = await new Promise((resolve, reject) => {
        const uploadStream = cloudinary.uploader.upload_stream(
          { folder: "produits" },
          (error, result) => {
            if (error) reject(error);
            else resolve(result);
          }
        );
        uploadStream.end(file.buffer);
      });
      imageUrl = result.secure_url;
    }
    
    try {
      return await this.repository.create({
        ...data,
        image: imageUrl,
      });
    } catch (error) {
      if (error.code === 'P2002') {
        throw new HttpError("Un produit avec ce libellé existe déjà.", 409);
      }
      throw error;
    }
  }

  async update(id, data, file) {
    await this.getById(id); // Check existence
    
    let imageUrl = null;
    if (file) {
      const result = await new Promise((resolve, reject) => {
        const uploadStream = cloudinary.uploader.upload_stream(
          { folder: "produits" },
          (error, result) => {
            if (error) reject(error);
            else resolve(result);
          }
        );
        uploadStream.end(file.buffer);
      });
      imageUrl = result.secure_url;
    }
    
    const updateData = { ...data };
    if (imageUrl) {
        updateData.image = imageUrl;
    }
    
    try {
      return await this.repository.update(id, updateData);
    } catch (error) {
      if (error.code === 'P2002') {
        throw new HttpError("Un produit avec ce libellé existe déjà.", 409);
      }
      throw error;
    }
  }

  async delete(id) {
    await this.getById(id);
    return await this.repository.delete(id);
  }

  async incrementStock(id, quantite) {
    const produit = await this.getById(id);
    const newStock = produit.qteStock + parseInt(quantite);
    return await this.repository.update(id, { qteStock: newStock });
  }

  async decrementStock(id, quantite) {
    const produit = await this.getById(id);
    const newStock = produit.qteStock - parseInt(quantite);
    if (newStock < 0) {
      throw new HttpError("Le stock ne peut pas être négatif. L'opération a été refusée.", 400);
    }
    return await this.repository.update(id, { qteStock: newStock });
  }
}
