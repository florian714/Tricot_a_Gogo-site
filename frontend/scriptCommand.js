const apiURL = "http://127.0.0.1:5500"

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

                    const boutonPanier = document.createElement('button');
                    boutonPanier.className = 'command-button';
                    boutonPanier.innerText = 'Ajouter au panier'

                    const boutonContainer = document.createElement('div');
                    boutonContainer.className = 'command-container';

                    produitSection.appendChild(nameHeader);
                    produitSection.appendChild(colorText);
                    produitSection.appendChild(persoText);

                    boutonContainer.appendChild(boutonPanier);
                    produitSection.appendChild(boutonContainer);
                    container.appendChild(produitSection);
                    


                    boutonPanier.onclick = async function () {
                        try {
                            const token = localStorage.getItem('token');

                            // Récupérer le panier de l'utilisateur (si existant)
                            const ispanier = await fetch(apiURL + "/paniers/find", {
                                method: 'GET',
                                headers: { // Corrigé "header" -> "headers"
                                    'Content-Type': 'application/json',
                                    'Authorization': `Bearer ${token}`
                                }
                            }).then(response => response.json()).catch(
                                error => console.error("Erreur lors de la recherche du panier :", error)
                            );
                            // Si aucun panier n'existe, en créer un nouveau
                             if (!ispanier._id) {
                                await fetch(apiURL + "/paniers", {
                                    method: 'POST',
                                    headers: {
                                        'Content-Type': 'application/json',
                                        'Authorization': `Bearer ${token}`
                                    },
                                    body: JSON.stringify({ contenu: produit._id })
                                }).then(response => response.json())
                                .then(data => console.log("Panier créé :", data))
                                .catch(error => console.error("Erreur lors de l'ajout du panier :", error));
                            }
                            // Si un panier existe, mettre à jour son contenu
                            else {
                                await fetch(apiURL + "/paniers/ajout/" + ispanier._id, {
                                    method: 'PATCH',
                                    headers: {
                                        'Content-Type': 'application/json',
                                        'Authorization': `Bearer ${token}`
                                    },
                                    body: JSON.stringify({ id_produit: produit._id })
                                }).then(response => response.json())
                                .then(data => {
                                    console.log("Réponse du serveur :", data);
                                })
                                .catch(error => console.error("Erreur lors de la mise à jour du panier", error));
                            }

                        } catch (error) {
                            console.error("Erreur générale :", error);
                        }
                    };
                    
                });
            } else {
                console.log("pas de produit");
            }
        })
        .catch(error => {
            console.error('Erreur lors de la récupération des produits:', error);
        });
}

// Appel de la fonction pour afficher les commandes lorsque la page est chargée
window.onload = function () {
    fetchProduit();
};
