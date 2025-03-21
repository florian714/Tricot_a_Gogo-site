const apiURL = "http://127.0.0.1:3000"

async function fetchProduit() {
    const token = localStorage.getItem('token');

    // Récupérer le panier de l'utilisateur (si existant)
    try {
        const response = await fetch(apiURL + "/paniers/find", {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            }
        });

        const panier = await response.json();

        if (!panier.contenu || panier.contenu.length === 0) {
            console.log("Le panier est vide.");
            return;
        }

        const container = document.getElementById('produits-container');
        container.innerHTML = ''; // Effacer le contenu AVANT la boucle

        for (const idproduit of panier.contenu) {
            try {
                const produitResponse = await fetch(apiURL + '/produits/' + idproduit, {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${token}`
                    }
                });

                const produit = await produitResponse.json();

                // Création des éléments DOM
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

                const retirerContainer = document.createElement('div');
                retirerContainer.className = 'retirer-container';

                const retirerButton = document.createElement('button');
                retirerButton.className = 'retirer-button';
                retirerButton.innerText = "retirer"

                produitSection.appendChild(nameHeader);
                produitSection.appendChild(colorText);
                produitSection.appendChild(persoText);
                retirerContainer.appendChild(retirerButton);
                produitSection.appendChild(retirerContainer);

                container.appendChild(produitSection);
                console.log(idproduit);

                retirerButton.onclick = async function() {
                    await fetch(apiURL + "/paniers/retirer/" + panier._id, {
                        method: 'PATCH',
                        headers: {
                            'Content-Type': 'application/json',
                            'Authorization': `Bearer ${token}`
                        },
                        body: JSON.stringify({ id_produit: idproduit })
                    }).then(response => response.json())
                    .then(data => {
                        console.log("Réponse du serveur :", data);
                        fetchProduit(); 
                    })
                    .catch(error => console.error("Erreur lors de l'enlevement produit du panier", error));
                }

            } catch (error) {
                console.error("Erreur lors de la récupération du produit :", error);
            }
        }
    } catch (error) {
        console.error("Erreur lors de la recherche du panier :", error);
    }
}

// Appel de la fonction pour afficher les commandes lorsque la page est chargée
window.onload = function () {
    fetchProduit();
};
