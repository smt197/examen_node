import AuthService from "../services/auth.service.js";

export default class AuthController {
  constructor() {
    this.service = new AuthService();
  }

  async register(req, res) {
    try {
      const user = await this.service.register(req.body);
      res.status(201).json({ message: "Inscription réussie", user });
    } catch (error) {
      res.status(error.statusCode || 500).json({ message: error.message || "Erreur serveur" });
    }
  }

  async login(req, res) {
    try {
      const result = await this.service.login(req.body);
      res.status(200).json(result);
    } catch (error) {
      res.status(error.statusCode || 500).json({ message: error.message || "Erreur serveur" });
    }
  }
}
