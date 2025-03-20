// backend/controllers/CommandController.js
const Comment = require('../models/Commentaire');

const getAllCommments = async (req, res) => {
    try {
        const comments = await Comment.find();
        res.status(200).json(comments);
    } catch (error) {
        console.error("Erreur MongoDB :", error); // Ajoute un log pour voir l'erreur exacte
        res.status(500).json({ message: 'Erreur lors de la récupération des commandes', error });
    }
};


const addComment = async (req, res) => {
    try {
        const { contenu } = req.body;
        const id_client = req.user.userId;

        // Vérification des champs requis
        if (!contenu) {
            return res.status(400).json({ message: "Les champs contenu." });
        }

        // Création et sauvegarde de la commande
        const comment = new Comment({ contenu: contenu, id_client: id_client});
        await comment.save();

        // Réponse en cas de succès
        res.status(201).json({ message: "Commentaire ajoutée avec succès.", comment });

    } catch (error) {
        console.error("Erreur lors de l'ajout du commentaire :", error);
        res.status(500).json({ message: "Erreur lors de l'ajout du commentaire.", error: error.message });
    }
};


const deleteComment = async (req, res) => {
    try {
        const { id } = req.params.id;
        const deletedComment = await Comment.findByIdAndDelete(id);
        if (!deletedComment) {
            return res.status(404).json({ message: 'Commentaire non trouvée' });
        }
        res.status(200).json({ message: 'Commentaire supprimée avec succès' });
    } catch (error) {
        res.status(500).json({ message: 'Erreur lors de la suppression du commentaire', error });
    }
};

const likeCommment = async (req, res) => {
    try {
        const { id } = req.params;
        const id_liker = req.user.userId;
        const comment = await Comment.findByIdAndUpdate(
            id,
            { $addToSet: {likes: id_liker} },
            { new: true }
        );
    }
    catch (error) {
        res.status(500).json({ message: 'Erreur lors du like du commentaire', error });
    }
};


module.exports = {getAllCommments, addComment, deleteComment, likeCommment};
