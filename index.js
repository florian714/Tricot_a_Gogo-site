require('dotenv').config();
const { createServer } = require('node:http');
const express = require('express');
const mongoose = require('mongoose');
const session = require('express-session');
const cors = require('cors');

//recupérer les routes

const routeCommand = require("./routes/CommandRoutes");
const routeProduit = require("./routes/ProduitRoutes");
const routeUser = require("./routes/UserRoutes");
const routeComment = require("./routes/CommentaireRoutes");

const app = express();
const hostname = '127.0.0.1';
const port = 3000;

// Middleware pour parser les requêtes JSON (optionnel mais utile)
app.use(cors());  // Permet les requêtes CORS

app.use(express.json());
app.use(express.urlencoded())
app.use(session({
    secret: 'votreSecret',
    resave: false,
    saveUninitialized: true
}))

// Utilisation des routes définies dans commandRoute
app.use('/commands', routeCommand);
// Utilisation des routes définies dans produitRoute
app.use('/produits', routeProduit);
// Utilisation des routes définies dans userRoute
app.use('/user', routeUser);
// Utilisation des routes définies dans CommentaireRoute
app.use("/comments", routeComment);

//generer la base de données
const mongoURI = "mongodb://127.0.0.1:27017/DonnéesTricot";

mongoose.connect(mongoURI)
.then(() => console.log("✅ Connexion MongoDB réussie !"))
.catch(err => console.error("❌ Erreur de connexion à MongoDB :", err));

// Création du serveur HTTP en utilisant Express
const server = createServer(app);

server.listen(port, hostname, () => {
    console.log(`Server running at http://${hostname}:${port}/`);
});
