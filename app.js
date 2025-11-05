document.addEventListener('DOMContentLoaded', () => {

    const AIRTABLE_API_KEY = "pat4gX2qoL4gmFOVq.def11c80ce07fae5085477047e1bce2c1c181a9adf4cebf84232146287d1f0fc"; 
    const AIRTABLE_BASE_ID = "appMU7tXjFzWPHHmN";                
    const AIRTABLE_TABLE_NAME = "productos";              

    const airtableUrl = `https://api.airtable.com/v0/${AIRTABLE_BASE_ID}/${AIRTABLE_TABLE_NAME}`;

   
    const contenedorProductos = document.querySelector(".productos");
    const urlParams = new URLSearchParams(window.location.search);
    const id = urlParams.get("id");

    
    function crearAtriculoProducto(producto) {
        const articuloProducto = document.createElement("article");
        articuloProducto.setAttribute("class", "card");
        articuloProducto.setAttribute("id", producto.id);

        articuloProducto.innerHTML = `
          <div class="imagen">
            <img src="${producto.imagen}" alt="${producto['nombre-producto']}">
            <span class="icono-corazon"><i class="bi bi-heart-fill"></i></span>
          </div>
          <p>Precio: $${producto.precio}</p>
          <a href="Product-detail.html?id=${producto.id}" class="btn-ver">Ver</a>
        `
        return articuloProducto;
    }

    
    async function cargarYMostrarProductos() {
        try {
            const response = await fetch(airtableUrl, {
                headers: {
                    'Authorization': `Bearer ${AIRTABLE_API_KEY}`
                }
            });

            if (!response.ok) {
                throw new Error(`Error de la API: ${response.statusText}`);
            }

            const data = await response.json();
            
            
            const productos = data.records.map(record => {
                const fields = record.fields;
                return {
                    id: record.id,
                    'nombre-producto': fields['Nombre-producto'] || 'Sin nombre',
                    precio: fields.Precio || 0,
                    imagen: fields.imagen && fields.imagen.length > 0 ? fields.imagen[0].url : 'https://via.placeholder.com/300x300.png?text=Sin+Imagen'
                };
            });

            
            productos.forEach((producto) => {
                const articuloProducto = crearAtriculoProducto(producto);
                contenedorProductos.appendChild(articuloProducto);
            });

            
            if (!isNaN(id)) {
                setupProductDetailPage(productos);
            }

        } catch (error) {
            console.error("No se pudieron cargar los productos:", error);
            if(contenedorProductos) {
                contenedorProductos.innerHTML = '<p class="error-message">No se pudieron cargar los productos. Revisa la consola.</p>';
            }
        }
    }

    
    function setupProductDetailPage(productos) {
        const producto = productos.find(p => p.id === id);
        if (producto) {
            const nombreElem = document.querySelector(".nombre");
            const precioElem = document.querySelector(".precio");
            const imgElem = document.getElementById("detalle-imagen");

            nombreElem.textContent = producto['nombre-producto'];
            precioElem.textContent = "$" + producto.precio;
            imgElem.src = producto.imagen;

            const btnAgregar = document.querySelector(".btn-agregar");
            btnAgregar.addEventListener("click", () => {
                let carrito = JSON.parse(localStorage.getItem("carrito")) || [];
                const productoExistente = carrito.find(p => p.id === producto.id);
                if (productoExistente) {
                    productoExistente.cantidad++;
                } else {
                    carrito.push({ id: producto.id, nombre: producto['nombre-producto'], precio: producto.precio, cantidad: 1 });
                }
                localStorage.setItem("carrito", JSON.stringify(carrito));
                alert(`${producto['nombre-producto']} agregado al carrito ✅`);
            });
        }
    }

    
    const listaCarrito = document.getElementById("lista-carrito");
    if (listaCarrito) {
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

    
    cargarYMostrarProductos();

});