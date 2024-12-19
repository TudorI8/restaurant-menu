const MENU_SERVER_URL = "https://restaurant-menu-v1.firebaseio.com/.json";

async function getMenuData() {
    try {
        const response = await fetch(MENU_SERVER_URL);
        if (!response.ok) {
            throw new Error("Failed to fetch menu data");
        }
        const data = await response.json();
        return data;
    } catch (error) {
        console.error("Error fetching menu data:", error);
    }
}

function getMenuIdFromURL() {
    const urlSearchParams = new URLSearchParams(window.location.search);
    return urlSearchParams.get("id");
}

const IMAGE_OVERRIDES = {
    "-MbX5uhs9iEJUW7MIEDZ": "https://www.healthyseasonalrecipes.com/wp-content/uploads/2022/06/grilled-ground-turkey-kofta-kebabs-square-042.jpg",
    "-MbX7-oUz7a5kW2XsLMh": "https://www.jocooks.com/wp-content/uploads/2020/06/chicken-gyros-1-14.jpg",
    "-MbX7wyQaOYMwjlpTb5S": "https://www.allrecipes.com/thmb/UdfDPTTJFbQvLGUeE3o8oa0Bdac=/750x0/filters:no_upscale():max_bytes(150000):strip_icc():format(webp)/21659-Chicken-Quesadillas-DDMFS-3314-4x3-Beauty-d3097a0276794bd98bfee10f731c819d.jpg",
};

function getCorrectImageUrl(id, originalUrl) {
    return IMAGE_OVERRIDES[id] || originalUrl;
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