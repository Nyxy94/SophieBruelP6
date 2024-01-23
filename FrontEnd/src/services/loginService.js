export function validateForm() {
    const loginForm = document.getElementById("loginForm")
    loginForm.addEventListener("submit", function (event) {
        event.preventDefault();

        // Création de l'objet de la connexion.
        const login = {
            email: event.target.querySelector("[name=email]").value,
            password: event.target.querySelector("[name=password]").value,
        };

        // Création de la charge utile au format JSON.
        const chargeUtile = JSON.stringify(login);

        // Envoi de la requête POST au serveur.
        fetch("http://localhost:5678/api/users/login", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: chargeUtile
        })
            .then(response => {
                //ok=200 donc connecté.
                if (response.ok) {
                    return response.json();
                } else {
                    alert("Identifiants incorrects. Veuillez réessayer.");
                }
            })
            .then(data => {
                // Stocker le token dans le localStorage du navigateur.
                localStorage.setItem("authToken", data.token);

                // Rediriger l'utilisateur vers la page d'accueil.
                window.location.href = "/Portfolio-architecte-sophie-bluel/FrontEnd/index.html";
            })
    });
}
