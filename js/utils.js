const MENU_SERVER_URL = "https://restaurant-menu-v1.firebaseio.com/.json";

const IMAGE_OVERRIDES = {
    "-MbX5uhs9iEJUW7MIEDZ": "https://www.healthyseasonalrecipes.com/wp-content/uploads/2022/06/grilled-ground-turkey-kofta-kebabs-square-042.jpg",
    "-MbX7-oUz7a5kW2XsLMh": "https://www.jocooks.com/wp-content/uploads/2020/06/chicken-gyros-1-14.jpg",
    "-MbX7wyQaOYMwjlpTb5S": "https://www.allrecipes.com/thmb/UdfDPTTJFbQvLGUeE3o8oa0Bdac=/750x0/filters:no_upscale():max_bytes(150000):strip_icc():format(webp)/21659-Chicken-Quesadillas-DDMFS-3314-4x3-Beauty-d3097a0276794bd98bfee10f731c819d.jpg",
};

export async function getMenuData() {
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

export function getCorrectImageUrl(id, originalUrl) {
    return IMAGE_OVERRIDES[id] || originalUrl;
}