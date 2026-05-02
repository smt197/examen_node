import Joi from "joi";

export const createFournisseurSchema = Joi.object({
  nom: Joi.string().required().messages({
    "string.empty": "Le nom du fournisseur est requis",
  }),
  telephone: Joi.string()
    .pattern(/^[0-9]+$/)
    .allow(null, "")
    .messages({
      "string.pattern.base": "Le numéro de téléphone ne doit contenir que des chiffres",
    }),
  adresse: Joi.string().allow(null, ""),
});

export const updateFournisseurSchema = createFournisseurSchema; // Même schéma pour la modification
