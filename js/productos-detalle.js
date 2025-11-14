import { obtenerProductos } from './api.js';


function actualizarCantidadCarrito() {
  const carrito = JSON.parse(localStorage.getItem('carrito')) || [];
  const cantidadTotal = carrito.reduce((acc, producto) => acc + producto.cantidad, 0);
  const cantidadElem = document.getElementById('cantidad-carrito');
  if (cantidadElem) {
    cantidadElem.textContent = cantidadTotal;
  }
}

document.addEventListener('DOMContentLoaded', async () => {
  const params = new URLSearchParams(window.location.search);
  const id = params.get('id');
  const btnAgregar = document.getElementById('btnAgregarCarrito');
  const img = document.querySelector('#detalle-imagen');
  const nombreElem = document.querySelector('.nombre');
  const precioElem = document.querySelector('.precio');
  const descripcionElem = document.querySelector('.descripcion');

  
  actualizarCantidadCarrito();

  if (!id) {
    document.querySelector('.detalle-producto').innerHTML = "<p>No se especificó ningún producto.</p>";
    return;
  }

  try {
    const productos = await obtenerProductos();
    const producto = productos.find(p => p.id === id);

    if (!producto) {
      document.querySelector('.detalle-producto').innerHTML = "<p>Producto no encontrado.</p>";
      return;
    }

    img.src = producto.imagen;
    img.alt = producto.nombre;
    nombreElem.textContent = producto.nombre;
    precioElem.textContent = `$${producto.precio}`;
    descripcionElem.textContent = producto.descripcion || "";

    
    btnAgregar.addEventListener('click', () => {
      let carrito = JSON.parse(localStorage.getItem('carrito')) || [];

      const productoExistente = carrito.find(p => p.id === producto.id);
      if (productoExistente) {
        productoExistente.cantidad += 1;
      } else {
        carrito.push({
          id: producto.id,
          nombre: producto.nombre,
          precio: producto.precio,
          imagen: producto.imagen,
          cantidad: 1
        });
      }

      localStorage.setItem('carrito', JSON.stringify(carrito));
      actualizarCantidadCarrito(); 
      alert(`✅ "${producto.nombre}" se agregó al carrito.`);
    });

  } catch (error) {
    console.error("Error al cargar detalle del producto:", error);
    document.querySelector('.detalle-producto').innerHTML = "<p>Error al cargar el producto.</p>";
  }
});
