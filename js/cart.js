const cartBtn = document.querySelector(".btn-carrito")
const buyBtn = document.querySelectorAll(".product-buy")
const badge = document.querySelector(".cart-badge")
let productsStorage = window.localStorage // Creamos un almacenamiento local para guardar los id de los productos y el numero de productos total que guardamos
let numerBadgeStorage = window.localStorage
let nBadge = 0
let productCart = []

// Redirección a la pagina del carrito
cartBtn.addEventListener("click", () => {
    window.location.href = "./cart.html"
})

// Obtener el total de productos
total = productsStorage.getItem("total_badge")


console.log(typeof(total))

    

// Mostrar el total de productos en el carrito
badge.textContent = total
let cartCount = 0
// Funcion para detectar el click en el boton de cada producto
document.addEventListener("click", e => {
    if (e.target.classList.contains("product-buy")) {
        console.log(e.target.dataset.id)
        cartCount += 1
        total += cartCount
        // badge.textContent = nBadge
        numerBadgeStorage.setItem("total_badge", total)
        productsStorage.setItem("productos", productCart)
        badge.textContent = productsStorage.getItem("total_badge")
    }
})
