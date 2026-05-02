import Joi from "joi";

export const registerSchema = Joi.object({
  email: Joi.string().email().required().messages({
    "string.empty": "L'email est requis",
    "string.email": "Format d'email invalide",
  }),
  password: Joi.string().min(6).required().messages({
    "string.empty": "Le mot de passe est requis",
    "string.min": "Le mot de passe doit contenir au moins 6 caractères",
  }),
});

export const loginSchema = Joi.object({
  email: Joi.string().email().required(),
  password: Joi.string().required(),
});
