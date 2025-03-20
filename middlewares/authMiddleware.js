

const jwt = require("jsonwebtoken");

module.exports = (req, res, next) => {
    const token = req.header("Authorization");

    if (!token) return res.status(401).json({ msg: "Accès refusé, token manquant" });

    try {
        const decoded = jwt.verify(token.replace("Bearer ", ""), process.env.JWT_SECRET);
        req.user = decoded; // Ajoute l'utilisateur à `req`
        next();
    } catch (err) {
        res.status(403).json({ msg: "Token invalide" });
    }
};
