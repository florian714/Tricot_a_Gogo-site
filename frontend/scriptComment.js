const apiURL = "http://127.0.0.1:3000"
//function like () 
function fetchComment() {
    fetch(apiURL + '/comments')
        .then(response => {
            if (!response.ok) {
                throw new Error('Erreur lors de la récupération des commentaires');
            }
            return response.json();
        })
        .then(comments => {
            const container = document.getElementById('comments-container');

            container.innerHTML = "";


            if (comments.length > 0) {
                comments.forEach(comment => {

                   fetch(apiURL+ "/user/"+comment.id_client)
                    .then(response => {
                        if (!response.ok) {
                            throw new Error("Erreur lors de la récupération du l'utilisateur");
                        }
                        return response.json();
                    })
                    .then(user => {
                        const commentSection = document.createElement('div');
                        commentSection.className = 'comment-section';
    
                        const commentHeader = document.createElement('div');
                        commentHeader.className = 'comment-header';
                        commentHeader.innerHTML = `<strong>${user.firstName}</strong>`;
                        
                        const likeContainer = document.createElement("div");
                        likeContainer.className = "like-container";

                        const likeText = document.createElement('div');
                        likeText.className = "like-text";
                        likeText.innerText = comment.likes.length;
                        const likeButton = document.createElement('button');
                        likeButton.className = 'like-button';
                        likeButton.innerText = 'Like';
                        const token = localStorage.getItem('token');
                        const commentData = {}
    
                        const commentText = document.createElement('div');
                        commentText.className = 'comment-text';
                        commentText.innerText = comment.contenu;

                        likeContainer.appendChild(likeText);
                        likeContainer.appendChild(likeButton);
                        commentHeader.appendChild(likeContainer);
    
                        commentSection.appendChild(commentHeader);
                        commentSection.appendChild(commentText);
    
                        container.prepend(commentSection);

                        likeButton.onclick = function () {
                            if (!comment._id) {
                                console.error("Le commentaire suivant n'a pas d'ID :", comment);
                            }
                            fetch(apiURL+"/comments/like-comment/"+comment._id, { 
                                method: 'PATCH',
                                headers: {
                                    'Content-Type': 'application/json',
                                    "Authorization": `Bearer ${token}`
                                },
                                body: JSON.stringify(commentData)
                            })
                            .then(response => response.json())
                            .then(data => {
                                console.log("Réponse du serveur :", data);
                                fetchComment();
                            })
                            .catch(error => {
                                console.error("Erreur lors du like du commentaire", error);
                            })
                            
                        };
                    })

                });
            }
        })
}

// Fonction pour envoyer un nouveau Produit à l'API
document.addEventListener('DOMContentLoaded', function() {
    const button = document.getElementById('add-comment-button');
    if (button) {
        button.addEventListener('click', function() {
            const textarea = document.getElementById('new-comment-textarea');
            const newCommentText = textarea.value;

            if (newCommentText.trim() !== '') {
                const commentData = {
                    contenu: newCommentText
                };
                const token = localStorage.getItem('token');
                fetch(apiURL+'/comments', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                        "Authorization": `Bearer ${token}`
                    },
                    body: JSON.stringify(commentData)
                })
                    .then(response => response.json())
                    .then(data => {
                        console.log('Commande ajoutée:', data);
                        // Rafraîchir la liste des commandes
                        fetchComment();
                    })
                    .catch(error => {
                        console.error('Erreur lors de l\'ajout de la commande:', error);
                    });
                // Logique pour ajouter le commentaire
                console.log('Nouveau commentaire:', newCommentText);
                textarea.value = ''; // Réinitialiser la zone de texte
            }
        });
    } else {
        console.error("Le bouton avec l'ID 'add-comment-button' n'a pas été trouvé.");
    }
});

// Appel de la fonction pour afficher les commandes lorsque la page est chargée
window.onload = function () {
    fetchComment();
};

