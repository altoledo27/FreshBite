
document.addEventListener('DOMContentLoaded', () => {
    const favoritesGrid = document.getElementById('favorites-grid');

    const favorites = JSON.parse(localStorage.getItem('favoriteRecipes')) || [];

    if (favorites.length === 0) {
        favoritesGrid.innerHTML = '<p>You haven\'t saved any recipes yet. Browse and save the ones you like best!</p>';
        return;
    }
    favorites.forEach(recipe => {
        const recipeCard = document.createElement('div');
        recipeCard.className = 'recipe-card';
        recipeCard.innerHTML = `
            <img src="${recipe.image}" alt="${recipe.title}">
            <div class="card-content">
                <h3>${recipe.title}</h3>
            </div>
            <div class="card-actions">
                <a href="#" class="btn-view" onclick="viewRecipeDetails(${recipe.id})">See recipe</a>
            </div>
        `;
        favoritesGrid.appendChild(recipeCard);
    });
});

function viewRecipeDetails(recipeId) {
    localStorage.setItem('selectedRecipeId', recipeId);
    window.location.href = 'recipe.html';
}

// HAM MENU
const myButton = document.getElementById('myButton');
const navMenu = document.getElementById('animateme');

myButton.addEventListener('click', () => {
    myButton.classList.toggle('open');
    navMenu.classList.toggle('open');
});