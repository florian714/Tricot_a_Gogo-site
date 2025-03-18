// backend/controllers/CommandController.js
const Command = require('../models/Command');
const Produit = require('../models/Produit')

const getAllCommands = async (req, res) => {
    try {
        const commands = await Command.find();
        res.status(200).json(commands);
    } catch (error) {
        console.error("Erreur MongoDB :", error); // Ajoute un log pour voir l'erreur exacte
        res.status(500).json({ message: 'Erreur lors de la récupération des commandes', error });
    }
};


const addCommand = async (req, res) => {
    try {
        const { name, color } = req.body;
        const id_client = req.user.userId;

        const produit = await Produit.findOne({ name, color });
        if (!produit) {
            return res.status(404).json({ msg: "Produit non trouvé" });
        }

        const id_produit = produit._id;

        console.log(name, color, id_produit);

        // Vérification des champs requis
        if (!name || !color) {
            return res.status(400).json({ message: "Les champs id_client et id_produit sont obligatoires." });
        }

        // Création et sauvegarde de la commande
        const command = new Command({ id_client, id_produit });
        await command.save();

        // Réponse en cas de succès
        res.status(201).json({ message: "Commande ajoutée avec succès.", command });

    } catch (error) {
        console.error("Erreur lors de l'ajout de la commande :", error);
        res.status(500).json({ message: "Erreur lors de l'ajout de la commande.", error: error.message });
    }
};

const updateCommand = async (req, res) => {
    try {
        const { id } = req.params.id;
        const { id_client, id_produit } = req.body;

        // Trouver la commande et la mettre à jour
        const updatedCommand = await Command.findByIdAndUpdate(id, { id_client, id_produit }, { new: true });

        // Si la commande n'existe pas, renvoie une erreur
        if (!updatedCommand) {
            return res.status(404).json({ message: 'Commande non trouvée' });
        }

        // Retourner la commande mise à jour
        res.status(200).json(updatedCommand);

    } catch (error) {
        res.status(500).json({message: 'Erreur lors de la modification de la commande', error});
    }
    
};

const deleteCommand = async (req, res) => {
    try {
        const { id } = req.params;
        const deletedCommand = await Command.findByIdAndDelete(id);
        if (!deletedCommand) {
            return res.status(404).json({ message: 'Commande non trouvée' });
        }
        res.status(200).json({ message: 'Commande supprimée avec succès' });
    } catch (error) {
        res.status(500).json({ message: 'Erreur lors de la suppression de la commande', error });
    }
};

module.exports = {getAllCommands, addCommand, updateCommand, deleteCommand}
