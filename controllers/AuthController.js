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
        res.status(500).json({ message: 'Erreur lors de la récupération des clients', error });
    }
};

module.exports.delUser = async (req, res) => {
    try {
        const { id } = req.params;
        const deletedUser = await User.findByIdAndDelete(id);
        if (!deletedUser) {
            return res.status(404).json({ message: 'Commande non trouvée' });
        }
        res.status(200).json({ message: 'Commande supprimée avec succès' });
    } catch (error) {
        res.status(500).json({ message: 'Erreur lors de la suppression de la commande', error });
    }
};