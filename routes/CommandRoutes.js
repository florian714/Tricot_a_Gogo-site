// backend/routes/produitRoutes.js
const express = require('express');
const router = express.Router();
const auth = require('../middlewares/authMiddleware');
const CommandController = require('../controllers/CommandConctroller');

console.log(auth)
// Route pour obtenir tous les produits
router.get('/', auth, CommandController.getAllCommands);

// Route pour ajouter un nouveau produit
router.post('/', auth, CommandController.addCommand);

// Route pour mettre à jour un produit spécifique
router.put('/:id', auth, CommandController.updateCommand);

// Route pour supprimer un produit spécifique
router.delete('/:id', auth, CommandController.deleteCommand);

module.exports = router;

