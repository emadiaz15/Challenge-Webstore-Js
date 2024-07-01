// Cuando el documento HTML esté completamente cargado, obtener las categorías y mostrar todos los productos
document.addEventListener('DOMContentLoaded', () => {
    fetchCategories();
    loadCartFromStorage();
});

// Obtener categorías desde la API y mostrarlas
async function fetchCategories() {
    try {
        // Obtener categorías desde la API
        const response = await fetch('https://fakestoreapi.com/products/categories');
        const categories = await response.json();

        // Obtener el elemento de la lista de categorías
        const categoriesList = document.getElementById('categories');
        categoriesList.innerHTML = '';
        // Crear elementos de lista para cada categoría y añadirlos a la lista de categorías
        categories.forEach(category => {
            const li = document.createElement('li');
            li.classList.add('nav-item');
            const a = document.createElement('a');
            a.classList.add('nav-link');
            a.href = '#';
            a.textContent = category;
            a.addEventListener('click', () => fetchProductsByCategory(category));
            li.appendChild(a);
            categoriesList.appendChild(li);
        });
    } catch (error) {
        console.error('Error obteniendo categorías:', error);
    }
}

// Obtener productos por categoría y mostrarlos
async function fetchProductsByCategory(category) {
    try {
        // Obtener productos para la categoría seleccionada
        const response = await fetch(`https://fakestoreapi.com/products/category/${category}`);
        const products = await response.json();

        // Obtener el elemento de la lista de productos
        const productList = document.getElementById('product-list');
        productList.innerHTML = '';
        // Crear grupo de tarjetas de productos y añadirlas a la lista de productos
        const cardGroup = document.createElement('div');
        cardGroup.classList.add('card-group');
        products.forEach(product => {
            const productCard = document.createElement('div');
            productCard.classList.add('card');
            productCard.innerHTML = `
                <img src="${product.image}" class="card-img-top" alt="${product.title}">
                <div class="card-body">
                    <h5 class="card-title">${product.title}</h5>
                    <p class="card-text">${product.description}</p>
                    <p class="card-text">$${product.price}</p>
                    <button class="btn btn-primary" onclick="fetchProductDetail(${product.id})">Ver Detalles</button>
                </div>
            `;
            cardGroup.appendChild(productCard);
        });
        productList.appendChild(cardGroup);
    } catch (error) {
        console.error(`Error obteniendo productos para la categoría ${category}:`, error);
    }
}

// Obtener detalles del producto y mostrarlos
async function fetchProductDetail(productId) {
    try {
        // Obtener detalles del producto desde la API
        const response = await fetch(`https://fakestoreapi.com/products/${productId}`);
        const product = await response.json();

        // Obtener el elemento de detalles del producto
        const productDetail = document.getElementById('product-detail');
        productDetail.innerHTML = `
            <div class="card">
                <img src="${product.image}" class="card-img-top" alt="${product.title}">
                <div class="card-body">
                    <h5 class="card-title">${product.title}</h5>
                    <p class="card-text">${product.description}</p>
                    <p class="card-text">$${product.price}</p>
                    <button class="btn btn-success" onclick="addToCart(${product.id}, '${product.title}', ${product.price})">Añadir al Carrito</button>
                </div>
            </div>
        `;
        productDetail.classList.remove('hidden');
    } catch (error) {
        console.error('Error obteniendo detalles del producto:', error);
    }
}

// Array del carrito para almacenar productos añadidos
let cart = [];

// Cargar carrito desde localStorage y sessionStorage
function loadCartFromStorage() {
    const storedCart = localStorage.getItem('cart') || sessionStorage.getItem('cart');
    if (storedCart) {
        cart = JSON.parse(storedCart);
        updateCart();
    }
}

// Añadir un producto al carrito
function addToCart(id, title, price) {
    cart.push({ id, title, price });
    saveCartToStorage();
    updateCart();
    alert('Producto añadido al carrito!');
}

// Guardar carrito en localStorage y sessionStorage
function saveCartToStorage() {
    localStorage.setItem('cart', JSON.stringify(cart));
    sessionStorage.setItem('cart', JSON.stringify(cart));
}

// Actualizar y mostrar el carrito
function updateCart() {
    // Obtener los elementos del carrito y el total del carrito
    const cartItems = document.getElementById('cart-items');
    const cartTotal = document.getElementById('cart-total');
    cartItems.innerHTML = '';

    let total = 0;
    // Crear elementos de lista para cada producto en el carrito y añadirlos a los elementos del carrito
    cart.forEach(item => {
        const li = document.createElement('li');
        li.classList.add('list-group-item', 'd-flex', 'justify-content-between', 'align-items-center');
        li.textContent = item.title;
        const span = document.createElement('span');
        span.classList.add('badge', 'bg-primary', 'rounded-pill');
        span.textContent = `$${item.price}`;
        li.appendChild(span);
        cartItems.appendChild(li);
        total += item.price;
    });

    // Actualizar el total del carrito
    cartTotal.textContent = total.toFixed(2);
    document.getElementById('cart').classList.remove('hidden');
}
