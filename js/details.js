import { getMenuData,
         getCorrectImageUrl,
} from './utils.js';

function getMenuIdFromURL() {
    const urlSearchParams = new URLSearchParams(window.location.search);
    return urlSearchParams.get("id");
}

async function getRecipeFromLocal(menuId) {
    try {
        const response = await fetch("../menu.json");
        if (!response.ok) {
            throw new Error("Failed to fetch local recipe data");
        }
        const recipeData = await response.json();
        return recipeData[menuId] ? recipeData[menuId].reteta : null;
    } catch (error) {
        console.error("Error fetching local recipe data:", error);
        return null;
    }
}

async function displayMenuDetails(menu, menuId) {
    const detailsContainer = document.querySelector('.main');

    if (!detailsContainer) {
        console.error("Details container not found in DOM.");
        return;
    }

    const card = document.createElement('div');
    card.classList.add('card-details', 'flex', 'p-20', 'br-10');

    const imageContainer = document.createElement('div');
    imageContainer.classList.add('card-image', 'flex', 'justify-center', 'items-center');
    const image = document.createElement('img');
    image.src = getCorrectImageUrl(menuId, menu.imagine);
    image.alt = menu.nume;
    imageContainer.appendChild(image);

    const details = document.createElement('div');
    details.classList.add('card-content', 'flex', 'flex-col', 'justify-center');

    const title = document.createElement('h1');
    title.textContent = menu.nume;

    const ingredients = document.createElement('p');
    ingredients.innerHTML = `<strong>Ingrediente:</strong> ${menu.ingrediente}`;

    const recipe = document.createElement('p');
    const localRecipe = await getRecipeFromLocal(menuId);

    if (menu.reteta || localRecipe) {
        recipe.innerHTML = `<strong>Rețetă:</strong> ${menu.reteta || localRecipe}`;
    } else {
        recipe.textContent = "Rețeta nu este disponibilă.";
    }

    details.appendChild(title);
    details.appendChild(ingredients);
    details.appendChild(recipe);

    card.appendChild(imageContainer);
    card.appendChild(details);

    detailsContainer.appendChild(card);
}

window.addEventListener('DOMContentLoaded', async () => {
    const menuId = getMenuIdFromURL();
    if (!menuId) {
        console.error("No menu ID found in URL.");
        return;
    }

    const menuData = await getMenuData();
    if (menuData && menuData[menuId]) {
        displayMenuDetails(menuData[menuId], menuId);
    } else {
        console.error("Menu item not found.");
    }
});