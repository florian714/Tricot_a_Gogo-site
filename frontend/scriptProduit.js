const apiURL = "http://127.0.0.1:3000"

function fetchProduit() {
    fetch(apiURL+'/produits')
        .then(response => {
            if (!response.ok) {
                throw new Error('Erreur lors de la récupération des produits');
            }
            return response.json();
        })
        .then(produits => {
            const produitList = document.getElementById('produitList');
            produitList.innerHTML = ''; // Vide la liste avant de la remplir
            // Vérifie que des commandes sont récupérées
            if (produits.length > 0) {
                produits.forEach(produit => {
                    const li_produit = document.createElement('li');
                    li_produit.textContent = `Name: ${produit.name}, Color: ${produit.color}, Price: ${produit.price}, option: ${produit.option}`;
                    produitList.appendChild(li_produit);
                });
            } else {
                const li_produit = document.createElement('li');
                li_produit.textContent = 'Aucun produit disponible.';
                produitList.appendChild(li_produit);
            }
        })
        .catch(error => {
            console.error('Erreur lors de la récupération des produits:', error);
            const produitList = document.getElementById('produitList');
            const li_produit = document.createElement('li');
            li_produit.textContent = 'Impossible de récupérer les produits.';
            produitList.appendChild(li_produit);
        });
}


// Fonction pour envoyer un nouveau Produit à l'API
document.getElementById('addProduitForm').addEventListener('submit', function (e) {
    e.preventDefault();

    const name = document.getElementById('idName').value;
    const color = document.getElementById('idColor').value;
    const price = document.getElementById('idPrice').value;

    const produitData = {
        name: name,
        color: color,
        price: price
    };
    const token = localStorage.getItem('token');
    fetch(apiURL+'/produits', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            "Authorization": `Bearer ${token}`
        },
        body: JSON.stringify(produitData)
    })
        .then(response => response.json())
        .then(data => {
            console.log('Produit ajoutée:', data);
            // Rafraîchir la liste des commandes
            fetchProduit();
        })
        .catch(error => {
            console.error('Erreur lors de l\'ajout du produit:', error);
        });
});

const role = localStorage.getItem("role");

if (role !== "admin") {
    document.getElementById("adminPanel").style.display = "none";
}


// Appel de la fonction pour afficher les commandes lorsque la page est chargée
window.onload = function () {
    fetchProduit();
};
