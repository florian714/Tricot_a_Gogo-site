// backend/routes/produitRoutes.js
const express = require('express');
const router = express.Router();
const auth = require("../middlewares/authMiddleware");
const isAdmin = require("../middlewares/adminMiddleware")

const ProduitController = require('../controllers/ProduitController');

// Route pour obtenir tous les produits
router.get('/', ProduitController.getAllProduits);
router.get('/:id', ProduitController.getclientProduits);

// Route pour ajouter un nouveau produit
router.post('/', auth, isAdmin, ProduitController.addProduit);

// Route pour mettre à jour un produit spécifique
router.put('/:id', auth, isAdmin, ProduitController.updateProduit);

// Route pour supprimer un produit spécifique
router.delete('/:id', auth, isAdmin, ProduitController.deleteProduit);

router.post("/personnalise", auth, ProduitController.addPersonnalisedProduit);

module.exports = router;
