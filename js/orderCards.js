// Get the welcome elements and user name input field
let showname = document.getElementById("showname");
let welcomeName = document.querySelector("#showname span");
var UserName = document.getElementById("UserName");
var allproducts = document.getElementById("cardsitem");

// Check if a clientName is stored in local storage
if (localStorage.getItem("clientName")) {
  // Display the welcome message and set the client name
  showname.style.display = "block";
  welcomeName.innerHTML = "Welcome " + localStorage.getItem("clientName");
}

// Retrieve the cart data from local storage
let productsCard = JSON.parse(localStorage.getItem("cart"));

// Check if there are products in the cart
if (productsCard) {
  // Call the drawproducts function to display the products
  drawproducts();
}

// Function to draw products in the UI
function drawproducts() {
  // Use map to create an array of HTML strings for each product
  let productHTML = productsCard.map((product) => {
    return `
      <div id="allproducts">
        <div>
          <img src="${product.photo}" style="width: 200px;" alt="">
        </div>
        <h3>${product.breed}</h3>
        <h4>${product.price}$</h4>
      </div>`;
  });

  // Join the HTML strings and add them to the innerHTML of the products container
  allproducts.innerHTML = productHTML.join('');
}
