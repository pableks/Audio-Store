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

let cart = JSON.parse(localStorage.getItem("cart")) || [];
document.addEventListener("DOMContentLoaded", function () {
  updateCartCount();
  renderCartItems();

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
      }, 50); // Start the transition after a short delay to ensure that the display property has been applied
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
    addButton.className = "btn btn-primary";
    addButton.textContent = "+";
    addButton.href = "#";
    addButton.setAttribute("data-bs-toggle", "popover");
    addButton.setAttribute("data-bs-content", "Item added to cart!");
    addButton.addEventListener("click", function (event) {
      event.preventDefault();
      addToCart(product);
      addButton.classList.add("btn-transition-active");
      setTimeout(() => {
        addButton.classList.remove("btn-transition-active");
      }, 800);
      
      let popover = new bootstrap.Popover(addButton, {
        trigger: 'manual'
      });
      popover.show();

      setTimeout(() => {
        popover.hide();
      }, 1000); // Duration of the popover display
    });// Duration of the transition effect
    

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

function addToCart(product) {
  let existingProduct = cart.find((p) => p.name === product.name);
  if (existingProduct) {
    existingProduct.quantity += 1;
  } else {
    product.quantity = 1;
    cart.push(product);
  }
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
    cartItem.className = "dropdown-item d-flex justify-content-between align-items-center";

    // Wrapper for product name and quantity
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
      event.stopPropagation(); // Stop event propagation
      product.quantity += 1;
      localStorage.setItem("cart", JSON.stringify(cart));
      updateCartCount();
      renderCartItems();
    });

    let removeButton = document.createElement("button");
    removeButton.className = "btn btn-sm btn-danger";
    removeButton.textContent = "-";
    removeButton.addEventListener("click", function (event) {
      event.stopPropagation(); // Stop event propagation
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
