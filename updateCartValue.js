const cartValue = document.querySelector("#cartValue");

export const updateCartValue = (totalCartItems) => {
    return (cartValue.innerHTML = `<i class="fa-solid fa-cart-shopping"> ${totalCartItems.length} </i>`);
}