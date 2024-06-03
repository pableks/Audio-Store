let users = [
  { username: "user1", password: "password1" },
  { username: "user2", password: "password2" },
];

let loggedInUser = JSON.parse(localStorage.getItem("loggedInUser"));

let products = [
  {
    name: "Analog Synth 1",
    imageUrl: "images/analog1.jpeg",
    description: "A great analog synth.",
    images: ["images/analog1-1.jpeg", "images/analog1-2.jpeg"],
    soundDemo: "sounds/analog1.mp3",
  },
  {
    name: "Analog Synth 2",
    imageUrl: "images/analog2.webp",
    description: "Another great analog synth.",
    images: ["images/analog2-1.webp", "images/analog2-2.webp"],
    soundDemo: "sounds/analog2.mp3",
  },
];

const userIconSVG = `
<svg xmlns="http://www.w3.org/2000/svg" width="768" height="768" viewBox="0 0 24 24"><path fill="currentColor" d="M12 4a4 4 0 0 1 4 4a4 4 0 0 1-4 4a4 4 0 0 1-4-4a4 4 0 0 1 4-4m0 10c4.42 0 8 1.79 8 4v2H4v-2c0-2.21 3.58-4 8-4"/></svg>
`;

const userIconHeadphones = `
<svg xmlns="http://www.w3.org/2000/svg" width="768" height="768" viewBox="0 0 24 24"><path fill="currentColor" d="M11 14c1 0 2.05.16 3.2.44c-.81.87-1.2 1.89-1.2 3.06c0 .89.25 1.73.78 2.5H3v-2c0-1.19.91-2.15 2.74-2.88C7.57 14.38 9.33 14 11 14m0-2c-1.08 0-2-.39-2.82-1.17C7.38 10.05 7 9.11 7 8c0-1.08.38-2 1.18-2.82C9 4.38 9.92 4 11 4c1.11 0 2.05.38 2.83 1.18C14.61 6 15 6.92 15 8c0 1.11-.39 2.05-1.17 2.83S12.11 12 11 12m7.5-2H22v2h-2v5.5a2.5 2.5 0 0 1-2.5 2.5a2.5 2.5 0 0 1-2.5-2.5a2.5 2.5 0 0 1 2.5-2.5c.36 0 .69.07 1 .21z"/></svg>
`;

const register_name = document.getElementById("name");
const register_email = document.getElementById("email");
const register_password = document.getElementById("password");
const register_button = document.getElementById("register-btn");

const cek_reg_name = localStorage.getItem("register_name");
const cek_reg_email = localStorage.getItem("register_email");
const cek_reg_password = localStorage.getItem("register_password");
const cek_log_email = localStorage.getItem("login_email");
const cek_log_password = localStorage.getItem("login_password");

if (
  (cek_reg_name,
  cek_reg_email,
  cek_reg_password,
  cek_log_email,
  cek_log_password != null)
) {
  window.location = "index.html";
}

let cart = JSON.parse(localStorage.getItem("cart")) || [];

document.addEventListener("DOMContentLoaded", function () {
  let users = JSON.parse(localStorage.getItem("users")) || [];

  var register_button = document.getElementById("register-btn");
  if (register_button) {
    // Check if the button exists before adding the event listener
    register_button.addEventListener("click", function (event) {
      event.preventDefault();

      const register_name_value = register_name.value;
      const register_email_value = register_email.value;
      const register_password_value = register_password.value;

      // Check if the input fields are not empty
      if (
        !register_name_value ||
        !register_email_value ||
        !register_password_value
      ) {
        alert("Data not valid ❌");
        return;
      }

      // Check if the email is already registered
      const userExists = users.find(
        (user) => user.email === register_email_value
      );
      if (userExists) {
        alert("User with this email already exists ❌");
        return;
      }

      // Create a new user object
      const newUser = {
        username: register_name_value,
        password: register_password_value,
        email: register_email_value,
      };

      // Add the new user to the users array
      users.push(newUser);

      // Store the updated users array in localStorage
      localStorage.setItem("users", JSON.stringify(users));

      alert("Registration successful ✅");
      window.location = "index.html";
    });
  }

  cart = JSON.parse(localStorage.getItem(getCartKey())) || [];
  updateNavbar();
  updateCartCount();
  renderCartItems();

  document
    .getElementById("login-form")
    .addEventListener("submit", function (event) {
      event.preventDefault();
      let username = document.getElementById("login-username").value;
      let password = document.getElementById("login-password").value;
      loginUser(username, password);
    });

  document
    .getElementById("forgot-password-link")
    .addEventListener("click", function (event) {
      event.preventDefault();
      alert("Password recovery process not implemented.");
    });

  document
    .getElementById("logout-button")
    .addEventListener("click", function () {
      logoutUser();
      updateNavbar(); // Ensure navbar updates immediately after logout
    });

  if (loggedInUser) {
    document.getElementById("loginDropdown").innerText = loggedInUser.username;
  }

  /*
  var registerForm = document.getElementById('register-form');

  if (registerForm) {
    registerForm.addEventListener('submit', function(event) {
      event.preventDefault();

      // Get form data
      var fullname = document.getElementById('register-fullname').value;
      var username = document.getElementById('register-username').value;
      var password = document.getElementById('register-password').value;
      var address = document.getElementById('register-address').value;
      var email = document.getElementById('register-email').value;
      var securityQuestion = document.getElementById('register-security-question').value;
      var securityAnswer = document.getElementById('register-security-answer').value;

      // Validate form data
      if (validateRegistration(fullname, username, password, address, email)) {
        // Create new user object
        var newUser = { fullname: fullname, username: username, password: password, address: address, email: email, securityQuestion: securityQuestion, securityAnswer: securityAnswer };

        // Register new user
        registerUser(newUser);
      }
    });
  }
*/

  updateNavbar();

  let productList = document.getElementById("product-list");

  var dropdowns = document.querySelectorAll(".dropdown");
  dropdowns.forEach(function (dropdown) {
    dropdown.addEventListener("show.bs.dropdown", function () {
      let dropdownMenu = this.querySelector(".dropdown-menu");
      dropdownMenu.style.maxHeight = "0";
      dropdownMenu.style.opacity = "0";
      setTimeout(function () {
        dropdownMenu.style.maxHeight = dropdownMenu.scrollHeight + "px";
        dropdownMenu.style.opacity = "1";
      }, 50);
    });
    dropdown.addEventListener("hide.bs.dropdown", function () {
      let dropdownMenu = this.querySelector(".dropdown-menu");
      dropdownMenu.style.maxHeight = "0";
      dropdownMenu.style.opacity = "0";
    });
  });

  for (let product of products) {
    let col = document.createElement("div");
    col.className = "col-sm-4";

    let card = document.createElement("div");
    card.className = "card mb-4";

    // Image and Sale Badge
    let imgWrapper = document.createElement("div");
    imgWrapper.className = "position-relative";
    let imgLink = document.createElement("a");
    imgLink.href = "product-details.html";
    imgLink.addEventListener("click", function (event) {
      event.preventDefault();
      localStorage.setItem("selectedProduct", JSON.stringify(product));
      window.location.href = "product-details.html";
    });

    let img = document.createElement("img");
    img.src = product.imageUrl;
    img.className = "card-img-top";

    imgLink.appendChild(img);
    imgWrapper.appendChild(imgLink);
    let saleBadge = document.createElement("span");
    saleBadge.className = "badge-sale";
    saleBadge.textContent = "Sale";
    imgWrapper.appendChild(saleBadge);

    // Card Body
    let cardBody = document.createElement("div");
    cardBody.className = "card-body";

    // Product Title
    let cardTitle = document.createElement("h5");
    cardTitle.className = "card-title";
    cardTitle.textContent = product.name;
    cardTitle.style.cursor = "pointer";
    cardTitle.addEventListener("click", function () {
      localStorage.setItem("selectedProduct", JSON.stringify(product));
      window.location.href = "product-details.html";
    });

    // Product Description
    let cardText = document.createElement("p");
    cardText.className = "card-text";
    cardText.textContent = product.description;

    // Price
    let priceWrapper = document.createElement("div");
    let discountedPrice = document.createElement("span");
    discountedPrice.className = "discounted-price";
    discountedPrice.textContent = "$148";
    let price = document.createElement("span");
    price.className = "price";
    price.textContent = "$99";
    priceWrapper.appendChild(discountedPrice);
    priceWrapper.appendChild(price);

    // Add to Cart Button
    let addButton = document.createElement("a");
    addButton.className = "specialbutton"; // Change to specialbutton class

    addButton.href = "#";
    addButton.setAttribute("data-bs-toggle", "popover");
    addButton.setAttribute("data-bs-content", "Item added to cart!");

    let buttonText = document.createElement("span");
    buttonText.className = "specialbutton__text";
    buttonText.textContent = "Add Item";

    let buttonIcon = document.createElement("span");
    buttonIcon.className = "specialbutton__icon";
    buttonIcon.innerHTML = `
  <svg class="svg" fill="none" height="24" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" viewBox="0 0 24 24" width="24" xmlns="http://www.w3.org/2000/svg">
    <line x1="12" x2="12" y1="5" y2="19"></line>
    <line x1="5" x2="19" y1="12" y2="12"></line>
  </svg>
`;

    addButton.appendChild(buttonText);
    addButton.appendChild(buttonIcon);

    addButton.addEventListener("click", function (event) {
      event.preventDefault();
      addToCart(product);
      addButton.classList.add("btn-transition-active");
      setTimeout(() => {
        addButton.classList.remove("btn-transition-active");
      }, 800);

      let popover = new bootstrap.Popover(addButton, {
        trigger: "manual",
      });
      popover.show();

      setTimeout(() => {
        popover.hide();
      }, 1000);
    });

    // Ratings
    let rating = document.createElement("div");
    rating.className = "rating";
    rating.innerHTML = "★★★★★";

    // Tags
    let tagsWrapper = document.createElement("div");
    tagsWrapper.className = "tags";
    let tag1 = document.createElement("span");
    tag1.className = "tag";
    tag1.textContent = "Creative FX";
    let tag2 = document.createElement("span");
    tag2.className = "tag";
    tag2.textContent = "New!";
    tagsWrapper.appendChild(tag1);
    tagsWrapper.appendChild(tag2);

    // Append everything
    cardBody.appendChild(cardTitle);
    cardBody.appendChild(cardText);
    cardBody.appendChild(priceWrapper);
    cardBody.appendChild(rating);
    cardBody.appendChild(addButton);
    cardBody.appendChild(tagsWrapper);

    card.appendChild(imgWrapper);
    card.appendChild(cardBody);

    col.appendChild(card);

    productList.appendChild(col);
  }
});

function updateNavbar() {
  let loginDropdown = document.getElementById("loginDropdown");
  let loginForm = document.getElementById("login-form");
  let logoutForm = document.getElementById("logout-form");

  if (loggedInUser) {
    loginDropdown.innerHTML = `
      <span class="login-text">${loggedInUser.username}</span>
      ${userIconHeadphones}`;
    loginDropdown.classList.add("logged-in");
    loginForm.style.display = "none"; // Hide login form
    logoutForm.style.display = "block"; // Show logout form
  } else {
    loginDropdown.classList.remove("logged-in");
    loginDropdown.innerHTML = `
      <span class="login-text">Login</span>
      ${userIconSVG}`;
    loginForm.style.display = "block"; // Show login form
    logoutForm.style.display = "none"; // Hide logout form
  }
}

function getCartKey() {
  return loggedInUser ? `cart-${loggedInUser.username}` : "cart";
}

function loginUser(username, password) {
  // Retrieve the users array from localStorage
  let users = JSON.parse(localStorage.getItem("users")) || [];

  // Find the user in the users array
  let user = users.find(
    (user) => user.username === username && user.password === password
  );

  // Check if the user exists and the password is correct
  if (user) {
    // Store the logged-in user in localStorage
    loggedInUser = user;
    localStorage.setItem("loggedInUser", JSON.stringify(user));

    // Retrieve the user's cart from localStorage or initialize it if it doesn't exist
    cart = JSON.parse(localStorage.getItem(getCartKey())) || [];

    console.log("Login successful");
    updateNavbar();

    // Reload the page after successful login
    window.location.reload();
  } else {
    // If the username or password is incorrect, display an error message
    console.log("Invalid username or password");
    alert("Invalid username or password");
  }
}

function logoutUser() {
  localStorage.removeItem("loggedInUser");
  loggedInUser = null;
  updateNavbar();
}

function addToCart(product) {
  let existingProduct = cart.find((p) => p.name === product.name);
  if (existingProduct) {
    existingProduct.quantity += 1;
  } else {
    product.quantity = 1;
    cart.push(product);
  }
  localStorage.setItem(getCartKey(), JSON.stringify(cart));
  localStorage.setItem("cart", JSON.stringify(cart));
  updateCartCount();
  renderCartItems();
}

function updateCartCount() {
  document.getElementById("cart-count-text").textContent = cart.reduce(
    (acc, product) => acc + product.quantity,
    0
  );
}

function renderCartItems() {
  let cartItems = document.getElementById("cart-items");
  cartItems.innerHTML = "";

  if (cart.length === 0) {
    let emptyMessage = document.createElement("li");
    emptyMessage.className = "dropdown-item";
    emptyMessage.textContent = "Your cart is empty.";
    cartItems.appendChild(emptyMessage);
    return;
  }

  for (let product of cart) {
    let cartItem = document.createElement("li");
    cartItem.className =
      "dropdown-item d-flex justify-content-between align-items-center";

    let itemInfoWrapper = document.createElement("div");
    itemInfoWrapper.className = "cart-item-text-wrapper";

    let itemInfo = document.createElement("div");
    itemInfo.textContent = product.name;
    itemInfo.className = "cart-item-text";

    let itemQuantity = document.createElement("div");
    itemQuantity.textContent = `(${product.quantity})`;
    itemQuantity.className = "cart-item-quantity";

    itemInfoWrapper.appendChild(itemInfo);
    itemInfoWrapper.appendChild(itemQuantity);

    let itemActions = document.createElement("div");

    let addButton = document.createElement("button");
    addButton.className = "btn btn-sm btn-primary me-2";
    addButton.textContent = "+";
    addButton.addEventListener("click", function (event) {
      event.stopPropagation();
      product.quantity += 1;
      localStorage.setItem("cart", JSON.stringify(cart));
      updateCartCount();
      renderCartItems();
    });

    let removeButton = document.createElement("button");
    removeButton.className = "btn btn-sm btn-danger";
    removeButton.textContent = "-";
    removeButton.addEventListener("click", function (event) {
      event.stopPropagation();
      product.quantity -= 1;
      if (product.quantity === 0) {
        cart = cart.filter((p) => p.name !== product.name);
      }
      localStorage.setItem("cart", JSON.stringify(cart));
      updateCartCount();
      renderCartItems();
    });

    itemActions.appendChild(addButton);
    itemActions.appendChild(removeButton);

    cartItem.appendChild(itemInfoWrapper);
    cartItem.appendChild(itemActions);

    cartItems.appendChild(cartItem);
  }
}
