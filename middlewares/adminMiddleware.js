module.exports = (req, res, next) => {
    if (!req.user) {
        return res.status(401).json({ msg: "Accès refusé. Utilisateur non authentifié." });
    }

    if (req.user.role !== "admin") {
        return res.status(403).json({ msg: "Accès refusé. Vous n'êtes pas administrateur." });
    }

    next(); // L'utilisateur est admin, on passe à la suite
};
