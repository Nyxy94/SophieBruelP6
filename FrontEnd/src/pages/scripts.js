import { renderWorks, createFilterButton } from "../templates/worksTemplate.js";
import { getWorks, getCategories } from "../services/worksService.js";


let works = []; /*retourne liste des travaux*/

let categories = [];


works = await getWorks();
renderWorks(works);

categories = await getCategories();
createFilterButton(categories, works);

console.log(works);


