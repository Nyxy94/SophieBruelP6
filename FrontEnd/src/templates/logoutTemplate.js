export function hiddenButton(authToken) {
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


export function hiddenEditionBar(authToken) {
    const editionBar = document.getElementById("editionBar")
    if (authToken) {
        editionBar.style.display = "flex";
    } else {
        editionBar.style.display = "none";
    }
}
