import { obtenerProductos } from './api.js';

document.addEventListener("DOMContentLoaded", async () => {
  const contenedor = document.querySelector(".productos");

  try {
    const productos = await obtenerProductos();

    contenedor.innerHTML = ""; // Limpiamos el contenedor por si acaso

    productos.forEach(producto => {
      const articulo = document.createElement("article");
      articulo.classList.add("card");

      articulo.innerHTML = `
        <div class="imagen">
          <img src="${producto.imagen}" alt="${producto.nombre}">
        </div>
        <h3>${producto.nombre}</h3>
        <p class="precio">$${producto.precio}</p>
        <a href="productos-detalle.html?id=${producto.id}" class="btn-ver">Ver</a>
      `;

      contenedor.appendChild(articulo);
    });

  } catch (error) {
    console.error("Error al cargar productos:", error);
    contenedor.innerHTML = "<p>Error al cargar los productos.</p>";
  }
});

