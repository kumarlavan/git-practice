document.addEventListener("DOMContentLoaded", () => {
    const themeToggleButton = document.getElementById("themeToggleButton");
    const loginButton = document.getElementById("loginButton");
    const cartBadge = document.getElementById("cartBadge");
    const cartIcon = document.querySelector(".cart-icon");
    const cartModal = document.querySelector("#cartModal");
    const cartCloseButton = document.querySelector("#clsbtn");
    const cartproducts = document.querySelector(".cartproducts");

    let cartCount = 0;
    let carts = JSON.parse(localStorage.getItem("cart")) || [];
    cartBadge.innerText = carts.length;

    // Initial cart load
    updatecartproducts(carts); // Call this to load the cart products initially

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

    // Cart icon click event to show cart modal
    cartIcon.addEventListener("click", () => {
        showCartModal();
    });

    cartCloseButton.addEventListener("click", () => {
        cartModal.style.display = "none";
    });

    // Fetch products from Fake Store API
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
                        <button class="add-to-cart" data-id="${product.id}" data-title="${product.title}" data-price="${product.price}" data-image="${product.image}">Add to Cart</button>
                        <button class="buy-now">Buy Now</button>
                    </div>
                </div>
            `;

            // Add event listener to the "Add to Cart" button
            const addToCartButton = productCard.querySelector(".add-to-cart");
            addToCartButton.addEventListener("click", (event) => {
                addToCart(event.target);
            });

            // Append product card to container
            document.getElementById("productContainer").appendChild(productCard);
        });
    }

    // Add product to cart
    function addToCart(button) {
        const product = {
            id: button.getAttribute("data-id"),
            title: button.getAttribute("data-title"),
            price: button.getAttribute("data-price"),
            image: button.getAttribute("data-image")
        };

        let cart = JSON.parse(localStorage.getItem("cart")) || [];
        cart.push(product);  // Add product to cart
        localStorage.setItem("cart", JSON.stringify(cart));
        cartCount = cart.length; // Update cart count
        cartBadge.textContent = cartCount; // Update cart badge

        // Update cart products in the modal
        updatecartproducts(cart);
    }

    function updatecartproducts(cart) {
        cartproducts.innerHTML = "";  // Clear the cart before updating
        if (cart.length === 0) {
            cartproducts.innerHTML = "<p>No items in the cart</p>";
        } else {
            cartBadge.textContent = cart.length; // Update cart badge
            cart.forEach((item) => {
                const cartItem = document.createElement("div");
                cartItem.style.marginBottom = "10px";
                cartItem.innerHTML = `
                    <img src="${item.image}" alt="${item.title}" style="width: 50px; height: 50px; object-fit: cover;">
                    <span>${item.title}</span>
                    <button class="remove-from-cart" data-id="${item.id}">Remove</button>
                `;
                cartproducts.appendChild(cartItem);
            });

            // Re-attach event listeners for the "Remove" buttons after cart update
            const removeButtons = document.querySelectorAll(".remove-from-cart");
            removeButtons.forEach((button) => {
                button.addEventListener("click", (event) => {
                    removeFromCart(event.target);
                });
            });
        }
    }

    // Show cart modal with items
    function showCartModal() {
        cartModal.style.display = "block";  // Show the cart modal
    }

    // Remove product from cart
    function removeFromCart(button) {
        const productId = button.getAttribute("data-id");
        let cart = JSON.parse(localStorage.getItem("cart")) || [];

        // Filter out the product to be removed
        cart = cart.filter((item) => item.id !== productId);
        localStorage.setItem("cart", JSON.stringify(cart));

        cartCount = cart.length; // Update cart count
        cartBadge.textContent = cartCount; // Update cart badge

        // Update the cart products in the modal
        updatecartproducts(cart);
    }
});
