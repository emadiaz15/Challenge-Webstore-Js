// category.js

// Función para mostrar las categorías en el dropdown del navbar y en la lista de categorías
function displayCategories(categories) {
    const dropdownNavbar = document.querySelector('#dropdownNavbar ul');

    categories.forEach(category => {
        // Añadir categorías al dropdown del navbar
        const dropdownItem = document.createElement('li');
        const dropdownLink = document.createElement('a');
        dropdownLink.textContent = category;
        dropdownLink.href = "#";
        dropdownLink.classList.add('block', 'px-4', 'py-2', 'hover:bg-gray-100', 'dark:hover:bg-gray-600', 'dark:hover:text-white');
        dropdownLink.addEventListener('click', () => {
            fetchProductsByCategory(category);
            selectedCategoryElement.textContent = `Categoría seleccionada: ${category}`;
            document.getElementById('products').scrollIntoView(); // Añadir esta línea
        });
        dropdownItem.appendChild(dropdownLink);
        dropdownNavbar.appendChild(dropdownItem);
    });
}

// Fetch de categorías y despliegue
fetchCategories().then(displayCategories);


