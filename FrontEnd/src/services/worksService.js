export async function getWorks() {
    const response = await fetch("http://localhost:5678/api/works");
    const works = await response.json();
    return works;
}

export async function deleteWorks(id) {
    const authToken = localStorage.getItem("authToken");
    const response = await fetch("http://localhost:5678/api/works/" + id, {
        method: "DELETE",
        headers: {
            Accept: "application/json;charset=utf-8",
            Authorization: `Bearer ${authToken}`,
        }
    });
   
    return response;
}

export async function addWorks(formData) {
    const authToken = localStorage.getItem("authToken");

    // Envoyer la requête POST
    const response = await fetch("http://localhost:5678/api/works", {
        method: "POST",
        headers: {
            Accept: "application/json;charset=utf-8",
            Authorization: `Bearer ${authToken}`,
        },
        body: formData,
    });

    if (response.ok) {
        console.log("Travail ajouté avec succès !");

        // Si la requête est réussie, récupérer la liste mise à jour des travaux
        const updatedWorks = await getWorks();
        
        return updatedWorks;  // Retourner la liste mise à jour des travaux
    } else {
        console.error("Erreur lors de l'ajout du travail.");
        throw new Error("Erreur lors de l'ajout du travail.");
    }
}
