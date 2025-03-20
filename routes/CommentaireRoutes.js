// backend/routes/produitRoutes.js
const express = require('express');
const router = express.Router();
const auth = require("../middlewares/authMiddleware");
const isAdmin = require("../middlewares/adminMiddleware")

const CommentaireController = require('../controllers/CommentaireController');

// Route pour obtenir tous les produits
router.get('/', CommentaireController.getAllCommments);

// Route pour ajouter un nouveau produit
router.post('/', auth, CommentaireController.addComment);

// Route pour supprimer un produit spécifique
router.delete('/:id', auth, isAdmin, CommentaireController.deleteComment);

router.patch("/like-comment/:id", auth, CommentaireController.likeCommment);

module.exports = router;
