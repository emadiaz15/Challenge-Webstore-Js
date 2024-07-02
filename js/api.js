// URL base de la API
const API_BASE_URL = 'https://fakestoreapi.com';

// Función genérica para realizar solicitudes a la API
async function apiRequest(endpoint) {
    try {
        const response = await fetch(`${API_BASE_URL}${endpoint}`);
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        return await response.json();
    } catch (error) {
        console.error(`Error en la solicitud a la API: ${error.message}`);
        return null;
    }
}
export default apiRequest()