document.addEventListener("DOMContentLoaded", () => {
    const productImage = document.getElementById("productImage");
    const productTitle = document.getElementById("productTitle");
    const productPrice = document.getElementById("productPrice");
    const quantityInput = document.getElementById("quantity");
    const subtotalElement = document.getElementById("subtotal");
    const gstElement = document.getElementById("gst");
    const totalPriceElement = document.getElementById("totalPrice");
    const paymentForm = document.getElementById("paymentForm");

    // Simulating product details passed via query parameters or localStorage
    const product = JSON.parse(localStorage.getItem("selectedProduct")) || {
        image: "https://via.placeholder.com/150",
        title: "Sample Product",
        price: 100.00
    };

    // Populate product details
    productImage.src = product.image;
    productTitle.textContent = product.title;
    productPrice.textContent = product.price.toFixed(2);
    updatePrice();

    // Update price calculations
    quantityInput.addEventListener("input", updatePrice);

    function updatePrice() {
        const quantity = parseInt(quantityInput.value) || 1;
        const subtotal = product.price * quantity;
        const gst = subtotal * 0.18;
        const totalPrice = subtotal + gst;

        subtotalElement.textContent = subtotal.toFixed(2);
        gstElement.textContent = gst.toFixed(2);
        totalPriceElement.textContent = totalPrice.toFixed(2);
    }

    // Handle form submission
    paymentForm.addEventListener("submit", (event) => {
        event.preventDefault();
        const email = document.getElementById("email").value;
        const address = document.getElementById("address").value;
        const coupon = document.getElementById("coupon").value;

        if (email && address) {
            alert(`Payment successful! Details:\n\nEmail: ${email}\nAddress: ${address}\nTotal Price: $${totalPriceElement.textContent}`);
        } else {
            alert("Please fill in all required fields.");
        }
    });
});
