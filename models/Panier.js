const mongoose = require('mongoose');

const panierSchema = new mongoose.Schema({
    id_client: { type: String, required: true },
    contenu: { type: [String]}
}, { timestamps: true }); // Ajoute createdAt et updatedAt automatiquement

const Panier = mongoose.model('Panier', panierSchema);
module.exports = Panier;