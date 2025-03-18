// backend/models/produitModel.js
const mongoose = require('mongoose');

const produitSchema = new mongoose.Schema({
    name: { type: String, required: true },
    color: { type: String, required: true },
    price: { type: Number, required: true },
    personnalise: {type: String, enum:["Personnalisé", "Non Personnalisé"], default:"Non Personnalisé"},
    option: {type: String, default:""},
    createur: {type: String, default:""}
});

const Produit = mongoose.model('Produit', produitSchema);

module.exports = Produit;
