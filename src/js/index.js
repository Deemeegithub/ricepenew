require("@babel/polyfill");
import search from "./model/Search";
import Recipe from "./model/recipe";
import { elements, renderLoader,clearLoader} from "./view/base";
import * as searchView from "./view/searchview";
const state = {};
const controlSearch = async () => {
    const query = searchView.getInput();
    if(query){
        state.search = new search(query);

        searchView.clearSearch();
        searchView.clearSearchQuery();

        renderLoader(elements.searchRes);

        await state.search.doSearch();
        clearLoader();

        if(state.search.result){
            searchView.renderRecipes(state.search.result);
        }else{alert("Хайлтаар илэрцгүй.");}
    }
}
elements.searchForm.addEventListener('submit', e =>{
    e.preventDefault(); //default ulidluudiin zogsoon
    controlSearch();
});
elements.pageButtons.addEventListener('click', e =>{

    const btn = e.target.closest('.btn-inline'); //closest function n hamgiin oir darsan tovch ugdug function
    if(btn){
       searchView.clearSearchQuery();
       searchView.renderRecipes(state.search.result,parseInt(btn.dataset.pagenum));
    }
});

const r = new Recipe(47746);
r.getRecipe();