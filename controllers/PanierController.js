// backend/controllers/CommandController.js
const Panier = require('../models/Panier');
const mongoose = require("mongoose");

const getAllPanier = async (req, res) => {
    try {
        const paniers = await Panier.find();
        res.status(200).json(paniers);
    } catch (error) {
        console.error("Erreur MongoDB :", error); // Ajoute un log pour voir l'erreur exacte
        res.status(500).json({ message: 'Erreur lors de la récupération des paniers', error });
    }
};

const getPanier = async (req, res) => {
    try {
        const id_client = req.user.userId; // On récupère l'ID utilisateur depuis le token

        // Convertir id_client en ObjectId avec 'new' pour éviter l'erreur
        const panier = await Panier.findOne({ id_client: id_client });

        // Vérifier si le panier existe
        if (!panier) {
            return res.status(404).json({ message: 'Aucun panier trouvé pour cet utilisateur' });
        }

        // Retourner le panier trouvé
        res.status(200).json(panier);
    } catch (error) {
        console.error("Erreur MongoDB:", error);
        res.status(500).json({ message: 'Erreur lors de la récupération des paniers', error });
    }
};


const addPanier = async (req, res) => {
    try {
        const { contenu } = req.body;
        const id_client = req.user.userId;

        // Vérification des champs requis
        if (!contenu) {
            return res.status(400).json({ message: "Les champs contenu." });
        }

        // Création et sauvegarde de la commande
        const panier = new Panier({ id_client: id_client, contenu: contenu});
        await panier.save();

        // Réponse en cas de succès
        res.status(201).json({ message: "Panier ajoutée avec succès.", panier });

    } catch (error) {
        console.error("Erreur lors de l'ajout du Panier :", error);
        res.status(500).json({ message: "Erreur lors de l'ajout du Panier.", error: error.message });
    }
};


const deletePanier = async (req, res) => {
    try {
        const { id } = req.params;
        const deletedPanier = await Panier.findByIdAndDelete(id);
        if (!deletedPanier) {
            return res.status(404).json({ message: 'Panier non trouvée' });
        }
        res.status(200).json({ message: 'Panier supprimée avec succès' });
    } catch (error) {
        res.status(500).json({ message: 'Erreur lors de la suppression du Panier', error });
    }
};

const addtoPanier = async (req, res) => {
    try {
        const { id } = req.params;
        const {id_produit} = req.body;
        console.log(id_produit+"produit")
        const panier = await Panier.findByIdAndUpdate(
            id,
            { $addToSet: {contenu: id_produit} },
            { new: true }
        );
    }
    catch (error) {
        res.status(500).json({ message: 'Erreur lors de l\'ajout de la commande au Panier', error });
    }
};


module.exports = {getAllPanier, addPanier, deletePanier, addtoPanier, getPanier};
