export const elements = {
    searchForm : document.querySelector('.search'),
    searchInput : document.querySelector('.search__field'),
    resultsList : document.querySelector('.results__list'),
    searchRes : document.querySelector('.results'),
    pageButtons : document.querySelector('.results__pages'),
    recipeDiv : document.querySelector('.recipe'),
    shoppingList : document.querySelector('.shopping__list'),
    listsMenu : document.querySelector('.likes__field'),
    listsList : document.querySelector('.likes__list'),
};
export const elementString = {
    loader: 'loader'//results div dotor uussen loader dev class name n
};
export const renderLoader = parent =>{

    const loader = `
        <div class="${elementString.loader}">
            <svg>
                <use href="img/icons.svg#icon-cw"></use>
            </svg>
        </div>
    `;
    parent.insertAdjacentHTML('afterbegin',loader);
};
export const clearLoader = () =>{

    const loader = document.querySelector(`.${elementString.loader}`);
    if(loader){
        loader.parentElement.removeChild(loader);
    }
};