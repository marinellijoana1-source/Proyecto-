// detalle.js
import { obtenerProductos } from './api.js';

document.addEventListener('DOMContentLoaded', async () => {
    const urlParams = new URLSearchParams(window.location.search);
    const id = urlParams.get("id");
    const productos = await obtenerProductos();
    const producto = productos.find(p => p.id === id);

    if (!producto) return;

    document.querySelector(".nombre").textContent = producto.nombre;
    document.querySelector(".precio").textContent = "$" + producto.precio;
    document.getElementById("detalle-imagen").src = producto.imagen;

    const btnAgregar = document.querySelector(".btn-agregar");
    btnAgregar.addEventListener("click", () => {
        let carrito = JSON.parse(localStorage.getItem("carrito")) || [];
        const existente = carrito.find(p => p.id === producto.id);
        if (existente) {
            existente.cantidad++;
        } else {
            carrito.push({
                id: producto.id,
                nombre: producto.nombre,
                precio: producto.precio,
                cantidad: 1
            });
        }
        localStorage.setItem("carrito", JSON.stringify(carrito));
        alert(`${producto.nombre} agregado al carrito ✅`);
    });
});
