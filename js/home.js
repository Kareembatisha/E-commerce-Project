// Constants for DOM elements
const cartBtn = document.querySelector(".cart-btn");
const closeCartBtn = document.querySelector(".close-cart");
const clearCartBtn = document.querySelector(".clear-cart");
let cartDOM = document.querySelector(".cart");
const cartOverlay = document.querySelector(".cart-overlay");
const cartItems = document.querySelector(".cart-items");
const cartTotal = document.querySelector(".cart-total");
const cartContent = document.querySelector(".cart-content");
let collectionDOM = document.querySelector(".collection-center");

// Main cart array and buttons array
let cart = [];
let buttonsDOM = [];
var products=[];
// Classes

class Products 
{
  async getProducts() 
  {
    if(localStorage.getItem("products")=== null)//zbon gdid malo4 7aga
    {
      try 
      {
        // Fetch data from the JSON file
        let result = await fetch(`json/dog-breeds-data.json?v=${new Date().getTime()}`);
        let data = await result.json();
        console.log(data);
        // Extract products from the data
        products = data.dogBreeds.map((item) => {
          const {
            id,
            breed,
            breedType,
            origin,
            popularity,
            price,
            temperament,
            hypoallergenic,
            intelligence,
            photo,
            stockQuantity,
          } = item;
          return {
            id,
            breed,
            breedType,
            origin,
            popularity,
            price,
            temperament,
            hypoallergenic,
            intelligence,
            photo,
            stockQuantity,
          };
        });
        return products;
      } 
      catch (err) {
        console.error(err);
      }
    }
    else
    {
      products=JSON.parse( localStorage.getItem("products"));
      console.log("tmam");
      return products;
          //USersList malyaan bel7aga bta3 embar7
    }
  }
};
// Products class for fetching and processing products


// UI class for handling user interface interactions
class UI {
  // Method to set up user registration form
  /* setupUserForm() {
    const userForm = document.getElementById("userForm");
    userForm.addEventListener("submit", (event) => {
      event.preventDefault();
      const username = document.getElementById("username").value;
      const email = document.getElementById("email").value;
      const password = document.getElementById("password").value;

      // Save user information to local storage
      Storage.saveUser({ username, email, password });

      // Redirect to a distinct page for the user
      this.redirectToUserPage(username);
    });
  } */

  // Method to redirect to a user-specific page
  redirectToUserPage(username) {
    window.location.href = `index.html?username=${username}`;
  }

  // Method to display products in the UI
  displayProducts(products) {
    let result = "";
    products.forEach((product) => {
      result += `
        <!-- single puppy -->
        <article class="puppy" style="width:200px">
          <div class="image-container" >
            <img class="product-img" src=${product.photo}  alt="puppy" />
            <button class="bag-btn" data-id=${product.id}>
              <i class="fas fa-shopping-cart"></i> add to cart
            </button>
          </div>
          <h3>${product.breed}</h3>
          <h4>$${product.price}</h4>
        </article>
        <!-- single puppy -->`;
    });
    collectionDOM.innerHTML = result;
  }

  // Method to get bag buttons and attach event listeners
  getBagButtons() {
    const buttons = [...document.querySelectorAll(".bag-btn")];
    buttonsDOM = buttons;
    buttons.forEach((button) => {
      let id = button.dataset.id;
      let InCart = cart.find((item) => item.id === id);
      if (InCart) {
        button.innerText = "In Cart";
        button.disabled = true;
      }
      button.addEventListener("click", (event) => {
        event.target.innerText = "in Cart";
        event.target.disabled = true;
        // 1) get product from products
        let cartItem = { ...Storage.getProduct(id), amount: 1 };

        // 2) add product to the cart
        cart = [...cart, cartItem];

        //  3) save the cart to local storage
        Storage.saveCart(cart);
        // 4) set cart values
        this.setCartValues(cart);
        //  5) display car item
        this.addCartItem(cartItem);
        // 6) show the cart
        this.showCart();
      });
    });
  }

  // Method to set cart values in the UI
  setCartValues(cart) {
    let tempTotal = 0;
    let itemsTotal = 0;
    cart.map((item) => {
      tempTotal += item.price * item.amount;
      itemsTotal += item.amount;
    });
    cartTotal.innerText = parseFloat(tempTotal.toFixed(2));
    cartItems.innerText = itemsTotal;
  }

  // Method to add a cart item to the UI
  addCartItem(item) {
    const div = document.createElement("div");
    div.classList.add("cart-item");
    div.innerHTML = `
      <img src=${item.photo}  alt="" />
      <div>
        <h4>${item.breed}</h4>
        <h5>$${item.price}</h5>
        <span class="remove-item" data-id=${item.id}>remove</span>
      </div>
      <div>
        <i class="fas fa-chevron-up" data-id=${item.id}></i>
        <p class="item-amount">${item.amount}</p>
        <i class="fas fa-chevron-down" data-id=${item.id}></i>
      </div>`;

    cartContent.appendChild(div);
  }

  // Method to show the cart in the UI
  showCart() {
    cartOverlay.classList.add("transparentBcg");
    cartDOM.classList.add("showCart");
  }

  // Method to set up the app
  setupAPP() {
    // cart array will be assigned values from the storage
    cart = Storage.getCart();
    this.setCartValues(cart);
    this.populateCart(cart);
    cartBtn.addEventListener("click", this.showCart);
    closeCartBtn.addEventListener("click", this.hideCart);
  }

  // Method to populate the cart in the UI
  populateCart(cart) {
    cart.forEach((item) => {
      this.addCartItem(item);
    });
  }

  // Method to hide the cart in the UI
  hideCart() {
    cartOverlay.classList.remove("transparentBcg");
    cartDOM.classList.remove("showCart");
  }

  // Method to handle cart logic in the UI
  cartLogic() {
    clearCartBtn.addEventListener("click", () => {
      this.clearCart();
    });
    cartContent.addEventListener("click", (event) => {
      if (event.target.classList.contains("remove-item")) {
        let removeItem = event.target;
        let id = removeItem.dataset.id;
        cartContent.removeChild(removeItem.parentElement.parentElement);
        this.removeItem(id);
      } else if (event.target.classList.contains("fa-chevron-up")) {
        let addAmount = event.target;
        let id = addAmount.dataset.id;
        let tempItem = cart.find((item) => item.id === id);
        tempItem.amount = tempItem.amount + 1;
        Storage.saveCart(cart);
        this.setCartValues(cart);
        addAmount.nextElementSibling.innerText = tempItem.amount;
      } else if (event.target.classList.contains("fa-chevron-down")) {
        let lowerAmount = event.target;
        let id = lowerAmount.dataset.id;
        let tempItem = cart.find((item) => item.id === id);
        tempItem.amount = lowerAmount.amount - 1;
        if (tempItem.amount > 0) {
          Storage.saveCart(cart);
          this.setCartValues(cart);
          lowerAmount.previousElementSibling.innerText = tempItem.amount;
        } else {
          cartContent.removeChild(lowerAmount.parentElement.parentElement);
        }
      }
    });
  }

  // Method to clear the cart in the UI
  clearCart() {
    let cartItems = cart.map((item) => item.id);
    cartItems.forEach((id) => this.removeItem(id));
    while (cartContent.children.length > 0) {
      cartContent.removeChild(cartContent.children[0]);
      this.hideCart();
    }
  }

  // Method to remove an item from the cart in the UI
  removeItem(id) {
    cart = cart.filter((item) => item.id !== id);
    this.setCartValues(cart);
    Storage.saveCart(cart);
    let button = this.getSingleButton(id);
    button.disabled = false;
    button.innerHTML = `<i class="fas fa-shopping-cart"></i> add to cart`;
  }

  // Method to get a single button in the UI
  getSingleButton(id) {
    return buttonsDOM.find((button) => button.dataset.id === id);
  }
}

// Storage class for handling local storage operations
class Storage {
  // Method to remove the logged-in user from local storage
  static removeLoggedInUser() {
    localStorage.removeItem("loggedInUser");
  }

  // Method to save products to local storage
  static saveProducts(products) {
    localStorage.setItem("products", JSON.stringify(products));
  }

  // Method to get a product from local storage by ID
  static getProduct(id) {
    let products = JSON.parse(localStorage.getItem("products"));
    return products.find((product) => product.id === id);
  }

  // Method to save the cart to local storage
  static saveCart(cart) {
    localStorage.setItem("cart", JSON.stringify(cart));
  }

  // Method to get the cart from local storage
  static getCart() {
    return localStorage.getItem("cart")
      ? JSON.parse(localStorage.getItem("cart"))
      : [];
  }

  // Method to save a user to local storage
  static saveUser(user) {
    const users = JSON.parse(localStorage.getItem("users")) || [];
    users.push(user);
    localStorage.setItem("users", JSON.stringify(users));
    localStorage.setItem("loggedInUser", JSON.stringify(user));
  }

  // Method to get the logged-in user from local storage
  static getLoggedInUser() {
    return JSON.parse(localStorage.getItem("loggedInUser"));
  }

  // Method to check if a user with a given username exists
  static userExists(username) {
    const users = JSON.parse(localStorage.getItem("users")) || [];
    return users.some((user) => user.username === username);
  }

  // Method to log in a user
  static loginUser(username, password) {
    const users = JSON.parse(localStorage.getItem("users")) || [];
    return users.find(
      (user) => user.username === username && user.password === password
    );
  }
}
const ui = new UI(); // Declare UI instance globally

// Event listeners
document.addEventListener("DOMContentLoaded", () => {
  var loggedInUser = Storage.getLoggedInUser();
  if (loggedInUser) {
    ui.updateHeaderWithUsername(loggedInUser.username);
  }

  const products = new Products();

  // Set up the main app and UI
  ui.setupAPP();
  /* ui.setupUserForm(); */

  // Get all products
  products.getProducts().then((products) => {
    console.log("Fetched Products:", products);
    ui.displayProducts(products);
    Storage.saveProducts(products);
    ui.getBagButtons();
    ui.cartLogic();
  });

  // Check if the user is already logged in
  loggedInUser = Storage.getLoggedInUser();
  if (loggedInUser) {
    ui.redirectToUserPage(loggedInUser.username);
  }
});

function registerUser(event) {
  event.preventDefault();
  const username = document.getElementById("username").value;
  const email = document.getElementById("email").value;
  const password = document.getElementById("password").value;
  Storage.saveUser({ username, email, password });
  ui.updateHeaderWithUsername(username); // Use the ui instance

  if (Storage.userExists(username)) {
    displayMessage(
      "error",
      "Username already exists. Please choose a different one."
    );
    return;
  }

  Storage.saveUser({ username, email, password });
  displayMessage(
    "success",
    "Registration successful! Redirecting to the login page..."
  );

  setTimeout(() => {
    window.location.href = "index.html";
  }, 2000);
}
function displayMessage(type, text) {
  const messageContainer = document.getElementById("message-container");
  const messageElement = document.createElement("div");
  messageElement.className = type;
  messageElement.textContent = text;
  messageContainer.innerHTML = "";
  messageContainer.appendChild(messageElement);
}

function logoutUser() {
  Storage.removeLoggedInUser();
  window.location.href = "index.html";
}

// welcome and logout function

let showname = document.getElementById("showname");
let welcomeName = document.querySelector("#showname span");
var UserName = document.getElementById("UserName");

if (localStorage.getItem("clientName")) {
  showname.style.display = "block";
  welcomeName.innerHTML = "welcome " + localStorage.getItem("clientName");
}
