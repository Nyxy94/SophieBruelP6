function hiddenButton(authToken) {
    const logoutButton = document.getElementById("logoutButton");
    const loginButton = document.getElementById("logIn");

    // gere l'affichage des buttons login et logout par rapport a la connexion.
    if (authToken) {
        logoutButton.hidden = false
        loginButton.hidden = true
    } else {
        logoutButton.hidden = true
        loginButton.hidden = false
    }
}

function hiddenEditionBar(authToken) {
    const editionBar = document.getElementById("editionBar")
    if (authToken) {
        editionBar.style.display = "flex";
    } else {
        editionBar.style.display = "none";
    }
}

function hiddenEditionButton(authToken) {
    const editButton = document.getElementById("editButton")
    if (authToken) {
        editButton.hidden = false;
    } else {
        editButton.hidden = true;
    }
}

export function toggleAdminMode() {
    const authToken = localStorage.getItem("authToken");
    hiddenButton(authToken);
    hiddenEditionBar(authToken);
    hiddenEditionButton(authToken);
}