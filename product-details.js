window.onload = function() {
    // Check and set theme from localStorage
    let theme = localStorage.getItem('theme');
    if (theme) {
        document.body.className = theme;
    }

    // Get the selected product from localStorage
    let selectedProduct = JSON.parse(localStorage.getItem('selectedProduct'));
    if (!selectedProduct) {
        window.location.href = 'index.html';
        return;
    }

    // Set product details
    document.getElementById('product-name').textContent = selectedProduct.name;
    document.getElementById('breadcrumb-product-name').textContent = selectedProduct.name;
    document.getElementById('product-description').textContent = selectedProduct.description;
    document.getElementById('sound-demo').children[0].src = selectedProduct.soundDemo;

    // Set up carousel indicators and items
    let carouselIndicators = document.getElementById('carousel-indicators');
    let carouselInner = document.getElementById('carousel-inner');

    selectedProduct.images.forEach((image, index) => {
        // Create carousel indicator
        let indicator = document.createElement('button');
        indicator.setAttribute('type', 'button');
        indicator.setAttribute('data-bs-target', '#carouselExampleIndicators');
        indicator.setAttribute('data-bs-slide-to', index);
        indicator.setAttribute('aria-label', `Slide ${index + 1}`);
        if (index === 0) {
            indicator.classList.add('active');
            indicator.setAttribute('aria-current', 'true');
        }
        carouselIndicators.appendChild(indicator);

        // Create carousel item
        let carouselItem = document.createElement('div');
        carouselItem.classList.add('carousel-item');
        if (index === 0) {
            carouselItem.classList.add('active');
        }

        let img = document.createElement('img');
        img.src = image;
        img.className = 'd-block w-100';
        carouselItem.appendChild(img);

        carouselInner.appendChild(carouselItem);
    });

    // Create and insert the Add to Cart button
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

    addButton.addEventListener("click", function(event) {
        event.preventDefault();
        addToCart(selectedProduct); // Assuming addToCart is a defined function that adds the product to the cart
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

    // Append the button just under the product description
    document.getElementById('product-description').appendChild(addButton);
};
    