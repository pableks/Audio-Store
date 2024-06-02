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
};
