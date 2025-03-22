// backend/routes/produitRoutes.js
const express = require('express');
const router = express.Router();
const auth = require('../middlewares/authMiddleware');
const PanierController = require('../controllers/PanierController');

console.log(auth)
// Route pour obtenir tous les produits
router.get('/', PanierController.getAllPanier);

router.get('/find', auth, PanierController.getPanier);

// Route pour ajouter un nouveau produit
router.post('/', auth, PanierController.addPanier);

// Route pour supprimer un produit spécifique
router.delete('/:id', PanierController.deletePanier);

router.patch('/ajout/:id', auth, PanierController.addtoPanier);

router.patch('/retirer/:id', auth, PanierController.delProduit);

router.patch('/reset/:id', auth, PanierController.resetPanier);

module.exports = router;

