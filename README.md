# Challenge-Webstore-Js

## Descripción

Esta es una aplicación web de tienda virtual desarrollada para explorar productos de diferentes categorías utilizando la API proporcionada por [FakeStoreAPI](https://fakestoreapi.com). Los usuarios pueden navegar entre las categorías de productos, ver detalles de productos individuales y simular compras agregando productos a un carrito de compras.

## Características

- **Listar Categorías**: Muestra una lista de todas las categorías disponibles. Cada categoría es clicable para permitir a los usuarios ver los productos dentro de esa categoría.
- **Visualizar Productos por Categoría**: Muestra una lista de productos pertenecientes a la categoría seleccionada, incluyendo nombre, precio e imagen representativa de cada producto.
- **Detalle del Producto**: Permite a los usuarios hacer clic en un producto para ver su detalle, incluyendo descripción, precio e imagen.
- **Simulación de Compra**: Los usuarios pueden agregar productos al carrito desde la vista de detalle del producto. Se proporciona retroalimentación confirmando que el producto ha sido agregado correctamente al carrito.
- **Carrito de Compras**: Los usuarios pueden ver los productos que han agregado al carrito, eliminar productos del carrito si lo desean y ver el precio total de los productos en el carrito. Los datos del carrito se almacenan utilizando `localStorage` y `sessionStorage`.

## Instalación

1. Clona este repositorio en tu máquina local:

   ```bash
   git clone https://github.com/tu-usuario/fake-store-webapp.git

   ```

2. Navega al directorio del proyecto:

   ```bash
   cd fake-store-webapp

   ```

3. Abre el archivo index.html en tu navegador web para ver la aplicación en acción.

## Uso

- **Navegar Categorías**: Utiliza la barra de navegación para seleccionar diferentes categorías de productos.
- **Ver Detalles del Producto**: Haz clic en un producto para ver más detalles.
- **Agregar al Carrito**: En la vista de detalle del producto, haz clic en "Añadir al Carrito" para agregar el producto al carrito.
- **Ver Carrito**: El carrito se encuentra en la esquina superior derecha de la página. Puedes ver los productos añadidos, eliminar productos y ver el total del carrito.

### Tecnologías Utilizadas

HTML5
CSS3
JavaScript
Bootstrap 5.3
FakeStoreAPI
