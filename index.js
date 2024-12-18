const MENU_SERVER_URL = "https://restaurant-menu-v1.firebaseio.com/.json";

async function getMenuData() {
    try {
        const response = await fetch(MENU_SERVER_URL);
        if (!response.ok) {
            throw new Error("Failed to fetch data");
        }
        const data = await response.json();
        return data;
    } catch (error) {
        console.error("Error fetching menu data:", error);
    }
}

const IMAGE_OVERRIDES = {
    "-MbX5uhs9iEJUW7MIEDZ": "https://www.healthyseasonalrecipes.com/wp-content/uploads/2022/06/grilled-ground-turkey-kofta-kebabs-square-042.jpg",
    "-MbX7-oUz7a5kW2XsLMh": "https://www.jocooks.com/wp-content/uploads/2020/06/chicken-gyros-1-14.jpg",
    "-MbX7wyQaOYMwjlpTb5S": "https://www.allrecipes.com/thmb/UdfDPTTJFbQvLGUeE3o8oa0Bdac=/750x0/filters:no_upscale():max_bytes(150000):strip_icc():format(webp)/21659-Chicken-Quesadillas-DDMFS-3314-4x3-Beauty-d3097a0276794bd98bfee10f731c819d.jpg",
};

function getCorrectImageUrl(id, originalUrl) {
    return IMAGE_OVERRIDES[id] || originalUrl;
}

function mapMenuToTable(menuData) {
    const menuTable = document.querySelector('#menu-table');
    const menuArray = Object.entries(menuData);

    menuArray.forEach(([dishKey, dish]) => {
        const row = document.createElement('tr');

        const imageCell = document.createElement('td');
        const image = document.createElement('img');
        image.src = getCorrectImageUrl(dishKey, dish.imagine);
        image.alt = dish.nume;
        imageCell.appendChild(image);

        const nameCell = document.createElement('td');
        const nameLink = document.createElement('a');
        nameLink.href = `pages/details.html?id=${dishKey}`;
        nameLink.textContent = dish.nume;
        nameCell.appendChild(nameLink);

        const ingredientsCell = document.createElement('td');
        ingredientsCell.textContent = dish.ingrediente;

        row.appendChild(imageCell);
        row.appendChild(nameCell);
        row.appendChild(ingredientsCell);

        menuTable.appendChild(row);
    });
}


window.addEventListener('DOMContentLoaded', async () => {
    const menuData = await getMenuData();
    if (menuData) {
        mapMenuToTable(menuData);
    }
});
