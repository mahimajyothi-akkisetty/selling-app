// Shopping Cart functionality
let cart = [];

function addToCart(productName, price) {
    // Add product to the cart
    cart.push({ productName, price });
    updateCart();
}

function updateCart() {
    const cartItemsDiv = document.getElementById('cart-items');
    if (cart.length === 0) {
        cartItemsDiv.innerHTML = '<p>Your cart is empty!</p>';
    } else {
        let cartHTML = '<ul>';
        let total = 0;
        cart.forEach(item => {
            cartHTML += `<li>${item.productName} - |${item.price}</li>`;
            total += item.price;
        });
        cartHTML += `</ul><p><strong>Total:₹${total}</strong></p>`;
        cartItemsDiv.innerHTML = cartHTML;
    }
}

function proceedToCheckout() {
    if (cart.length === 0) {
        alert('Your cart is empty! Please add some products.');
    } else {
        // Show the checkout section and hide cart section
        document.getElementById('cart').style.display = 'none';
        document.getElementById('checkout').style.display = 'block';
    }
}

function completeCheckout(event) {
    event.preventDefault();

    // Get quantity and address from form
    const quantity = document.getElementById('quantity').value;
    const address = document.getElementById('address').value;

    if (!quantity || !address) {
        alert('Please enter both quantity and address.');
        return;
    }

    // Prepare the order details
    const total = calculateTotal(quantity);
    const orderDetails = `
        <h3>Order Details</h3>
        <p><strong>Product(s) Ordered:</strong> ${cart.map(item => item.productName).join(', ')}</p>
        <p><strong>Quantity:</strong> ${quantity} kg</p>
        <p><strong>Total Cost:</strong> ${total}</p>
        <p><strong>Shipping Address:</strong> ${address}</p>
    `;
    
    // Hide checkout section and show order confirmation
    document.getElementById('checkout').style.display = 'none';
    document.getElementById('order-status').style.display = 'block';
    document.getElementById('order-status').innerHTML = orderDetails;
}

function calculateTotal(quantity) {
    let totalPrice = 0;
    cart.forEach(item => {
        totalPrice += item.price;
    });
    // Multiply total by quantity selected
    return totalPrice * quantity;
}

// Example of showing the cart contents on page load
document.addEventListener('DOMContentLoaded', () => {
    updateCart(); // Initialize cart display when page loads
});


