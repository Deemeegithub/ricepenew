require("@babel/polyfill");
import search from "./model/Search";
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