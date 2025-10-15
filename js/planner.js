document.addEventListener('DOMContentLoaded', () => {
    const draggableRecipesContainer = document.getElementById('draggable-recipes');
    const calendarGrid = document.getElementById('calendar-grid');

    const favoriteRecipes = JSON.parse(localStorage.getItem('favoriteRecipes')) || [];

    if (favoriteRecipes.length === 0) {
        draggableRecipesContainer.innerHTML = '<p>Save recipes to your favorites so you can plan them🧃.</p>';
    } else {
        favoriteRecipes.forEach(recipe => {
            const recipeEl = document.createElement('div');
            recipeEl.className = 'draggable-recipe';
            recipeEl.draggable = true;
            recipeEl.dataset.recipeId = recipe.id; 

            recipeEl.innerHTML = `
                <img src="${recipe.image}" alt="${recipe.title}">
                <span>${recipe.title}</span>
            `;
            draggableRecipesContainer.appendChild(recipeEl);
            

            recipeEl.addEventListener('dragstart', (e) => {
                e.dataTransfer.setData('text/plain', JSON.stringify(recipe));
                setTimeout(() => recipeEl.classList.add('dragging'), 0);
            });

            recipeEl.addEventListener('dragend', () => {
                recipeEl.classList.remove('dragging');
            });
        });
    }
    //Calendar
    const daysOfWeek = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];
    daysOfWeek.forEach(day => {
        const dayEl = document.createElement('div');
        dayEl.className = 'calendar-day';
        dayEl.dataset.day = day; 
        dayEl.innerHTML = `<h4>${day}</h4><div class="day-content"></div>`;
        calendarGrid.appendChild(dayEl);


        dayEl.addEventListener('dragover', (e) => {
            e.preventDefault();
            dayEl.classList.add('drag-over');
        });


        dayEl.addEventListener('dragleave', () => {
            dayEl.classList.remove('drag-over');
        });

        dayEl.addEventListener('drop', (e) => {
            e.preventDefault();
            dayEl.classList.remove('drag-over');

            const recipeData = JSON.parse(e.dataTransfer.getData('text/plain'));
            const dayContent = dayEl.querySelector('.day-content');
            

            const plannedRecipeEl = document.createElement('div');
            plannedRecipeEl.className = 'draggable-recipe'; 
            plannedRecipeEl.innerHTML = `
                <img src="${recipeData.image}" alt="${recipeData.title}">
                <span>${recipeData.title}</span>
            `;
            dayContent.appendChild(plannedRecipeEl);
        });
    });
});