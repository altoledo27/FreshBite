
const apiKey = '7faa468959bc42db97213697c3a64e13';

window.onload = async function() {

    const recipeId = localStorage.getItem('selectedRecipeId');

    if (!recipeId) {
        alert('No recipe selected. Returning to Home 🫠');
        window.location.href = 'index.html';
        return;
    }

    await fetchRecipeDetails(recipeId);
};

async function fetchRecipeDetails(id) {
    //Check if we have a recipe on localstorage.
    const cachedRecipe = localStorage.getItem(`recipe_${id}`);
    if (cachedRecipe) {
        console.log("Recipe found in cache. Showing saved data.");
        displayRecipeDetails(JSON.parse(cachedRecipe));
        return; 
    }

    console.log("Recipe not found in cache. Searching the API...");
     const apiUrl = `https://api.spoonacular.com/recipes/${id}/information?apiKey=${apiKey}&includeNutrition=true`;

    try {
        const response = await fetch(apiUrl);
        if (!response.ok) {
            throw new Error(`Error: ${response.status}`);
        }
        const recipeData = await response.json();
        //Save the recipe on localStorage (to save points :C)
        localStorage.setItem(`recipe_${id}`, JSON.stringify(recipeData));


        displayRecipeDetails(recipeData);

    } catch (error) {
        console.error('Error getting recipe details:', error);
        document.querySelector('.recipe-header h1').textContent = 'Error loading recipe 🥴';
    }
}

function displayRecipeDetails(recipe) {
    const recipeTitle = document.querySelector('.recipe-header h1');
    const recipeDescription = document.querySelector('.recipe-header p');
    const recipeImage = document.querySelector('.recipe-image');
    const recipeDetailsList = document.querySelector('.details-list');
    const ingredientList = document.querySelector('.ingredient-list');
    const instructionsList = document.querySelector('.instructions-list');
    const nutritionList = document.querySelector('.nutrition-list'); 

    recipeTitle.textContent = recipe.title;
    recipeImage.src = recipe.image;
    recipeImage.alt = recipe.title;


    recipeDescription.innerHTML = recipe.summary ? recipe.summary.replace(/<a href="[^"]*">/g, '').replace(/<\/a>/g, '') : 'No description available.';


    recipeDetailsList.innerHTML = `
        <li><strong>Prep time:</strong> ${recipe.readyInMinutes} minutes</li>
        <li><strong>Portions:</strong> ${recipe.servings}</li>
        <li><strong>Cuisine:</strong> ${recipe.cuisines?.join(', ') || 'No specified'}</li>
    `;

    ingredientList.innerHTML = recipe.extendedIngredients.map(ingredient => 
        `<li>${ingredient.original}</li>`
    ).join('');


    if (recipe.analyzedInstructions && recipe.analyzedInstructions.length > 0) {
        instructionsList.innerHTML = recipe.analyzedInstructions[0].steps.map(step => 
            `<li>${step.step}</li>`
        ).join('');
    } else {
        instructionsList.innerHTML = '<li>No instructions available.</li>';
    }
    const nutrients = recipe.nutrition?.nutrients; 

    if (nutrients && nutrients.length > 0) {
        const calories = nutrients.find(n => n.name === 'Calories');
        const protein = nutrients.find(n => n.name === 'Protein');
        const fat = nutrients.find(n => n.name === 'Fat');
        const carbs = nutrients.find(n => n.name === 'Carbohydrates');

        nutritionList.innerHTML = `
            <li>
                <strong>Calories:</strong> 
                ${calories ? `${calories.amount} ${calories.unit}` : 'N/A'}
            </li>
            <li>
                <strong>Protein:</strong> 
                ${protein ? `${protein.amount} ${protein.unit}` : 'N/A'}
            </li>
            <li>
                <strong>Fat:</strong> 
                ${fat ? `${fat.amount} ${fat.unit}` : 'N/A'}
            </li>
            <li>
                <strong>Carbohydrates:</strong> 
                ${carbs ? `${carbs.amount} ${carbs.unit}` : 'N/A'}
            </li>
        `;
    } else {
        nutritionList.innerHTML = '<li>Nutritional information not available.</li>';
    }
}