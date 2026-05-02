import Database from "../config/db.js";
import { InterfaceRepository } from "./InterfaceRepository.js";

export default class AuthRepository extends InterfaceRepository {
  constructor() {
    super();
    this.db = new Database();
    this.model = this.db.prisma.utilisateur;
  }

  async findByEmail(email) {
    return await this.model.findUnique({
      where: { email },
    });
  }

  async create(data) {
    return await this.model.create({
      data: {
        email: data.email,
        password: data.password,
      },
    });
  }

  async findAll() { return []; }
  async findById(id) { return null; }
  async update(id, data) { return null; }
  async delete(id) { return null; }
}
