const URL = "./productos.json"
const contenedorProductos = document.querySelector(".productos");

function crearAtriculoProducto (producto) {
    const articuloProducto = document.createElement("article");
    articuloProducto.setAttribute("class", "card");
    articuloProducto.setAttribute("id", producto.id);

    articuloProducto.innerHTML = `
      <div class="imagen">
        <img src="${producto.imagen}" alt="${producto.nombre}">
        <span class="icono-corazon"><i class="bi bi-heart-fill"></i></span>
      </div>
      <p>Precio: $${producto.precio}</p>
      <a href="Product-detail.html?id=${producto.id}" class="btn-ver">Ver</a>
      `

      return articuloProducto
}

fetch(URL)
  .then(response => response.json())
  .then(productos => {
    productos.forEach((producto) => {
    const articuloProducto = crearAtriculoProducto(producto);
    contenedorProductos.appendChild(articuloProducto);
})
  })


const urlParams = new URLSearchParams(window.location.search);
const id = parseInt(urlParams.get("id"));

if(!isNaN(id)){
  const producto = productos.find(p => p.id === id);
  if(producto){
    const nombreElem = document.querySelector(".nombre");
    const precioElem = document.querySelector(".precio");
    const imgElem = document.getElementById("detalle-imagen");

    nombreElem.textContent = producto.nombre;
    precioElem.textContent = "$" + producto.precio;
    imgElem.src = producto.imagen;

    const btnAgregar = document.querySelector(".btn-agregar");
    btnAgregar.addEventListener("click", () => {
      let carrito = JSON.parse(localStorage.getItem("carrito")) || [];
      const productoExistente = carrito.find(p => p.id === producto.id);
      if(productoExistente){
        productoExistente.cantidad++;
      } else {
        carrito.push({ id: producto.id, nombre: producto.nombre, precio: producto.precio, cantidad: 1 });
      }
      localStorage.setItem("carrito", JSON.stringify(carrito));
      alert(`${producto.nombre} agregado al carrito ✅`);
    });
  }
}


const listaCarrito = document.getElementById("lista-carrito");
if(listaCarrito){
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
}

