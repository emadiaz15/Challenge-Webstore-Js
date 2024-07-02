import apiRequest from './api.js';

// Función para obtener las categorías desde la API
async function fetchCategories() {
    const categories = await apiRequest('/products/categories');
    return categories || [];
}

// Función para mostrar las categorías en el navbar
