export function hiddenButton(authToken) {
    const logoutButton = document.getElementById("logoutButton");
    const loginButton = document.getElementById("logIn");

    if (authToken) {
        logoutButton.hidden = false
        loginButton.hidden = true
    } else {
        logoutButton.hidden = true
        loginButton.hidden = false
    }
}