# Restaurant Menu Application

This application provides a multi-page interface displaying a restaurant's menu, with details for each dish and contact information. JavaScript and CSS files should be used separately. The app will include three pages:

## Requirements

### 1. **Menu Page**

- **Retrieve Menu Data**: Fetch the list of dishes from the server using the Fetch API.
- **Display Menu**: Show each dish in a table format including the following columns:
  - Dish image
  - Name
  - Ingredients
  - Details button
- **Details Button**: The details button should include a link to `details.html` that redirects to the selected dish's detail page and includes the dish's ID in the URL.
  - **Example of redirect URL**: `http://.../menu/details.html?id=0`
- **Filter Dishes**: Add a filter feature that includes a text input and a search button, allowing users to filter dishes by ingredients.

### 2. **Dish Details Page**

- This screen should display the following details for a specific dish:
  - Image
  - Name
  - Ingredients
  - Recipe

### 3. **Contact Page**

- The contact screen should include:
  - The restaurant's contact address
  - (Optional) A Google Map displaying the restaurant's location

### API Endpoints

Use the following URLs for server requests:

```javascript
// URL for fetching the complete menu
var MENU_SERVER_URL = "https://restaurant-menu-v1.firebaseio.com/.json";

// URL for fetching specific dish details
var MENU_ITEM_SERVER_URL = "https://restaurant-menu-v1.firebaseio.com/menu/";

Example call for dish details: https://restaurant-menu-v1.firebaseio.com/menu/0.json - where 0 is the dish id
