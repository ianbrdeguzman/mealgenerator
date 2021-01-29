// TheMealDB API
RANDOM = 'https://www.themealdb.com/api/json/v1/1/random.php';

const getMealBtn = document.querySelector('button');

getMealBtn.addEventListener('click', async () => {
    const response = await fetch(RANDOM);
    const data = await response.json();

    createMeal(data.meals[0]);
})

const createMeal = (meal) => {

    const container = document.querySelector('.container');
    
    container.innerHTML = "";

    const img = meal.strMealThumb;
    const name = meal.strMeal;
    const area = meal.strArea;
    const category = meal.strCategory
    const instructions = meal.strInstructions;
    const videoId = meal.strYoutube.split('=')[1];
    const youtubeURL = 'https://www.youtube.com/embed/';
    const videoURL = `${youtubeURL}${videoId}`;
    
    const mealItem = 
    `
    <div class="recipe-container">
        <div class="info-1">
            <div class="img-container">
                <h2>${name}</h2>
                <img id="img" src="${img}" alt="${name}">
            </div>
            <ul class="ingredients">
                <h2>Ingredients:</h2>
            </ul>
        </div>
        <div class="info-2">
            <div>
                <p>Area: ${area}</p>
                <p>Category: ${category}</p>
            </div>
            <h2>Instructions:</h2>
            <p>${instructions}</p>
        </div>
    </div>
    <div class="video-container">
        <h2>Video Recipe:</h2>
        <iframe src="${videoURL}"></iframe>
    </div>
    `
    container.insertAdjacentHTML('beforeend', mealItem);

    getIngredients(meal);
}

const getIngredients = (meal) => {

    const ingredients = [];

    for (let i = 1; i <= 20; i++) {

        if (meal[`strIngredient${i}`]) {
            ingredients.push(`${meal[`strMeasure${i}`]} - ${meal[`strIngredient${i}`]}`);
        } else {
            break;
        }
    }

    ingredients.forEach( (ingredient) => {
        const container = document.querySelector('.ingredients');

        const newIngredient = `<li>${ingredient}</li>`;

        container.insertAdjacentHTML('beforeend', newIngredient);
        
    })
};