
import { toggleAdminMode } from "../utils/editionModeManager.js";


export function renderWorks(workList) {
    const gallery = document.querySelector(".gallery");

    gallery.innerHTML = "";

    for (const work of workList) {
        const card = document.createElement("card");
        card.dataset.id = work.id;
        card.dataset.categoryId = work.categoryId;

        const cardImg = document.createElement("img");
        cardImg.src = work.imageUrl;
        cardImg.alt = work.title;
        card.appendChild(cardImg);

        const cardCapture = document.createElement("cardCapture");
        cardCapture.innerText = work.title;
        card.appendChild(cardCapture);
        gallery.appendChild(card);

    }
}

export function createFilterButton(categories, works) {

    const filterGalleryDiv = document.getElementById("filterGalleryId");
    const gallery = document.querySelector(".gallery");

    filterGalleryDiv.innerHTML = "";

    const authToken = localStorage.getItem("authToken");
    // Si connecter suppression des boutons filtre.
    if (authToken) {
        filterGalleryDiv.style.display = "none"
    } else {
        filterGalleryDiv.style.display = "flex"
    }

    toggleAdminMode();

    //affiche bouton tous si il y a minimun 2 categories.
    if (categories.length >= 2) {
        const filterButton = document.createElement("button");
        filterButton.innerHTML = "Tous";
        filterButton.className = "filterGallery-btn filterAll";
        filterGalleryDiv.appendChild(filterButton);

        filterButton.addEventListener('click', function () {
            gallery.innerHTML = ""
            renderWorks(works);
        });
    }
    for (const category of categories) {
        const filterAllButton = document.createElement("button");
        filterAllButton.innerHTML = category.name;
        filterAllButton.dataset.id = category.id;
        filterAllButton.className = "filterGallery-btn filter" + category.id;
        filterGalleryDiv.appendChild(filterAllButton);

        filterAllButton.addEventListener('click', function () {
            const categoryId = category.id;
            gallery.innerHTML = ""
            if (categoryId === "Tous") {
                renderWorks(works); // Affichez tous les éléments.
            } else {
                const filteredWorks = works.filter(work => work.categoryId === categoryId);
                renderWorks(filteredWorks);
            }
        });
    }
}







