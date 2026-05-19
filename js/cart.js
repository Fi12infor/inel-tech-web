// Constantes de elementos del DOM
const cartBtn = document.querySelector(".btn-carrito");
const badge = document.querySelector(".cart-badge");

// Obtener datos guardados en localStorage
let total = Number(localStorage.getItem("total_badge")) || 0;
let productCart = JSON.parse(localStorage.getItem("cart")) || [];

// Mostrar total de productos en la badge
badge.textContent = total;

// Redirección a la pagina del carrito
cartBtn.addEventListener("click", () => {
  window.location.href = "./cart.html";
});

// Funcion para detectar clicks en los botones de compra
document.addEventListener("click", (e) => {
  // Detectar si se hizo click en un boton de compra
  const btn = e.target.closest(".product-buy");

  // Si no existe boton salir de la funcion
  if (!btn) return;

  // Incrementar total de productos
  total++;

  // Guardar total en localStorage
  localStorage.setItem("total_badge", total);

  // Mostrar nuevo total en la badge
  badge.textContent = total;

  // Obtener id del producto
  const productId = Number(btn.dataset.id);

  // Buscar si el producto ya existe en el carrito
  const existingProductIndex = productCart.findIndex(
    (item) => item.id === productId,
  );

  // Si el producto existe incrementar cantidad
  if (existingProductIndex !== -1) {
    productCart[existingProductIndex].quantity++;
  } else {
    // Si no existe añadir producto al carrito
    productCart.push({
      id: productId,
      quantity: 1,
    });
  }

  // Guardar carrito actualizado
  localStorage.setItem("cart", JSON.stringify(productCart));
});

// Funcion para obtener productos desde el JSON
async function fetchProducts() {
  const response = await fetch("./data/products.json");
  const data = await response.json();

  return data;
}

// Funcion para renderizar productos del carrito
async function renderCart() {
  // Obtener contenedor del carrito
  const container = document.querySelector(".cart-container");

  // Si no existe el contenedor salir de la funcion
  if (!container) return;

  // Obtener productos del JSON
  const products = await fetchProducts();

  // Obtener carrito guardado
  const cart = JSON.parse(localStorage.getItem("cart")) || [];

  // Variable para almacenar HTML
  let html = "";

  // Recorrer productos del carrito
  cart.forEach((cartItem) => {
    // Buscar informacion del producto
    const productData = products.find((product) => product.id === cartItem.id);

    // Si no existe producto salir
    if (!productData) return;

    // Añadir card del producto al HTML
    html += `
      <div class="cart-card">
        <img src="${productData.image}" alt="${productData.nombre}">

        <div class="details">
          <h3>${productData.nombre}</h3>
          <p class="price">Precio: $${productData.precio}</p>
          <p class="quantity">Cantidad: ${cartItem.quantity}</p>
        </div>

        <button class="remove-btn" data-id="${cartItem.id}">
          <svg xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            stroke-width="2"
            stroke-linecap="round"
            stroke-linejoin="round"
            class="lucide lucide-trash-icon lucide-trash">

            <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6"/>
            <path d="M3 6h18"/>
            <path d="M8 6V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"/>
          </svg>

          Eliminar
        </button>
      </div>
    `;
  });

  // Insertar HTML en el contenedor
  container.innerHTML = html;
}

// Ejecutar renderizado del carrito
renderCart();

// Funcion para eliminar productos del carrito
document.addEventListener("click", (e) => {
  // Detectar click en boton eliminar
  const btnRemove = e.target.closest(".remove-btn");

  // Si no existe boton salir
  if (!btnRemove) return;

  // Obtener id del producto
  const productId = Number(btnRemove.dataset.id);

  // Buscar producto en el carrito
  const product = productCart.find((item) => item.id === productId);

  // Si no existe salir
  if (!product) return;

  // Si tiene mas de una unidad reducir cantidad
  if (product.quantity > 1) {
    product.quantity--;
  } else {
    // Si solo tiene una unidad eliminar producto
    productCart = productCart.filter((item) => item.id !== productId);
  }

  // Guardar carrito actualizado
  localStorage.setItem("cart", JSON.stringify(productCart));

  // Recalcular total de productos
  total = productCart.reduce((acc, item) => acc + item.quantity, 0);

  console.log(total);

  // Guardar nuevo total
  localStorage.setItem("total_badge", total);

  // Actualizar badge
  if (badge) {
    badge.textContent = total;
  }

  // Volver a renderizar carrito
  renderCart();
});
