// api.js

// Función para obtener todas las categorías desde la API
async function fetchCategories() {
    const response = await fetch('https://fakestoreapi.com/products/categories');
    const categories = await response.json();
    return categories;
}

// Función para obtener productos por categoría desde la API
async function fetchProductsByCategory(category) {
    const response = await fetch(`https://fakestoreapi.com/products/category/${category}`);
    const products = await response.json();
    displayProducts(products); // Mostrar productos obtenidos
}

// Función para obtener detalles de un producto por ID desde la API
async function fetchProductById(productId) {
    const response = await fetch(`https://fakestoreapi.com/products/${productId}`);
    const product = await response.json();
    return product;
}
