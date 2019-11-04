// Global app controller
import Search from './models/Search';
import Recipe from './models/Recipe';
import List from './models/List';
import Likes from './models/Likes';
import * as searchView from './views/searchView';
import * as recipeView from './views/recipeView';
import * as listView from './views/listView';
import * as likesView from './views/likesView';
import { elements, renderLoader, clearLoader } from './views/base';
// Global state of app
// - Search object
// - Current recipe object
// - Shopping list object
// - Liked recipes
const state = {};

/*
    SEARCH CONTROLLER
*/
const controlSearch = async () => {
    // get query from view
    const query = searchView.getInput();
    if (query){
        // new search object and add to state
        state.search = new Search(query);

        // prepare UI for results
        searchView.clearInput();
        searchView.clearResults();
        renderLoader(elements.searchResult);

        try {
            // search for recipes
            await state.search.getResults();

            // render results on UI
            clearLoader();
            searchView.renderResults(state.search.result);
        } catch(err){
            console.log(err);
            clearLoader();
        }
        
    }
};

elements.searchForm.addEventListener('submit', e => {
    e.preventDefault();
    controlSearch();
});

elements.searchResultPages.addEventListener('click', e => {
    const btn = e.target.closest('.btn-inline');
    if(btn){
        const goToPage = parseInt(btn.dataset.goto, 10);
        searchView.clearResults();
        searchView.renderResults(state.search.result, goToPage);
        console.log(goToPage);
    }
    
});

/*
    RECIPE CONTROLLER
*/
const controlRecipe = async () => {
    // Get ID from URL
    const id = window.location.hash.replace('#', '');
    console.log(id);

    if(id){
        // prepare ui for changes
        recipeView.clearRecipe();
        renderLoader(elements.recipe);
        
        // highlight selected search item
        if(state.search) searchView.highlightSelected(id);

        // create new recipe object
        state.recipe = new Recipe(id);

        try {
            // get recipe data & parse ingredients
            await state.recipe.getRecipe();
            state.recipe.parseIngredients();
            // calc time & servings
            state.recipe.calcTime();
            state.recipe.calcServings();

            // render the recipe to UI
            clearLoader();
            recipeView.renderRecipe(state.recipe, state.likes.isLiked(id));
        } catch(err){
            console.log(err);
        }
    }
};

// Runs same function for two different events
['hashchange', 'load'].forEach(event => window.addEventListener(event, controlRecipe));

/*
    LIST CONTROLLER
*/

const controlList = () => {
    // create new list if none exists
    if(!state.list) state.list = new List();

    // add each ingredient to the list and UI
    state.recipe.ingredients.forEach(el => {
        const item = state.list.addItem(el.count, el.unit, el.ingredient);
        listView.renderItem(item);
    });
};

// handle delete and update list item events

elements.shopping.addEventListener('click', e => {
    const id = e.target.closest('.shopping__item').dataset.itemid;

    // handle delete
    if(id){
        if(e.target.matches('.shopping__delete', '.shopping__delete *')){
            // delete from state
            state.list.deleteItem(id);

            // delete from list
            listView.deleteItem(id);
        }
    } else if (e.target.matches('.shopping__count-value')){
        const val = parseFloat(e.target.value);
        state.list.updateCount(id, val);
    }
});

/*
    LIKES CONTROLLER
*/

const controlLike = () => {
    // if likes doesnt exist create it
    if(!state.likes) state.likes = new Likes();
    const currentID = state.recipe.id;
    
    // user has not liked recipe yet
    if(!state.likes.isLiked(currentID)){
        // add like to state
        const newLike = state.likes.addLike(
            currentID, 
            state.recipe.title, 
            state.recipe.author, 
            state.recipe.img
        );

        // toggle like button
        likesView.toggleLikeBtn(true);

        // add like to UI list
        likesView.renderLike(newLike);

    // user has liked current recipe    
    } else {
        // remove like from state
        state.likes.deleteLike(currentID);

        // toggle like button
        likesView.toggleLikeBtn(false);

        // remove like from UI list
        likesView.deleteLike(currentID);
    }

    likesView.toggleLikeMenu(state.likes.getNumLikes());
};

// restore liked recipes on page load
window.addEventListener('load', () => {
    state.likes = new Likes();

    // restore likes
    state.likes.readStorage();

    // toggle like menu button
    likesView.toggleLikeMenu(state.likes.getNumLikes());

    // render existing likes
    state.likes.likes.forEach(like => likesView.renderLike(like));
});

////////////////////////////////////////////////////////////////

// recipe buttons
elements.recipe.addEventListener('click', e => {
    if(e.target.matches('.btn-decrease, .btn-decrease *')){
        // Decrease button is clicked
        if(state.recipe.servings > 1){
            state.recipe.updateServings('dec');
            recipeView.updateServingsIngredients(state.recipe);
        }
    } else if (e.target.matches('.btn-increase, .btn-increase *')) {
        // Increase button is clicked
        state.recipe.updateServings('inc');
        recipeView.updateServingsIngredients(state.recipe);
    } else if (e.target.matches('.recipe__btn--add, .recipe__btn--add *')){
        // add ingredients to shopping list
        controlList();
    } else if(e.target.matches('.recipe__love, .recipe__love *')){
        // like controller
        controlLike();
    }
});

