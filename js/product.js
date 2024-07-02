// product.js

// Función para mostrar los productos en tarjetas
function displayProducts(products) {
    const productList = document.getElementById('product-list');
    productList.innerHTML = ''; // Limpiar la lista de productos

    products.forEach(product => {
        // Crear tarjeta de producto
        const productCard = document.createElement('div');
        productCard.classList.add('w-full', 'max-w-sm', 'bg-white', 'border', 'border-gray-200', 'rounded-lg', 'shadow', 'dark:bg-gray-800', 'dark:border-gray-700', 'transform', 'transition', 'duration-500', 'hover:scale-105', 'hover:bg-gray-100', 'dark:hover:bg-gray-700');

        const productImageLink = document.createElement('a');
        productImageLink.href = `product-details.html?id=${product.id}`;  // Aquí se pone la URL de detalle del producto
        
        const productImage = document.createElement('img');
        productImage.classList.add('p-8', 'rounded-t-lg');
        productImage.src = product.image;
        productImage.alt = product.title;
        
        productImageLink.appendChild(productImage);
        productCard.appendChild(productImageLink);

        const productBody = document.createElement('div');
        productBody.classList.add('px-5', 'pb-5');

        const productTitleLink = document.createElement('a');
        productTitleLink.href = `product-details.html?id=${product.id}`;  // Aquí se pone la URL de detalle del producto
        
        const productTitle = document.createElement('h5');
        productTitle.classList.add('text-xl', 'font-semibold', 'tracking-tight', 'text-gray-900', 'dark:text-white');
        productTitle.textContent = product.title;
        
        productTitleLink.appendChild(productTitle);
        productBody.appendChild(productTitleLink);

        const productRating = document.createElement('div');
        productRating.classList.add('flex', 'items-center', 'mt-2.5', 'mb-5');

        const stars = document.createElement('div');
        stars.classList.add('flex', 'items-center', 'space-x-1', 'rtl:space-x-reverse');
        
        for (let i = 0; i < 5; i++) {
            const star = document.createElement('svg');
            star.classList.add('w-4', 'h-4');
            star.setAttribute('aria-hidden', 'true');
            star.setAttribute('xmlns', 'http://www.w3.org/2000/svg');
            star.setAttribute('fill', 'currentColor');
            star.setAttribute('viewBox', '0 0 22 20');

            const path = document.createElement('path');
            if (i < 4) {
                path.setAttribute('d', 'M20.924 7.625a1.523 1.523 0 0 0-1.238-1.044l-5.051-.734-2.259-4.577a1.534 1.534 0 0 0-2.752 0L7.365 5.847l-5.051.734A1.535 1.535 0 0 0 1.463 9.2l3.656 3.563-.863 5.031a1.532 1.532 0 0 0 2.226 1.616L11 17.033l4.518 2.375a1.534 1.534 0 0 0 2.226-1.617l-.863-5.03L20.537 9.2a1.523 1.523 0 0 0 .387-1.575Z');
                star.classList.add('text-yellow-300');
            } else {
                path.setAttribute('d', 'M20.924 7.625a1.523 1.523 0 0 0-1.238-1.044l-5.051-.734-2.259-4.577a1.534 1.534 0 0 0-2.752 0L7.365 5.847l-5.051.734A1.535 1.535 0 0 0 1.463 9.2l3.656 3.563-.863 5.031a1.532 1.532 0 0 0 2.226 1.616L11 17.033l4.518 2.375a1.534 1.534 0 0 0 2.226-1.617l-.863-5.03L20.537 9.2a1.523 1.523 0 0 0 .387-1.575Z');
                star.classList.add('text-gray-200', 'dark:text-gray-600');
            }
            
            star.appendChild(path);
            stars.appendChild(star);
        }

        const ratingBadge = document.createElement('span');
        ratingBadge.classList.add('bg-blue-100', 'text-blue-800', 'text-xs', 'font-semibold', 'px-2.5', 'py-0.5', 'rounded', 'dark:bg-blue-200', 'dark:text-blue-800', 'ms-3');
        ratingBadge.textContent = '5.0';

        productRating.appendChild(stars);
        productRating.appendChild(ratingBadge);
        productBody.appendChild(productRating);

        const productFooter = document.createElement('div');
        productFooter.classList.add('flex', 'items-center', 'justify-between');

        const productPrice = document.createElement('span');
        productPrice.classList.add('text-3xl', 'font-bold', 'text-gray-900', 'dark:text-white');
        productPrice.textContent = `$${product.price}`;

        const addToCartBtn = document.createElement('button');
        addToCartBtn.classList.add('text-white', 'bg-blue-700', 'hover:bg-blue-800', 'focus:ring-4', 'focus:outline-none', 'focus:ring-blue-300', 'font-medium', 'rounded-lg', 'text-sm', 'px-5', 'py-2.5', 'text-center', 'dark:bg-blue-600', 'dark:hover:bg-blue-700', 'dark:focus:ring-blue-800');
        addToCartBtn.textContent = 'Add to cart';

        addToCartBtn.addEventListener('click', (event) => {
            event.preventDefault();
            addToCart(product.id, product.title, product.price);
        });

        productFooter.appendChild(productPrice);
        productFooter.appendChild(addToCartBtn);
        productBody.appendChild(productFooter);
        productCard.appendChild(productBody);
        productList.appendChild(productCard);

        // Añadir evento click para mostrar detalles del producto
        productCard.addEventListener('click', (event) => {
            event.preventDefault();
            window.location.href = `product-details.html?id=${product.id}`;
        });
    });
    addToCartBtn.addEventListener('click', (event) => {
        event.preventDefault();
        addToCart(product.id, product.title, product.price);
    });
    
}

// Función para mostrar los detalles de un producto
function showProductDetails(product) {
    const productDetails = document.getElementById('product-details');
    const productInfo = document.getElementById('product-info');
    productDetails.classList.remove('hidden');
    productInfo.innerHTML = `
        <h3 class="text-xl font-semibold">${product.title}</h3>
        <img src="${product.image}" alt="${product.title}" class="w-1/2">
        <p>${product.description}</p>
        <p>Precio: $${product.price}</p>
    `;
    const addToCartBtn = document.getElementById('add-to-cart');
    addToCartBtn.onclick = () => addToCart(product.id, product.title, product.price);
}
