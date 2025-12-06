import { obtenerProductos } from './api.js';

document.addEventListener("DOMContentLoaded", async () => {
  const contenedor = document.querySelector(".productos");
  const inputBuscar = document.querySelector("#buscador");
  const btnBuscar = document.querySelector("#btnBuscar");
  const botonesCategorias = document.querySelectorAll(".categorias a");

  let productos = [];

  function actualizarCantidadCarrito() {
    const carrito = JSON.parse(localStorage.getItem('carrito')) || [];
    const cantidadTotal = carrito.reduce((acc, p) => acc + p.cantidad, 0);
    const cantidadElem = document.getElementById('cantidad-carrito');
    if (cantidadElem) cantidadElem.textContent = cantidadTotal;
  }

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
    actualizarCantidadCarrito();
  } catch (error) {
    console.error("Error al cargar productos:", error);
    contenedor.innerHTML = "<p>Error al cargar los productos.</p>";
  }

  btnBuscar.addEventListener("click", () => {
    const texto = inputBuscar.value.toLowerCase().trim();
    const filtrados = productos.filter(p =>
      p.nombre.toLowerCase().includes(texto)
    );
    mostrarProductos(filtrados);
  });

  inputBuscar.addEventListener("keyup", e => {
    if (e.key === "Enter") {
      const texto = inputBuscar.value.toLowerCase().trim();
      const filtrados = productos.filter(p =>
        p.nombre.toLowerCase().includes(texto)
      );
      mostrarProductos(filtrados);
    }
  });

  botonesCategorias.forEach(boton => {
    boton.addEventListener("click", (e) => {
      e.preventDefault();

      const categoria = boton.dataset.categoria;

      if (!categoria || categoria.trim() === "") {
        mostrarProductos(productos);
        return;
      }

      const filtrados = productos.filter(p =>
        p.categoria &&
        p.categoria.toLowerCase() === categoria.toLowerCase()
      );

      mostrarProductos(filtrados);
    });
  });

});
