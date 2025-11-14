import { AIRTABLE_API_KEY, AIRTABLE_BASE_ID, AIRTABLE_TABLE_NAME } from './env.js';
import { obtenerProductos } from './api.js';

const form = document.getElementById('formProducto');
const tabla = document.querySelector('#tablaProductos tbody');
let productoEditando = null;


async function cargarProductos() {
  const productos = await obtenerProductos();
  tabla.innerHTML = '';

  productos.forEach(prod => {
    const fila = document.createElement('tr');
    fila.innerHTML = `
      <td>${prod.nombre}</td>
      <td>${prod.descripcion}</td>
      <td><img src="${prod["imagen"] || 'https://placehold.co/60?text=Sin+Img'}" width="60"></td>
      <td>${prod.precio}</td>
      <td>
        <button class="btn-ver" data-id="${prod.id}" data-accion="editar">✏️</button>
        <button class="btn-ver" data-id="${prod.id}" data-accion="eliminar">🗑️</button>
      </td>
    `;
    tabla.appendChild(fila);
  });
}


form.addEventListener('submit', async (e) => {
  e.preventDefault();

 const nombre = document.getElementById("nombre").value.trim();
const descripcion = document.getElementById("descripcion").value.trim(); 
const imagen = document.getElementById("imagen").value.trim();
const precio = parseFloat(document.getElementById("precio").value) || 0;

const producto = {
  fields: {
    "Nombre-producto": nombre,
    "Descripción": descripcion,
    "imagen": [{ url: imagen }],

    "Precio": precio
  }
};


  try {
    const url = `https://api.airtable.com/v0/${AIRTABLE_BASE_ID}/${AIRTABLE_TABLE_NAME}${productoEditando ? '/' + productoEditando : ''}`;
    const method = productoEditando ? 'PATCH' : 'POST';

    const resp = await fetch(url, {
      method,
      headers: {
        Authorization: `Bearer ${AIRTABLE_API_KEY}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(producto)
    });

    const result = await resp.json();
    console.log("Respuesta al guardar:", result);

    if (!resp.ok) throw new Error(result.error?.message || "Error al guardar");

    alert(productoEditando ? "Producto actualizado" : "Producto agregado");
    productoEditando = null;
    form.reset();
    cargarProductos();

  } catch (err) {
    console.error(err);
    alert("❌ Error al guardar en Airtable. Revisa la consola (F12).");
  }
});


tabla.addEventListener('click', async (e) => {
  if (!e.target.dataset.accion) return;
  const id = e.target.dataset.id;

  if (e.target.dataset.accion === 'editar') {
    productoEditando = id;
    const fila = e.target.closest('tr').children;
    document.getElementById('nombre').value = fila[0].textContent;
    document.getElementById('descripcion').value = fila[1].textContent;
    document.getElementById('imagen').value = fila[2].querySelector('img').src;
    document.getElementById('precio').value = fila[3].textContent.replace('$', '');
  }

  if (e.target.dataset.accion === 'eliminar') {
    if (confirm('¿Seguro que querés eliminar este producto?')) {
      try {
        const resp = await fetch(`https://api.airtable.com/v0/${AIRTABLE_BASE_ID}/${AIRTABLE_TABLE_NAME}/${id}`, {
          method: 'DELETE',
          headers: { Authorization: `Bearer ${AIRTABLE_API_KEY}` }
        });
        if (!resp.ok) throw new Error('Error al eliminar');
        alert('Producto eliminado');
        cargarProductos();
      } catch (err) {
        console.error(err);
        alert('No se pudo eliminar el producto');
      }
    }
  }
});


cargarProductos();
