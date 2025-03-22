// backend/controllers/ClientController.js
const User = require('../models/User');
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

module.exports.register = async (req, res) => {
    console.log("Données reçues :", req.body); // Vérifie le contenu de req.body

    const { firstName, lastName, email, adresse, city, password, role } = req.body;

    if (!email || !password || !firstName || !lastName || !adresse || !city) {
        return res.status(400).json({ msg: "Ils manque des informations" });
    }

    try {
        let user = await User.findOne({ email });
        if (user) return res.status(400).json({ msg: "Utilisateur existe déjà" });

        const hashedPassword = await bcrypt.hash(password, 10);
        user = new User({ 
            firstName,
            lastName,
            email, 
            adresse,
            city,
            password: hashedPassword, 
            role: role || "client" 
        });

        await user.save();
        res.status(201).json({ msg: "Utilisateur créé avec succès" });

    } catch (err) {
        console.error("Erreur serveur :", err);
        res.status(500).json({ msg: "Erreur serveur" });
    }
};



module.exports.login = async (req, res) => {
    const { email, password } = req.body;

    try {
        let user = await User.findOne({ email });
        if (!user) return res.status(400).json({ msg: "Utilisateur non trouvé" });

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) return res.status(400).json({ msg: "Mot de passe incorrect" });

        const token = jwt.sign(
            { userId: user.id, role: user.role }, 
            process.env.JWT_SECRET, 
            { expiresIn: process.env.JWT_EXPIRES_IN }
        );

        res.json({ token });
    } catch (err) {
        res.status(500).json({ msg: "Erreur serveur" });
    }
};

module.exports.getAll = async (req, res) => {
    try {
        const users = await User.find();
        res.status(200).json(users);
    } catch (error) {
        console.error("Erreur MongoDB :", error); // Ajoute un log pour voir l'erreur exacte
        res.status(500).json({ message: 'Erreur lors de la récupération des Users', error });
    }
};

module.exports.delUser = async (req, res) => {
    try {
        const { id } = req.params;
        const deletedUser = await User.findByIdAndDelete(id);
        if (!deletedUser) {
            return res.status(404).json({ message: 'User non trouvée' });
        }
        res.status(200).json({ message: 'User supprimée avec succès' });
    } catch (error) {
        res.status(500).json({ message: 'Erreur lors de la suppression du user', error });
    }
};

module.exports.updateUser = async (req, res) => {
    try {
        const id = req.params.id;
        const { firstName, lastName, email, adresse, city, password, role } = req.body;

        // Trouver la commande et la mettre à jour
        const updatedUSer = await User.findByIdAndUpdate(id, { firstName, lastName, email, adresse, city, password, role }, { new: true });

        // Si la commande n'existe pas, renvoie une erreur
        if (!updatedUSer) {
            return res.status(404).json({ message: 'User non trouvée' });
        }

        // Retourner la commande mise à jour
        res.status(200).json(updatedUSer);

    } catch (error) {
        res.status(500).json({message: 'Erreur lors de la modification du user', error});
    };
};

module.exports.findUser = async (req, res) => {
    try {
        const { id } = req.params;
        const user = await User.findById(id);
        res.status(200).json(user);

    }
    catch {
        res.status(500).json({ message: "Erreur lors de la recherche de User"})
    }
};

module.exports.findActualUser = async (req, res) => {
    try {
        const _id = req.user.userId; // L'ID de l'utilisateur depuis le token
        console.log("ID de l'utilisateur:", _id);  // Log l'ID pour vérifier qu'il est bien présent

        // Recherche l'utilisateur par ID dans la base de données
        const user = await User.findById(_id);
        if (!user) {
            console.log("Utilisateur non trouvé pour l'ID:", _id);  // Log pour aider à diagnostiquer
            return res.status(404).json({ message: 'Aucun utilisateur trouvé pour cet ID' });
        }
        // Si l'utilisateur est trouvé, renvoie les informations
        res.status(200).json(user);
    } catch (error) {
        console.error("Erreur lors de la recherche de l'utilisateur:", error);  // Log l'erreur détaillée
        res.status(500).json({ message: "Erreur lors de la recherche de nom", error: error.message });
    }
};