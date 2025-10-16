// API KEY
const apiKey = '7faa468959bc42db97213697c3a64e13';

const loaderContainer = document.querySelector('.loader-container'); 
const searchForm = document.querySelector('.search-bar');
const searchInput = searchForm.querySelector('input');
const resultsContainer = document.querySelector('.grid-container');
const resultsTitle = document.querySelector('.recipe-grid h2');
const filterButtons = document.querySelectorAll('.filter-btn');
const refreshButton = document.getElementById('refresh-recipes-btn');


searchForm.addEventListener('submit', function(event) {
    event.preventDefault(); 
    const ingredients = searchInput.value;
    
    if (!ingredients.trim()) {
        alert('Please enter at least one ingredient.');
        return;
    }
    
    searchRecipes(ingredients);
});

async function searchRecipes(ingredients) {
    resultsTitle.textContent = 'Searching recipes...';
    resultsContainer.style.display = 'none';

    loaderContainer.classList.add('show-loader');
    const apiUrl = `https://api.spoonacular.com/recipes/findByIngredients?apiKey=${apiKey}&ingredients=${ingredients}&number=9`; //&addRecipeInformation=true

    try {
        const response = await fetch(apiUrl);

        if (!response.ok) {
            throw new Error(`Error in the request: ${response.status}`);
        }
        const recipes = await response.json();
        
        resultsContainer.innerHTML = ''; 
        showRecipes(recipes);
        

    } catch (error) {
        console.error('Error searching for recipes:', error);
        resultsTitle.textContent = 'Error searching for recipes. Please try again.'; 
        resultsContainer.innerHTML = '';
    }finally{
        loaderContainer.classList.remove('show-loader');
        resultsContainer.style.display = 'grid';
    }
}


function showRecipes(recipes) {
    if (recipes.length === 0) {
        resultsTitle.textContent = 'We didn\'t find a recipe, try again with other ingredients! 🧑🏻‍🍳';
        return;
    }

    resultsTitle.textContent = 'Search results';
    resultsContainer.innerHTML = ''; 
    //Get favorites list to know which has been saved.
    const favorites = JSON.parse(localStorage.getItem('favoriteRecipes')) || [];

    recipes.forEach(recipe => {
        const recipeCard = document.createElement('div');
        recipeCard.className = 'recipe-card';

        const isFavorite = favorites.some(fav => fav.id === recipe.id);

        const cleanSummary = (recipe.summary || '').replace(/<.*?>/g, "");
        const shortSummary = cleanSummary.substring(0, 100);

        recipeCard.innerHTML = `
            <img src="${recipe.image}" alt="${recipe.title}">
            <div class="card-content">
                <h3>${recipe.title}</h3>
                <p class="recipe-summary">${shortSummary}...</p> 
            </div>
            <div class="card-actions">
                <a href="#" class="btn-view" onclick="getRecipesDetails(${recipe.id})">See Recipe</a>
                <button class="favorite-btn ${isFavorite ? 'active' : ''}" onclick="toggleFavorite(${recipe.id}, '${recipe.title}', '${recipe.image}')">
                    ❤️
                </button>
            </div>
        `;
        resultsContainer.appendChild(recipeCard);
    });
}

function getRecipesDetails(recipeId) {

    localStorage.setItem('selectedRecipeId', recipeId);

    window.location.href = 'recipe.html';
}
//Filter btn

filterButtons.forEach(button => {
    button.addEventListener('click', () => {

        const filterType = button.dataset.filter;
        const filterValue = button.dataset.value;


        filterButtons.forEach(btn => btn.classList.remove('active'));
        button.classList.add('active');
        

        searchFilteredRecipes(filterType, filterValue);
    });
});

async function searchFilteredRecipes(filter, value) {
    resultsTitle.textContent = 'Searching recipes...';
    resultsContainer.innerHTML = '';
    loaderContainer.classList.add('show-loader');

    const apiUrl = `https://api.spoonacular.com/recipes/complexSearch?apiKey=${apiKey}&${filter}=${value}&number=9&addRecipeInformation=true`;

    try {
        const response = await fetch(apiUrl);
        if (!response.ok) throw new Error(`Error: ${response.status}`);
        
        const data = await response.json();

        showRecipes(data.results); 
        

    } catch (error) {
        console.error('Error on filters:', error);
        resultsTitle.textContent = ' Error searching for recipes. Try again! 🧑🏻‍🍳';
    } finally {
        loaderContainer.classList.remove('show-loader');
    }
}

async function fetchRandomRecipes() {
    resultsTitle.textContent = 'Getting fresh recipes 🥰...'; 
    resultsContainer.style.display = 'none';
    loaderContainer.classList.add('show-loader');
    //ENDPOINT RANDOM
    const apiUrl = `https://api.spoonacular.com/recipes/random?apiKey=${apiKey}&number=3`;

    try {
        const response = await fetch(apiUrl);
        if (!response.ok) throw new Error(`Error: ${response.status}`);
        
        const data = await response.json();
        
        resultsContainer.innerHTML = '';
        showRecipes(data.recipes);
        
        resultsTitle.textContent = 'Featured Recipes';

    } catch (error) {
        console.error('Error searching random recipes:', error);
        resultsTitle.textContent = 'Could not load recipes. 🥺';
    } finally {
        loaderContainer.classList.remove('show-loader');
        resultsContainer.style.display = 'grid';
    }
}

document.addEventListener('DOMContentLoaded', () => {
    fetchRandomRecipes(); 
});

refreshButton.addEventListener('click', () => {
    fetchRandomRecipes(); 
});



function toggleFavorite(recipeId, recipeTitle, recipeImage) {
    let favorites = JSON.parse(localStorage.getItem('favoriteRecipes')) || [];

    const recipeIndex = favorites.findIndex(fav => fav.id === recipeId);

    const favoriteButton = event.target;

    if (recipeIndex > -1) {
        // If recipe is on favorites, quit the recipe
        favorites.splice(recipeIndex, 1);
        favoriteButton.classList.remove('active');
        console.log(`${recipeTitle} removed from favorites.`);
    } else {
        favorites.push({ id: recipeId, title: recipeTitle, image: recipeImage });
        favoriteButton.classList.add('active');
        console.log(`${recipeTitle} added to favorites.`);
    }

    localStorage.setItem('favoriteRecipes', JSON.stringify(favorites));
}