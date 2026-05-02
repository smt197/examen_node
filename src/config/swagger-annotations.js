/**
 * @swagger
 * tags:

 *   - name: Auth
 *     description: Authentification
 *   - name: Fournisseurs
 *     description: Fournisseur management
 *   - name: Approvisionnements
 *     description: Gestion des approvisionnements
 *   - name: Produits
 *     description: Product management
 *   - name: Ventes
 *     description: Sale management
 */

/**
 * @swagger
 * /api/auth/register:
 *   post:
 *     summary: Inscription d'un nouvel utilisateur
 *     tags: [Auth]
 *     security: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - email
 *               - password
 *             properties:
 *               email:
 *                 type: string
 *                 example: "test@example.com"
 *               password:
 *                 type: string
 *                 example: "motdepasse123"
 *     responses:
 *       201:
 *         description: Inscription réussie
 *       400:
 *         description: Requête invalide (données manquantes ou incorrectes)
 *       409:
 *         description: L'email est déjà utilisé
 */

/**
 * @swagger
 * /api/auth/login:
 *   post:
 *     summary: Connexion d'un utilisateur
 *     tags: [Auth]
 *     security: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - email
 *               - password
 *             properties:
 *               email:
 *                 type: string
 *                 example: "test@example.com"
 *               password:
 *                 type: string
 *                 example: "motdepasse123"
 *     responses:
 *       200:
 *         description: Connexion réussie, retourne un token JWT
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 token:
 *                   type: string
 *                   example: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
 *                 user:
 *                   type: object
 *                   properties:
 *                     id:
 *                       type: integer
 *                       example: 1
 *                     email:
 *                       type: string
 *                       example: "test@example.com"
 *       401:
 *         description: Identifiants incorrects
 */

/**
 * @swagger
 * /api/fournisseurs:
 *   post:
 *     summary: Create a new fournisseur
 *     tags: [Fournisseurs]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - nom
 *               - telephone
 *               - adresse
 *             properties:

 *               nom:
 *                 type: string
 *                 example: Doe

 *               telephone:
 *                 type: string
 *                 example: 123456789
 *               adresse:
 *                 type: string
 *                 example: 123 Main St
 *     responses:
 *       201:
 *         description: Fournisseur created successfully
 *       401:
 *         description: Unauthorized
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 */

/**
 * @swagger
 * /api/fournisseurs:
 *   get:
 *     summary: Get all fournisseurs
 *     tags: [Fournisseurs]
 *     responses:
 *       200:
 *         description: List of all fournisseurs
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Fournisseur'
 */

/**
 * @swagger
 * /api/approvisionnements:
 *   post:
 *     summary: Créer un nouvel approvisionnement
 *     tags: [Approvisionnements]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - fournisseurId
 *               - produitId
 *               - quantite
 *             properties:
 *               fournisseurId:
 *                 type: integer
 *                 example: 1
 *               produitId:
 *                 type: integer
 *                 example: 1
 *               quantite:
 *                 type: integer
 *                 example: 50
 *     responses:
 *       201:
 *         description: Approvisionnement créé et stock mis à jour
 *       400:
 *         description: Requête invalide
 *       401:
 *         description: Non autorisé
 */

/**
 * @swagger
 * /api/approvisionnements:
 *   get:
 *     summary: Lister tous les approvisionnements
 *     tags: [Approvisionnements]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Liste de tous les approvisionnements
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Approvisionnement'
 */

/**
 * @swagger
 * /api/produits:
 *   get:
 *     summary: Get all produits
 *     tags: [Produits]
 *     responses:
 *       200:
 *         description: List of all produits
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Produit'
 */

/**
 * @swagger
 * /api/produits/{id}:
 *   get:
 *     summary: Get a product by ID
 *     tags: [Produits]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Product details
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Produit'
 *       404:
 *         description: Product not found
 */

/**
 * @swagger
 * /api/produits:
 *   post:
 *     summary: Create a new product
 *     tags: [Produits]
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             required:
 *               - libelle
 *               - prixUnitaire

 *             properties:
 *               libelle:
 *                 type: string
 *               qteStock:
 *                 type: integer
 *               prixUnitaire:
 *                 type: number

 *               image:
 *                 type: string
 *                 format: binary
 *     responses:
 *       201:
 *         description: Product created successfully
 */

/**
 * @swagger
 * /api/produits/{id}:
 *   put:
 *     summary: Update an existing product
 *     tags: [Produits]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     requestBody:
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             properties:
 *               libelle:
 *                 type: string
 *               qteStock:
 *                 type: integer
 *               prixUnitaire:
 *                 type: number

 *               image:
 *                 type: string
 *                 format: binary
 *     responses:
 *       200:
 *         description: Product updated successfully
 */

/**
 * @swagger
 * /api/produits/{id}:
 *   delete:
 *     summary: Delete a product
 *     tags: [Produits]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       204:
 *         description: Product deleted successfully
 */
