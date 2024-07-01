// app.js
document.addEventListener('DOMContentLoaded', () => {
    fetchCategories();
    loadCartFromLocalStorage();
});

// Fetch categories from the API and display them
async function fetchCategories() {
    try {
        const response = await fetch('https://fakestoreapi.com/products/categories');
        const categories = await response.json();

        const categoriesList = document.getElementById('categories');
        categories.forEach(category => {
            const li = document.createElement('li');
            li.textContent = category;
            li.classList.add('nav-item', 'nav-link', 'text-dark');
            li.addEventListener('click', () => fetchProductsByCategory(category));
            categoriesList.appendChild(li);
        });
    } catch (error) {
        console.error('Error fetching categories:', error);
    }
}

// Fetch products by category and display them
async function fetchProductsByCategory(category) {
    try {
        const response = await fetch(`https://fakestoreapi.com/products/category/${category}`);
        const products = await response.json();

        const productList = document.getElementById('product-list');
        productList.innerHTML = ''; // Clear previous products
        products.forEach(product => {
            const productDiv = document.createElement('div');
            productDiv.classList.add('product', 'card', 'm-3');
            productDiv.style.width = '18rem';
            productDiv.innerHTML = `
                <img src="${product.image}" class="card-img-top" alt="${product.title}">
                <div class="card-body">
                    <h5 class="card-title">${product.title}</h5>
                    <p class="card-text">$${product.price}</p>
                    <button class="btn btn-primary" onclick="fetchProductDetail(${product.id})">View Details</button>
                </div>
            `;
            productList.appendChild(productDiv);
        });
    } catch (error) {
        console.error(`Error fetching products for category ${category}:`, error);
    }
}

// Fetch product detail and display it
async function fetchProductDetail(productId) {
    try {
        const response = await fetch(`https://fakestoreapi.com/products/${productId}`);
        const product = await response.json();

        const productDetail = document.getElementById('product-detail');
        productDetail.innerHTML = `
            <div class="card">
                <img src="${product.image}" class="card-img-top" alt="${product.title}">
                <div class="card-body">
                    <h5 class="card-title">${product.title}</h5>
                    <p class="card-text">${product.description}</p>
                    <p class="card-text">$${product.price}</p>
                    <button class="btn btn-success" onclick="addToCart(${product.id}, '${product.title}', ${product.price})">Add to Cart</button>
                </div>
            </div>
        `;
        productDetail.classList.remove('hidden');
    } catch (error) {
        console.error('Error fetching product detail:', error);
    }
}

// Cart array to store added products
let cart = [];

// Load cart from localStorage
function loadCartFromLocalStorage() {
    const storedCart = localStorage.getItem('cart');
    if (storedCart) {
        cart = JSON.parse(storedCart);
        updateCart();
    }
}

// Add a product to the cart
function addToCart(id, title, price) {
    cart.push({ id, title, price });
    saveCartToLocalStorage();
    updateCart();
    alert('Product added to cart!');
}

// Save cart to localStorage
function saveCartToLocalStorage() {
    localStorage.setItem('cart', JSON.stringify(cart));
}

// Update and display the cart
function updateCart() {
    const cartItems = document.getElementById('cart-items');
    const cartTotal = document.getElementById('cart-total');
    cartItems.innerHTML = '';

    let total = 0;
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

    cartTotal.textContent = total.toFixed(2);
    document.getElementById('cart').classList.remove('hidden');
}
