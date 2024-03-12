export async function loginUser(login) {
    // Création de la charge utile au format JSON.
    const chargeUtile = JSON.stringify(login);

    // Envoi de la requête POST au serveur.
    return fetch("http://localhost:5678/api/users/login", {
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
                throw new Error("Identifiants incorrects. Veuillez réessayer.");
            }
        });
}


