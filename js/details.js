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

    const title = document.createElement('h1');
    title.textContent = menu.nume;

    const image = document.createElement('img');
    image.src = getCorrectImageUrl(menuId, menu.imagine);
    image.alt = menu.nume;

    const ingredients = document.createElement('p');
    ingredients.textContent = `Ingrediente: ${menu.ingrediente}`;

    const recipe = document.createElement('p');
    const localRecipe = await getRecipeFromLocal(menuId);

    if (menu.reteta || localRecipe) {
        recipe.textContent = `Rețeta: ${menu.reteta || localRecipe}`;
    } else {
        recipe.textContent = "Rețeta nu este disponibilă.";
    }

    detailsContainer.appendChild(title);
    detailsContainer.appendChild(image);
    detailsContainer.appendChild(ingredients);
    detailsContainer.appendChild(recipe);
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