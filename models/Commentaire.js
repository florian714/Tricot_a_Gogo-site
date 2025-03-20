const mongoose = require('mongoose');

const commentaireSchema = new mongoose.Schema({
    contenu: { type: String, required: true },
    id_client: { type: mongoose.Schema.Types.ObjectId, ref: 'Client', required: true },
    likes: { type: [String] }
}, { timestamps: true }); // Ajoute createdAt et updatedAt automatiquement

const Commentaire = mongoose.model('Commentaire', commentaireSchema);
module.exports = Commentaire;