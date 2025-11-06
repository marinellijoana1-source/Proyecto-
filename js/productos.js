import { obtenerProductos } from './api.js';

document.addEventListener('DOMContentLoaded', async () => {
    const contenedorProductos = document.querySelector(".productos");
    const inputBusqueda = document.querySelector(".busqueda input");
    const btnBusqueda = document.querySelector(".busqueda button");

    let productos = await obtenerProductos();

    // 🔹 Función para mostrar productos en el DOM
    function mostrarProductos(lista) {
        contenedorProductos.innerHTML = ""; // Limpia el contenedor
        lista.forEach(producto => {
            const articulo = document.createElement("article");
            articulo.classList.add("card");
            articulo.innerHTML = `
                <div class="imagen">
                    <img src="${producto.imagen}" alt="${producto.nombre}">
                    <span class="icono-corazon"><i class="bi bi-heart-fill"></i></span>
                </div>
                <p>${producto.nombre}</p>
                <p>Precio: $${producto.precio}</p>
                <a href="Productos-detalle.html?id=${producto.id}" class="btn-ver">Ver</a>
            `;
            contenedorProductos.appendChild(articulo);
        });
    }

    // 🔹 Mostrar todos los productos al cargar
    mostrarProductos(productos);

    // 🔹 Filtro de búsqueda
    function filtrarProductos() {
        const texto = inputBusqueda.value.toLowerCase().trim();
        const filtrados = productos.filter(p =>
            p.nombre.toLowerCase().includes(texto)
        );
        mostrarProductos(filtrados);
    }

    // 🔹 Eventos para buscar
    btnBusqueda.addEventListener("click", filtrarProductos);
    inputBusqueda.addEventListener("keyup", (e) => {
        if (e.key === "Enter") filtrarProductos();
    });
});

