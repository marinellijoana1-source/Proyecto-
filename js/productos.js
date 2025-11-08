import { obtenerProductos } from './api.js';

document.addEventListener("DOMContentLoaded", async () => {
  const contenedor = document.querySelector(".productos");
  const inputBuscar = document.querySelector("#buscador");
  const btnBuscar = document.querySelector("#btnBuscar");

  let productos = [];

  // Función para mostrar los productos en pantalla
  function mostrarProductos(lista) {
    contenedor.innerHTML = "";

    if (lista.length === 0) {
      contenedor.innerHTML = "<p>No se encontraron productos.</p>";
      return;
    }

    lista.forEach(producto => {
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
  }

  try {
    productos = await obtenerProductos();
    mostrarProductos(productos);
  } catch (error) {
    console.error("Error al cargar productos:", error);
    contenedor.innerHTML = "<p>Error al cargar los productos.</p>";
  }

  // --- 🔍 BUSCADOR ---
  btnBuscar.addEventListener("click", () => {
    const texto = inputBuscar.value.toLowerCase().trim();
    const filtrados = productos.filter(p =>
      p.nombre.toLowerCase().includes(texto)
    );
    mostrarProductos(filtrados);
  });

  // También buscar al presionar Enter
  inputBuscar.addEventListener("keyup", e => {
    if (e.key === "Enter") {
      const texto = inputBuscar.value.toLowerCase().trim();
      const filtrados = productos.filter(p =>
        p.nombre.toLowerCase().includes(texto)
      );
      mostrarProductos(filtrados);
    }
  });
});
