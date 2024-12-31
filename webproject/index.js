document.addEventListener("DOMContentLoaded", () => {
    const themeToggleButton = document.getElementById("themeToggleButton");
    const loginButton = document.getElementById("loginButton");
    const cartBadge = document.getElementById("cartBadge");

    let cartCount = 0;

    // Toggle dark mode
    themeToggleButton.addEventListener("click", () => {
        document.body.classList.toggle("dark");
        themeToggleButton.textContent = document.body.classList.contains("dark")
            ? "Light Mode"
            : "Dark Mode";
    });

    // Login button action
    loginButton.addEventListener("click", () => {
        alert("Login functionality to be implemented!");
    });

    // Simulate adding items to the cart
    document.querySelector(".cart-icon").addEventListener("click", () => {
        cartCount++;
        cartBadge.textContent = cartCount;
    });
    const productContainer = document.getElementById("productContainer");

    // Fetch products from the Fake Store API
    fetch("https://fakestoreapi.com/products")
        .then((response) => response.json())
        .then((products) => {
            renderProducts(products);
        })
        .catch((error) => {
            console.error("Error fetching products:", error);
        });

    function renderProducts(products) {
        products.forEach((product) => {
            // Create product card
            const productCard = document.createElement("div");
            productCard.classList.add("product-card");

            // Set product card content
            productCard.innerHTML = `
                <img src="${product.image}" alt="${product.title}">
                <div class="product-details">
                    <h3 class="product-title">${product.title}</h3>
                    <p class="product-price">$${product.price.toFixed(2)}</p>
                    <p class="product-rating">⭐ ${product.rating.rate} (${product.rating.count} reviews)</p>
                    <div class="product-actions">
                        <button class="add-to-cart">Add to Cart</button>
                        <button class="buy-now">Buy Now</button>
                    </div>
                </div>
            `;

            // Append product card to container
            productContainer.appendChild(productCard);
        });
    }



});
