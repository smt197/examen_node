import jwt from "jsonwebtoken";

export const verifyToken = (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return res.status(401).json({ message: "Accès refusé. Token manquant ou invalide." });
  }

  const token = authHeader.split(" ")[1];
  const secret = process.env.JWT_SECRET || "super_secret_key";

  try {
    const decoded = jwt.verify(token, secret);
    req.user = decoded;
    next();
  } catch (error) {
    return res.status(401).json({ message: "Accès refusé. Token expiré ou invalide." });
  }
};
