import { deleteWorks, addWorks, getWorks } from "../services/worksService.js"
import { getCategories } from "../services/categoriesService.js"
import { renderWorks } from "./worksTemplate.js";

const validateButton = document.getElementById("validatePicture");
const inputTitle = document.querySelector("#inputTitle");
const selectorCategory = document.querySelector("#selectorCategory");
const inputGhost = document.querySelector("#inputGhostButton");
const containerAddPicture = document.querySelector(".containerAddPicture");
const statiqueContent = document.querySelector(".statiqueContent");
const maxSize = 4 * 1024 * 1024;

let file;

const formData = new FormData();
let modal = null;
let currentImageElement = null;

function openModal(e) {
    e.preventDefault();
    const targetElement = e.target.getAttribute("href");
    const newModal = document.querySelector(targetElement);

    //verifie si un modal doit etre ouvert.
    if (targetElement === "#modal1" || targetElement === "#modal2") {
        //Si un modal est deja ouvert, il est fermer avant d'en ouvrir un autre.
        if (modal !== null) {

            closeModal();
        }
        modal = newModal;
        modal.style.display = null;
        modal.removeAttribute("aria-hidden");
        modal.setAttribute("aria-modal", "true");
        modal.addEventListener("click", closeModal);
        modal.querySelector(".js-modal-close").addEventListener("click", closeModal);
        modal.querySelector(".js-modal-stop").addEventListener("click", stopPropagation);

        const arrowBackButton = modal.querySelector(".js-arrow-back");
        if (arrowBackButton) {
            arrowBackButton.addEventListener("click", function () {
                //Ferme le modal actuel
                closeModal();
                //Ouvre le premier modal avec des valeurs spécifiques.
                openModal({
                    preventDefault: () => { },
                    target: { getAttribute: () => "#modal1" }
                });
            });
        }

    }
}

function closeModal() {
    //Verifie si un modal est ouvert
    if (modal === null) {
        return;
    }
    resetFormFields();

    modal.style.display = "none";
    modal.setAttribute("aria-hidden", "true");
    modal.removeAttribute("aria-modal");
    modal.removeEventListener("click", closeModal);
    modal.querySelector(".js-modal-close").removeEventListener("click", closeModal);
    modal.querySelector(".js-modal-stop").removeEventListener("click", stopPropagation);
    // Réinitialise la variable associée à la modalité fermée à null
    modal = null;
}

function stopPropagation(e) {
    e.stopPropagation()
}

document.querySelectorAll(".js-modal").forEach(a => {
    a.addEventListener("click", openModal)
});

window.addEventListener("keydown", function (e) {
    if (e.key === "Escape" || e.key === "Esc") {
        closeModal(e)
    }
});

export function displayModalWorks(workList) {
    const galleryModal = document.querySelector(".gallery-modal");
    galleryModal.innerHTML = ""
    for (const work of workList) {
        const cardModal = document.createElement("card");
        cardModal.dataset.id = work.id;
        cardModal.dataset.categoryId = work.categoryId;
        cardModal.style.width = "78.12px"
        cardModal.style.height = "104px"

        const cardImgModal = document.createElement("img");
        cardImgModal.src = work.imageUrl;
        cardImgModal.alt = work.title;
        cardImgModal.style.width = "78.12px"
        cardImgModal.style.height = "104px"
        cardModal.appendChild(cardImgModal);

        const trashIcon = document.createElement("i");
        trashIcon.classList.add("fa-solid", "fa-trash-can");
        cardModal.appendChild(trashIcon);
        galleryModal.appendChild(cardModal);

        trashIcon.addEventListener("click", async () => {
            try {
                // Demande de confirmation avant la suppression
                const userConfirmed = window.confirm("Êtes-vous sûr de vouloir supprimer ce travail ?");

                if (userConfirmed) {
                    await deleteWorks(work.id);
                    await refreshWorks();
                    renderWorks(await getWorks()); // Met à jour la galerie principale après la suppression
                } else {
                    console.log("Suppression annulée par l'utilisateur.");
                }
            } catch (error) {
                console.error("Error deleting or refreshing works:", error);
            }
        });
    }
}

async function refreshWorks() {
    let works = await getWorks();
    displayModalWorks(works);
}

function addPicture() {
    // Supprimer l'ancienne image actuelle avant d'ajouter la nouvelle
    if (currentImageElement) {
        currentImageElement.remove();
    }

    inputGhost.value = null; // Réinitialiser la valeur du champ d'entrée pour déclencher l'événement change à chaque fois

    // Fonction pour traiter l'événement de changement d'image
    const handleImageChange = (event) => {
        file = event.target.files[0];

        if (file.size > maxSize) {
            alert("L'image ne doit pas dépasser 4 Mo.");
            return;
        }
        if (!["image/png", "image/jpeg"].includes(file.type)) {
            alert("Le format de l'image doit être PNG ou JPEG.");
            return;
        }
        formData.append("image", file);
        statiqueContent.style.display = "none";

        // Créer la nouvelle image
        const newImageElement = document.createElement("img");
        newImageElement.alt = 'Uploaded picture';
        newImageElement.style.width = "129px";
        newImageElement.style.height = "193px";
        newImageElement.classList.add("image-position");
        newImageElement.src = URL.createObjectURL(file);
        containerAddPicture.appendChild(newImageElement);

        // Mettre à jour la référence de l'image actuelle
        currentImageElement = newImageElement;

        // Supprimer l'écouteur d'événement après le traitement initial
        inputGhost.removeEventListener("change", handleImageChange);
    };
    // Ajouter l'écouteur d'événement
    inputGhost.addEventListener("change", handleImageChange);
    inputGhost.click();
}
document.querySelector('#buttonAddPic').addEventListener('click', addPicture);

export async function updateCategoryDropdown() {
    const selectorCategory = document.getElementById('selectorCategory');
    selectorCategory.innerHTML = '';
    const categories = await getCategories();

    // Ajoute de chaque catégorie comme option dans le menu déroulant
    categories.forEach(category => {
        const option = document.createElement('option');
        option.value = category.id;
        option.textContent = category.name;
        selectorCategory.appendChild(option);
    });
}
// Ajoute d'un écouteur d'événements au label pour déclencher la mise à jour du menu déroulant
document.querySelector('label[for="selectorCategory"]').addEventListener('click', updateCategoryDropdown);

function resetFormFields() {
    // Vérifie si les éléments existent avant de les manipuler
    if (inputTitle && selectorCategory && inputGhost && containerAddPicture) {
        // Réinitialise les valeurs des champs à leur état initial (vide)
        inputTitle.value = "";
        selectorCategory.value = "";

        // Réinitialise l'état du bouton
        updateButtonState();

        // Supprimer l'aperçu de l'image s'il existe
        const uploadedImage = document.querySelector(".image-position");
        if (uploadedImage) {
            uploadedImage.remove();
            file = null;
            statiqueContent.style.display = "flex";
        }

        // Réinitialise l'image après avoir supprimé l'ancienne
        formData.delete("image");

        // Réinitialise la valeur du champ d'entrée
        if (inputGhost) {
            inputGhost.value = null;
        }
    }
}

const updateButtonState = () => {
    validateButton.disabled = !inputTitle.value || !selectorCategory.value || !formData.get("image");
};

export function validatePicture() {

    // Appele de la fonction updateButtonState pour configurer l'état initial du bouton
    updateButtonState();

    // Mise en place des écouteurs d'événements pour les champs.
    inputTitle.addEventListener("input", updateButtonState);
    selectorCategory.addEventListener("input", updateButtonState);

    validateButton.addEventListener("click", async (event) => {
        event.preventDefault();

        const inputTitleValue = inputTitle.value;
        const selectorCategoryValue = selectorCategory.value;

        console.log("Input Title:", inputTitleValue);
        formData.append("title", inputTitleValue);

        console.log("Selected Category:", selectorCategoryValue);
        formData.append("category", selectorCategoryValue);

        try {
            // Appelez addWorks pour ajouter un nouveau travail
            const updatedWorks = await addWorks(formData);

            // Met à jour la galerie avec la liste mise à jour des travaux
            renderWorks(updatedWorks);

            // Réinitialise le formulaire et ferme le modal
            resetFormFields();
            closeModal();
        } catch (error) {
            console.error("Error adding work:", error);
        }
        
    });
}
