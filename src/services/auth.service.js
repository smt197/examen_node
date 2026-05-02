import AuthRepository from "../repositories/auth.repo.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import HttpError from "../utils/httpError.js";

export default class AuthService {
  constructor() {
    this.repository = new AuthRepository();
  }

  async register(data) {
    const { email, password } = data;

    if (!email || !password) {
      throw new HttpError("Email et mot de passe sont requis", 400);
    }

    const existingUser = await this.repository.findByEmail(email);
    if (existingUser) {
      throw new HttpError("Cet email est déjà utilisé", 409);
    }

    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(password, saltRounds);

    const newUser = await this.repository.create({
      email,
      password: hashedPassword,
    });

    const { password: _, ...userWithoutPassword } = newUser;
    return userWithoutPassword;
  }

  async login(data) {
    const { email, password } = data;

    if (!email || !password) {
      throw new HttpError("Email et mot de passe sont requis", 400);
    }

    const user = await this.repository.findByEmail(email);
    if (!user) {
      throw new HttpError("Email ou mot de passe incorrect", 401);
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      throw new HttpError("Email ou mot de passe incorrect", 401);
    }

    const secret = process.env.JWT_SECRET || "super_secret_key";
    const token = jwt.sign(
      { id: user.id, email: user.email },
      secret,
      { expiresIn: "1d" }
    );

    return { token, user: { id: user.id, email: user.email } };
  }
}
