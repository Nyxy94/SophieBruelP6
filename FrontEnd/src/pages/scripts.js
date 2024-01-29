import { renderWorks, createFilterButton } from "../templates/worksTemplate.js";
import { editionBar } from "../templates/modalTemplate.js";
import { getWorks } from "../services/worksService.js";
import { getCategories } from "../services/categoriesService.js";



let works = await getWorks();
renderWorks(works);

let categories = await getCategories();
createFilterButton(categories, works);

console.log(works);




