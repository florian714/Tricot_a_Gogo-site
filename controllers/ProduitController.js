// backend/controllers/ProduitController.js
const Produit = require('../models/Produit');

module.exports.getAllProduits = async(req, res) => {
    try {
        const produits = await Produit.find();
        res.status(200).json(produits);
    } catch (error) {
        console.error("Erreur MongoDB :", error); // Ajoute un log pour voir l'erreur exacte
        res.status(500).json({ message: 'Erreur lors de la récupération des produits', error });
    }
};

module.exports.addProduit = async (req, res) => {
    try {
        const { name, color, price } = req.body;

        // Création et sauvegarde de la commande
        const nouveauProduit = new Produit({ name, color, price });
        await nouveauProduit.save();

        // Réponse en cas de succès
        res.status(201).json({ message: "Commande ajoutée avec succès.", nouveauProduit });

    } catch (error) {
        console.error("Erreur lors de l'ajout de la commande :", error);
        res.status(500).json({ message: "Erreur lors de l'ajout de la commande.", error: error.message });
    }
};

module.exports.updateProduit = async (req, res) => {
    try {
        const id = req.params.id;
        const { name, color, price } = req.body;

        // Trouver la commande et la mettre à jour
        const updatedProduit = await Produit.findByIdAndUpdate(id, { name, color, price }, { new: true });

        // Si la commande n'existe pas, renvoie une erreur
        if (!updatedProduit) {
            return res.status(404).json({ message: 'Commande non trouvée' });
        }

        // Retourner la commande mise à jour
        res.status(200).json(updatedProduit);

    } catch (error) {
        res.status(500).json({message: 'Erreur lors de la modification de la commande', error});
    };
}


module.exports.deleteProduit = async (req, res) => {
    try {
        const { id } = req.params;
        const deletedProduit = await Produit.findByIdAndDelete(id);
        if (!deletedProduit) {
            return res.status(404).json({ message: 'Commande non trouvée' });
        }
        res.status(200).json({ message: 'Commande supprimée avec succès' });
    } catch (error) {
        res.status(500).json({ message: 'Erreur lors de la suppression de la commande', error });
    }
};

module.exports.addPersonnalisedProduit = async (req, res) => {
    try {
        const userid = req.user.userId;
        const { name, color , price, option }= req.body;
        const nouveauProduit = new Produit(
            {name: name,
                color: color,
                price: price,
                personnalise: "Personnalisé",
                option: option,
                createur: userid
        })
        await nouveauProduit.save();
        // Réponse en cas de succès
        res.status(201).json({ message: "Produit ajoutée avec succès.", nouveauProduit });
    }
    catch {
        res.status(500).json({ message: "Erreur lors de l'ajout du produit", error });
    }
};
