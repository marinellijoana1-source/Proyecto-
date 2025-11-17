document.addEventListener('DOMContentLoaded', () => {
  const contenedor = document.getElementById("lista-carrito");
  const totalElemento = document.getElementById("total");
  const btnVaciar = document.getElementById("vaciar");
  const btnFinalizar = document.getElementById("finalizar");

  function cargarCarrito() {
    const carrito = JSON.parse(localStorage.getItem("carrito")) || [];

    contenedor.innerHTML = "";

    if (carrito.length === 0) {
      contenedor.innerHTML = "<p>Tu carrito está vacío </p>";
      totalElemento.textContent = "0";
      return;
    }

    let total = 0;
    carrito.forEach(producto => {
      total += producto.precio * producto.cantidad;

      const item = document.createElement("div");
      item.classList.add("item-carrito");
      item.innerHTML = `
        <img src="${producto.imagen}" alt="${producto.nombre}" width="80">
        <div>
          <h3>${producto.nombre}</h3>
          <p>Precio: $${producto.precio}</p>
          <p>Cantidad: ${producto.cantidad}</p>
          <button class="btn-ver btn-eliminar" data-id="${producto.id}">Eliminar</button>

        </div>
      `;
      contenedor.appendChild(item);
    });

    totalElemento.textContent = total.toFixed(2);
  }

  
  contenedor.addEventListener("click", e => {
    if (e.target.classList.contains("btn-eliminar")) {
      const id = e.target.dataset.id;
      let carrito = JSON.parse(localStorage.getItem("carrito")) || [];
      carrito = carrito.filter(p => p.id !== id);
      localStorage.setItem("carrito", JSON.stringify(carrito));
      cargarCarrito();
    }
  });

  
  btnVaciar.addEventListener("click", () => {
    localStorage.removeItem("carrito");
    cargarCarrito();
  });


  btnFinalizar.addEventListener("click", () => {
    const carrito = JSON.parse(localStorage.getItem("carrito")) || [];
    if (carrito.length === 0) {
      alert("Tu carrito está vacío 🛒");
      return;
    }
    window.location.href = "checkout.html";
  });

  cargarCarrito();
});
