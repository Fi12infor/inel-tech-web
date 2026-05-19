const cartBtn = document.querySelector(".btn-carrito")
const buyBtn = document.querySelectorAll(".product-buy")
const badge = document.querySelector(".cart-badge")

function getProduct() {
    console.log(buyBtn.data.id)
}

// Redirección a la pagina del carrito
cartBtn.addEventListener("click", () => {
    window.location.href = "./cart.html"
})

// Funcion para añadir productos al carrito

