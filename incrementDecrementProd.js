import { getLSCartProd } from "./getLSCartProd";
import { updateCartProdTotal } from "./updateCartProdTotal";

export const incrementDecrementProd = (event, id, stock, price) => {
    const currentCardElement = document.querySelector(`#card${id}`);
    const productQuantity = currentCardElement.querySelector(".productQuantity");
    const productPrice = currentCardElement.querySelector(".productPrice");

    let quantity = 1;
    let localStoragePrice = 0;

    // get data from local storage
    let localStorageProd = getLSCartProd();

    let existingProd = localStorageProd.find((curProd) => curProd.id === id);

    if(existingProd) {
        quantity = existingProd.quantity;
        localStoragePrice = existingProd.price;
    } else {
        localStoragePrice = price;
        price = price;
    }

    if(event.target.className === "cartIncrement"){
        if (quantity < stock) {
            quantity += 1;
        } else if(quantity === stock) {
            quantity = stock;
            alert(`You are trying to add more products than the available stock.\nCurrent quantity in cart: ${Number(existingProd.quantity)}.\nNote: The maximum stock for this product is ${stock}.`);
            localStoragePrice = price * quantity;
        }
    } 

    if(event.target.className === "cartDecrement"){
        if (quantity > 1) {
            quantity -= 1;
        } 
    }

    // finally will update the price in localstorage
    localStoragePrice = price * quantity;
    localStoragePrice = Number(localStoragePrice.toFixed(2));

    let updateLSCart = {id, quantity, price: localStoragePrice};
    updateLSCart = localStorageProd.map((curProd) => {
        return curProd.id === id ? updateLSCart : curProd;
    });

    localStorage.setItem("cartProductLS", JSON.stringify(updateLSCart));

    // reflect on screen as well
    productQuantity.innerText = quantity;
    productQuantity.setAttribute("data-quantity", quantity);
    productPrice.innerText = localStoragePrice;

    // calculating the cart total in our cartProducts page
    updateCartProdTotal();
};