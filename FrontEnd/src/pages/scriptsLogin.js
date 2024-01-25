import { loginUser } from "../services/loginService.js";


    const loginForm = document.getElementById("loginForm");
    loginForm.addEventListener("submit", function (event) {
        event.preventDefault();

        const login = {
            email: event.target.querySelector("[name=email]").value,
            password: event.target.querySelector("[name=password]").value,
        };

        loginUser(login)
            .then(data => {
                localStorage.setItem("authToken", data.token);
                
                window.location.href = "/index.html";
                
            })
            .catch(error => console.error(error));
   
});







