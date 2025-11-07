import { obtenerProductos } from './api.js';

document.addEventListener('DOMContentLoaded', async () => {
  const contenedor = document.querySelector(".productos");
  
  if (!contenedor) return; // Por si no existe el contenedor

  try {
    const productos = await obtenerProductos();

    if (!productos.length) {
      contenedor.innerHTML = "<p>No se pudieron cargar los productos.</p>";
      return;
    }

    productos.forEach(p => {
      const card = document.createElement("article");
      card.classList.add("card");
      card.innerHTML = `
        <div class="imagen">
          <img src="${p.imagen}" alt="${p.nombre}">
        </div>
        <h3>${p.nombre}</h3>
        <p>Precio: $${p.precio}</p>
        <a href="productos-detalle.html?id=${'producto.id'}" class="btn-ver">Ver</a>
      `;
      contenedor.appendChild(card);
    });
  } catch (error) {
    console.error("Error al cargar productos:", error);
    contenedor.innerHTML = "<p>Error al cargar los productos.</p>";
  }
});
