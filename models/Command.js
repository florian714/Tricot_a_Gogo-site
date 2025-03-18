const mongoose = require('mongoose');

const commandSchema = new mongoose.Schema({
    id_client: { type: mongoose.Schema.Types.ObjectId, ref: 'Client', required: true },
    id_produit: { type: mongoose.Schema.Types.ObjectId, ref: 'Produit', required: true }
}, { timestamps: true }); // Ajoute createdAt et updatedAt automatiquement

const Command = mongoose.model('Command', commandSchema);
module.exports = Command;