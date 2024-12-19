import { getMenuData,
         getCorrectImageUrl,
} from './js/utils.js';

function mapMenuToTable(menuData) {
    const menuTable = document.querySelector('#menu-table');
    const menuArray = Object.entries(menuData);

    menuArray.forEach(([dishKey, dish]) => {
        const row = document.createElement('tr');

        const imageCell = document.createElement('td');
        const imageLink = document.createElement('a');
        imageLink.href = `pages/details.html?id=${dishKey}`;
        const image = document.createElement('img');
        image.src = getCorrectImageUrl(dishKey, dish.imagine);
        image.alt = dish.nume;
        imageLink.appendChild(image);
        imageCell.appendChild(imageLink);

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
