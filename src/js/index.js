require("@babel/polyfill");
import search from "./model/Search";
import Recipe from "./model/recipe";
import { elements, renderLoader,clearLoader} from "./view/base";
import * as searchView from "./view/searchview";
import {renderRecipe, clearRecipe, hightSelectedRecipe} from './view/recipeview';
import List from "./model/List";
import * as listView from './view/listView';
import Like from "./model/like";
import * as likeView from './view/likeView';

const state = {};
//хайх контроллер
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

//жорын контроллр
const controlRecipe = async() =>{
    //url id salgaj avah
    let id = window.location.hash.replace("#",'');
    
    if(id){
        state.Recipe = new Recipe(id);
        clearRecipe();
        renderLoader(elements.recipeDiv);
        await state.Recipe.getRecipe();
        hightSelectedRecipe(id);
        clearLoader();
        state.Recipe.calcttime();
        state.Recipe.calcHuniitoo();
        renderRecipe(state.Recipe, state.likes.isLiked(id));
    }

    //console.log(state.Recipe);
};
['hashchange','load'].forEach(event =>window.addEventListener(event, controlRecipe));
// window.addEventListener('hashchange',controlRecipe);
window.addEventListener('load', e =>{
    //web dunguj achaalagdhad 
    if(!state.likes) {state.likes = new Like();}
    likeView.togglelikeMenu(state.likes.getNumberOfLikes());
    state.likes.likes.forEach(like => likeView.renderLike(like));
});

//найрлаганы контроллер
const controlList = async() =>{
    state.list = new List();
    window.tt = state.list;
    listView.clearItems();
    state.Recipe.ingredients.forEach(n =>{
        const item = state.list.addItem(n);
        listView.renderItem(item);
    });
    //console.log(state.Recipe.ingredients);
    
};

elements.recipeDiv.addEventListener('click', e =>{
    if(e.target.matches('.recipe__btn, .recipe__btn *')){
        controlList();
    }else if(e.target.matches('.recipe__love, .recipe__love *')){ //* n recipe__love class t baigaa bugdenden hamaatai gesen ug
        controlLike();
    }

});
const controlLike = () =>{
    if(!state.likes) {state.likes = new Like();}
    const currentRecipeid = state.Recipe.id;
    if(state.likes.isLiked(currentRecipeid)){
        state.likes.deleteLike(currentRecipeid);
        likeView.togglelikeBtn(false);
        likeView.deleteLike(currentRecipeid);
    }else{
        const newLike = state.likes.addLike(currentRecipeid,state.Recipe.title,state.Recipe.publisher,state.Recipe.image_url);
        likeView.renderLike(newLike);
        likeView.togglelikeBtn(true);
    }
    likeView.togglelikeMenu(state.likes.getNumberOfLikes());
    //console.log(state.likes);
}

elements.shoppingList.addEventListener('click', e =>{
    const id = e.target.closest('.shopping__item').dataset.itemid;
    const delbtn = e.target.closest('.shopping__delete');
    if(delbtn){
        state.list.deleteItem(id);
        listView.deleteItem(id);
    }
});
