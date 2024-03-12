import { loginUser } from "../services/loginService.js";


const loginForm = document.getElementById("loginForm");


//Fonction de validation de l'email.
function validateEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

//Fonction de validation du mot de passe.
function validatePassword(password) {
    return password.length >= 4;
}

//Fonction pour afficher un message d'erreur.
function displayErrorMessage(message, errorElement) {
    errorElement.textContent = message;
}

loginForm.addEventListener("submit", function (event) {
    event.preventDefault();

    const emailInput = event.target.querySelector("[name=email]");
    const passwordInput = event.target.querySelector("[name=password]");

    const email = emailInput.value;
    const password = passwordInput.value;

    const emailError = document.getElementById("emailError");
    const passwordError = document.getElementById("passwordError");

    // Réinitialiser les messages d'erreur
    emailError.textContent = "";
    passwordError.textContent = "";

    // Validation de l'adresse e-mail
    if (!validateEmail(email)) {
        displayErrorMessage("Adresse e-mail ou mot de passe non valide", emailError);
        return;
    }

    // Validation du mot de passe
    if (!validatePassword(password)) {
        displayErrorMessage("Adresse e-mail ou mot de passe non valide", passwordError);
        return;
    }

    const login = {
        email: email,
        password: password,
    };

    // Appel de la fonction loginUser() et traitement des résultats
    loginUser(login)
        .then(data => {
            localStorage.setItem("authToken", data.token);
            window.location.href = "/index.html";
            
        })
        .catch(error => {
            displayErrorMessage(error.message, emailError);
        });
});













