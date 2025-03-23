const apiURL = "http://127.0.0.1:5500"

// Fonction pour envoyer une nouvelle commande à l'API
document.getElementById('addClientForm').addEventListener('submit', function (e) {
    e.preventDefault();

    const firstName = document.getElementById('firstName2').value;
    const lastName = document.getElementById('lastName2').value;
    const email = document.getElementById('email2').value;
    const adresse = document.getElementById('adresse2').value;
    const city = document.getElementById('city2').value;
    const password = document.getElementById('password2').value;

    const clientData = {
        lastName: lastName,
        firstName: firstName,
        email: email,
        adresse: adresse,
        city: city,
        password: password
    };

    fetch(apiURL+'/user/register', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(clientData)
    })
        .then(response => response.json())
        .then(data => {
            console.log('Client ajoutée:', data);
        })
        .catch(error => {
            console.error('Erreur lors de l\'ajout du produit:', error);
        });
});

document.getElementById("loginForm").addEventListener("submit", async (e) => {
    e.preventDefault();

    const email = document.getElementById("email1").value;
    const password = document.getElementById("password1").value;

    const res = await fetch(apiURL+"/user/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
    });

    const data = await res.json();
    if (data.token) {
        localStorage.setItem("token", data.token);

        // Décoder le token pour récupérer le rôle
        const payload = JSON.parse(atob(data.token.split(".")[1]));
        localStorage.setItem("role", payload.role);

        alert("Connexion réussie !");
        window.location.href = "index.html";
    } else {
        alert("Erreur : " + data.msg);
    }
});

