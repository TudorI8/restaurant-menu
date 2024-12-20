import { getMenuData,
         getCorrectImageUrl,
} from './js/utils.js';

function renderMenu(menuArray) {
    const menuTableBody = document.querySelector('#menu-table tbody');
    menuTableBody.innerHTML = '';

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

        menuTableBody.appendChild(row);
    });
}

function filterMenu(menuData, searchTerm) {
    const filteredData = Object.entries(menuData).filter(([key, dish]) =>
        dish.ingrediente.toLowerCase().includes(searchTerm.toLowerCase())
    );
    return filteredData;
}

window.addEventListener('DOMContentLoaded', async () => {
    const menuData = await getMenuData();

    if (menuData) {
        renderMenu(Object.entries(menuData));

        const filterInput = document.querySelector('.filter-input');
        const filterButton = document.querySelector('.filter-button');
        const filterreset = document.querySelector('.filter-reset');

        const filterAndRenderMenu = () => {
            const searchTerm = filterInput.value.trim();
            if (searchTerm) {
                const filteredMenu = filterMenu(menuData, searchTerm);
                renderMenu(filteredMenu);
            } else {
                renderMenu(Object.entries(menuData));
            }
        };

        filterButton.addEventListener('click', filterAndRenderMenu);

        filterInput.addEventListener('keydown', (event) => {
            if (event.key === 'Enter') {
                event.preventDefault();
                filterAndRenderMenu();
            }
        });

        filterreset.addEventListener('click', () => {
            filterInput.value = '';
            renderMenu(Object.entries(menuData));
        });
    }
});