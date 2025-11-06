// carrito.js
document.addEventListener('DOMContentLoaded', () => {
    const listaCarrito = document.getElementById("lista-carrito");
    const totalElemento = document.getElementById("total");
    const btnVaciar = document.getElementById("vaciar-carrito");

    let carrito = JSON.parse(localStorage.getItem("carrito")) || [];
    mostrarCarrito();

    function mostrarCarrito() {
        listaCarrito.innerHTML = "";
        carrito.forEach((producto, index) => {
            const li = document.createElement("li");
            li.textContent = `${producto.nombre} - $${producto.precio} x ${producto.cantidad}`;

            const btnEliminar = document.createElement("button");
            btnEliminar.textContent = "❌";
            btnEliminar.addEventListener("click", () => {
                carrito.splice(index, 1);
                actualizarCarrito();
            });

            li.appendChild(btnEliminar);
            listaCarrito.appendChild(li);
        });

        const total = carrito.reduce((acc, p) => acc + p.precio * p.cantidad, 0);
        totalElemento.textContent = total;
    }

    btnVaciar.addEventListener("click", () => {
        carrito = [];
        actualizarCarrito();
    });

    function actualizarCarrito() {
        localStorage.setItem("carrito", JSON.stringify(carrito));
        mostrarCarrito();
    }
});
