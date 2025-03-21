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
            const container = document.getElementById('produits-container');
            container.innerHTML = ''; // Vide la liste avant de la remplir
            // Vérifie que des commandes sont récupérées
            if (produits.length > 0) {
                produits.forEach(produit => {
                    const produitSection = document.createElement('div');
                    produitSection.className = 'produit-section';

                    const nameHeader = document.createElement('div');
                    nameHeader.className = 'produit-header';
                    nameHeader.innerHTML = `<strong>${produit.name}</strong>`;
                    const colorText = document.createElement('div');
                    colorText.className = 'produit-text';
                    colorText.innerText = produit.color;

                    const persoText = document.createElement('div');
                    persoText.className = 'produit-text';
                    persoText.innerText = produit.option;

                    produitSection.appendChild(nameHeader);
                    produitSection.appendChild(colorText);
                    produitSection.appendChild(persoText);

                    container.appendChild(produitSection);
                    
                });
            } else {
                console.log("pas de produit")
            }
        })
        .catch(error => {
            console.error('Erreur lors de la récupération des produits:', error);
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
