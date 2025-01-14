import { getLSCartProd } from "./getLSCartProd";

export const addToCart = (event, id, stock) => {
    let arrLocalStorageProd = getLSCartProd();
    const currentProdElem = document.querySelector(`#card${id}`);
    // console.log(currentProdElem);
    let quantity = currentProdElem.querySelector('.productQuantity').innerText;
    let price = currentProdElem.querySelector('.productPrice').innerText;
    // console.log(quantity, price);
    price = price.replace("₹", "");
    price = Number(price * quantity);
    quantity = Number(quantity);

    let updateCart = {id, quantity, price};
    console.log(updateCart);
    arrLocalStorageProd.push(updateCart);
    localStorage.setItem("cartProductLS", JSON.stringify(arrLocalStorageProd));
};