
const productos = [
  { id: 1, nombre: "Campera Piña. Talle del 8 al 12", 
    precio: 41000, imagen: "imagen/imagen1.png.jpeg" },
  { id: 2, nombre: "Chaleco de paño marrón, Pantanón de jean.Talle del 8 al 10",
     precio: 35000, imagen: "imagen/imagen2.png.jpeg" },
  { id: 3, nombre: "Enterito rayado. Talle del 1 a 6 meses", 
    precio: 25000, imagen: "imagen/imgbebe.png" },
  { id: 4, nombre: "Sueter con volados, Calza estampada. Talle de 6 al 12",
     precio: 30000, imagen: "imagen/imagenn.png.jpeg" }
];


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

