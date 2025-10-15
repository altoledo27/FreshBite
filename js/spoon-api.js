// API KEY
const apiKey = 'ENTER AN API KEY';

const searchForm = document.querySelector('.search-bar');
const searchInput = searchForm.querySelector('input');
const resultsContainer = document.querySelector('.grid-container');
const resultsTitle = document.querySelector('.recipe-grid h2');

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
    resultsContainer.innerHTML = ''; 

    const apiUrl = `https://api.spoonacular.com/recipes/findByIngredients?apiKey=${apiKey}&ingredients=${ingredients}&number=9`; //&addRecipeInformation=true

    try {
        const response = await fetch(apiUrl);

        if (!response.ok) {
            throw new Error(`Error in the request: ${response.status}`);
        }
        const recipes = await response.json();

        showRecipes(recipes);

    } catch (error) {
        console.error('Error searching for recipes:', error);
        resultsTitle.textContent = 'Error searching for recipes. Please try again.';
    }
}


function showRecipes(recipes) {
    if (recipes.length === 0) {
        resultsTitle.textContent = 'We didn\'t find a recipe, try again with other ingredients! 🧑🏻‍🍳';
        return;
    }

    resultsTitle.textContent = 'Search results';
    resultsContainer.innerHTML = ''; 

    

    recipes.forEach(recipe => {
        const recipeCard = document.createElement('div');
        recipeCard.className = 'recipe-card';

        const cleanSummary = recipe.summary.replace(/<.*?>/g, ""); 
        const shortSummary = cleanSummary.substring(0, 100);

        recipeCard.innerHTML = `
            <img src="${recipe.image}" alt="${recipe.title}">
            <div class="card-content">
                <h3>${recipe.title}</h3>
                
                <p class="recipe-summary">${shortSummary}...</p> 
                
                <a href="#" class="btn-view" onclick="getRecipesDetails(${recipe.id})">See Recipe</a>
            </div>
        `;

        resultsContainer.appendChild(recipeCard);
    });
}



function getRecipesDetails(recipeId) {

    localStorage.setItem('selectedRecipeId', recipeId);

    window.location.href = 'recipe.html';
}