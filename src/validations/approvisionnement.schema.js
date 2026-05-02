import Joi from "joi";

export const createApprovisionnementSchema = Joi.object({
  fournisseurId: Joi.number().integer().positive().required().messages({
    "any.required": "L'identifiant du fournisseur est requis",
    "number.base": "L'identifiant du fournisseur doit être un nombre entier",
  }),
  produitId: Joi.number().integer().positive().required().messages({
    "any.required": "L'identifiant du produit est requis",
  }),
  quantite: Joi.number().integer().positive().required().messages({
    "any.required": "La quantité est requise",
    "number.positive": "La quantité d'approvisionnement doit être supérieure à zéro",
  }),
});

export const updateApprovisionnementSchema = createApprovisionnementSchema;
