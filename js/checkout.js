document.addEventListener('DOMContentLoaded', () => {
  const form = document.getElementById('checkout-form');
  const listaCarrito = document.getElementById('lista-carrito');
  const totalCarrito = document.getElementById('total-carrito');

  // 🛒 Cargar productos del carrito
  let carrito = JSON.parse(localStorage.getItem('carrito')) || [];

  function mostrarResumenCarrito() {
    listaCarrito.innerHTML = '';
    let total = 0;

    carrito.forEach((producto) => {
      const li = document.createElement('li');
      li.textContent = `${producto.nombre} - $${producto.precio} x ${producto.cantidad}`;
      listaCarrito.appendChild(li);
      total += producto.precio * producto.cantidad;
    });

    totalCarrito.textContent = `Total: $${total}`;
  }

  mostrarResumenCarrito();

  // 💳 Enviar formulario
  form.addEventListener('submit', (e) => {
    e.preventDefault();

    const nombre = document.getElementById('nombre').value.trim();
    const email = document.getElementById('email').value.trim();
    const direccion = document.getElementById('direccion').value.trim();
    const numeroTarjeta = document.getElementById('numero-tarjeta').value.trim();
    const nombreTarjeta = document.getElementById('nombre-tarjeta').value.trim();
    const vencimiento = document.getElementById('vencimiento').value.trim();
    const cvv = document.getElementById('cvv').value.trim();

    if (!nombre || !email || !direccion || !numeroTarjeta || !nombreTarjeta || !vencimiento || !cvv) {
      alert("⚠️ Por favor, completá todos los campos antes de continuar.");
      return;
    }

    alert(`✅ ¡Gracias por tu compra, ${nombre}! 
Tu pedido será enviado a: ${direccion}.`);

    // Vaciar carrito después del pago
    localStorage.removeItem('carrito');
    form.reset();
    listaCarrito.innerHTML = '';
    totalCarrito.textContent = 'Total: $0';
  });
});
