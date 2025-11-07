import { obtenerProductos } from './api.js';

document.addEventListener('DOMContentLoaded', async () => {
  const params = new URLSearchParams(window.location.search);
  const id = params.get('id'); // obtenemos el ID desde la URL

  if (!id) {
    document.querySelector('.productos-detalle').innerHTML = "<p>No se especificó ningún producto.</p>";
    return;
  }

  try {
    const productos = await obtenerProductos();
    const producto = productos.find(p => p.id === id);

    if (!producto) {
      document.querySelector('.productos-detalle').innerHTML = "<p>Producto no encontrado.</p>";
      return;
    }

    document.querySelector('#detalle-imagen').src = producto.imagen;
    document.querySelector('#detalle-imagen').alt = producto.nombre;
    document.querySelector('.nombre').textContent = producto.nombre;
    document.querySelector('.precio').textContent = `$${producto.precio}`;
    document.querySelector('.descripcion').textContent = producto.descripcion;

  } catch (error) {
    console.error("Error al cargar detalle del producto:", error);
    document.querySelector('.detalle-producto').innerHTML = "<p>Error al cargar el producto.</p>";
  }
});
