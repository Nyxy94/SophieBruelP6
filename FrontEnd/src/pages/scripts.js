import { renderWorks, createFilterButton } from "../templates/worksTemplate.js";
import { displayModalWorks, updateCategoryDropdown, validatePicture } from "../templates/modalTemplate.js";
import { getWorks } from "../services/worksService.js";
import { getCategories } from "../services/categoriesService.js";



let works = await getWorks();
renderWorks(works);
displayModalWorks(works);
validatePicture(works);

let categories = await getCategories();
createFilterButton(categories, works);

console.log(works);



const logoutButton = document.getElementById("logoutButton");
logoutButton.addEventListener("click", async function (event) {
    localStorage.removeItem("authToken");
    window.location.href = "/index.html";
});


updateCategoryDropdown();




