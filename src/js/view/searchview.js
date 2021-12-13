import { elements } from "./base";

//private function
const renderRecipe = recipe =>{
    const markup=`
        <li>
            <a class="results__link results__link--active" href="${recipe.recipe_id}">
                <figure class="results__fig">
                    <img src="${recipe.image_url}" alt="Test">
                </figure>
                <div class="results__data">
                    <h4 class="results__name">${recipe.title}</h4>
                    <p class="results__author">${recipe.publisher}</p>
                </div>
            </a>
        </li>
    `;
    elements.resultsList.insertAdjacentHTML('beforeend', markup);
}
export const clearSearch = () =>{
    elements.searchInput.value="";
}
export const clearSearchQuery = () =>{
    elements.resultsList.innerHTML="";
}
export const getInput= () =>{
    return elements.searchInput.value;
} 
export const renderRecipes = recipes =>{
    recipes.forEach(el => renderRecipe(el));
} 
