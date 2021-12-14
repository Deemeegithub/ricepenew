import { elements } from "./base";

//private function
const renderRecipe = recipe =>{
    const markup=`
        <li>
            <a class="results__link" href="${recipe.recipe_id}">
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
    elements.pageButtons.innerHTML="";
}
export const getInput= () =>{
    return elements.searchInput.value;
} 
export const renderRecipes = (recipes, page = 1, resPerPage = 7) =>{
    const start = (page-1) * resPerPage;
    const end = page * resPerPage;
    console.log(recipes);
    recipes.slice(start,end).forEach(el => renderRecipe(el));

    const totalPages = Math.ceil(recipes.length / resPerPage);

    renderButtons(page,totalPages);
};
// type n 'prev', 'next' ali negiin damjuulna
const createButton =(page,type,direction)=>{
    return `
        <button class="btn-inline results__btn--${type}" data-pagenum=${page}>
            <svg class="search__icon">
                <use href="img/icons.svg#icon-triangle-${direction}"></use>
            </svg>
            <span>Хуудас ${page}</span>
        </button>
    `;
};
const renderButtons = (currentPage, totalPages)=>{
    let buttonHtml;
    if(currentPage === 1 && totalPages >1){
        buttonHtml = createButton(2,"next","right");
    }else if(currentPage < totalPages){
        buttonHtml = createButton(currentPage-1,"prev","left");
        buttonHtml += createButton(currentPage+1,"next","right");

    }else if(currentPage === totalPages){
        buttonHtml = createButton(currentPage-1,"prev","left");
    }
    elements.pageButtons.insertAdjacentHTML('afterbegin', buttonHtml);
};


