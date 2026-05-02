import Joi from "joi";

export const createProduitSchema = Joi.object({
  libelle: Joi.string().required().messages({
    "string.empty": "Le libellé du produit est requis",
  }),
  prixUnitaire: Joi.number().positive().required().messages({
    "number.base": "Le prix doit être un nombre",
    "number.positive": "Le prix unitaire doit être positif",
    "any.required": "Le prix unitaire est requis",
  }),
  qteStock: Joi.number().integer().min(0).optional().messages({
    "number.min": "La quantité en stock ne peut pas être négative",
  }),
  // On ne valide pas le champ 'image' ici car il vient via Multer, 
  // mais on permet le passage du champ dans le body si nécessaire.
});

export const updateProduitSchema = createProduitSchema;
