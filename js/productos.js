// productos.js
import { obtenerProductos } from './api.js';

document.addEventListener('DOMContentLoaded', async () => {
    const contenedorProductos = document.querySelector(".productos");

    const productos = await obtenerProductos();

    productos.forEach(producto => {
        const articulo = document.createElement("article");
        articulo.classList.add("card");
        articulo.innerHTML = `
            <div class="imagen">
                <img src="${producto.imagen}" alt="${producto.nombre}">
                <span class="icono-corazon"><i class="bi bi-heart-fill"></i></span>
            </div>
            <p>Precio: $${producto.precio}</p>
            <a href="Productos-detalle.html?id=${producto.id}" class="btn-ver">Ver</a>
        `;
        contenedorProductos.appendChild(articulo);
    });
});
