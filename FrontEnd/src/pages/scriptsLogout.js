import { renderWorks, createFilterButton } from "../templates/worksTemplate.js";
import { getWorks } from "../services/worksService.js";
import { getCategories } from "../services/categoriesService.js";



const logoutButton = document.getElementById("logoutButton");
logoutButton.addEventListener("click", async function (event) {
    localStorage.removeItem("authToken");
    let works = await getWorks();
    let categories = await getCategories();

    createFilterButton(categories, works);
});


