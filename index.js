fetch("https://restaurant-menu-v1.firebaseio.com/.json")
  .then((response) => response.json())
  .then((data) => {
    console.log(data);
  })
  .catch((error) => console.error("Error fetching menu:", error));