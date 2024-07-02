// Variable para almacenar los productos del carrito
let cart = [];

// Función para cargar el carrito desde localStorage
function loadCartFromStorage() {
    const storedCart = localStorage.getItem('cart');
    if (storedCart) {
        cart = JSON.parse(storedCart);
        updateCart();
    }
}

// Función para añadir un producto al carrito
function addToCart(id, title, price) {
    const existingItemIndex = cart.findIndex(item => item.id === id);
    if (existingItemIndex !== -1) {
        cart[existingItemIndex].quantity += 1;
    } else {
        cart.push({ id, title, price, quantity: 1 });
    }
    saveCartToStorage();
    updateCart();
    // Utiliza un sistema de notificación en lugar de alert (puede ser una librería como Toastify o SweetAlert)
    console.log('Producto añadido al carrito!');
}

// Función para guardar el carrito en localStorage
function saveCartToStorage() {
    localStorage.setItem('cart', JSON.stringify(cart));
}

// Función para actualizar la visualización del carrito
function updateCart() {
    const cartItems = document.getElementById('cart-items');
    const cartTotal = document.getElementById('cart-total');
    cartItems.innerHTML = '';

    let total = 0;
    cart.forEach(item => {
        const li = document.createElement('li');
        li.classList.add('list-group-item', 'd-flex', 'justify-content-between', 'align-items-center');
        li.textContent = `${item.title} x${item.quantity}`;
        const span = document.createElement('span');
        span.classList.add('badge', 'badge-primary', 'badge-pill');
        span.textContent = `$${(item.price * item.quantity).toFixed(2)}`;
        li.appendChild(span);

        // Botón para eliminar el producto del carrito
        const removeButton = document.createElement('button');
        removeButton.textContent = 'Remove';
        removeButton.classList.add('btn', 'btn-danger', 'btn-sm', 'ml-2');
        removeButton.onclick = () => removeFromCart(item.id);
        li.appendChild(removeButton);

        cartItems.appendChild(li);
        total += item.price * item.quantity;
    });

    cartTotal.textContent = total.toFixed(2);
    document.getElementById('cart').classList.remove('hidden');
}

// Función para eliminar un producto del carrito
function removeFromCart(id) {
    cart = cart.filter(item => item.id !== id);
    saveCartToStorage();
    updateCart();
}

// Función para vaciar el carrito
function clearCart() {
    cart = [];
    saveCartToStorage();
    updateCart();
}

// Función para alternar la visibilidad del carrito
function toggleCart() {
    const cartSection = document.getElementById('cart');
    cartSection.classList.toggle('hidden');
}

// Cargar el carrito desde el almacenamiento cuando se carga la página
document.addEventListener('DOMContentLoaded', loadCartFromStorage);
