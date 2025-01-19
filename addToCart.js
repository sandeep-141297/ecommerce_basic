import { getLSCartProd } from "./getLSCartProd";
import { showToast } from "./showToast";
import { updateCartValue } from "./updateCartValue";

// to get the cart data from localStorage
// to update the cart value and also to get the data always ready from localStorage
getLSCartProd();

// to add the data into localStorage
export const addToCart = (event, id, stock) => {
    let arrLocalStorageProd = getLSCartProd();
    const currentProdElem = document.querySelector(`#card${id}`);
    // console.log(currentProdElem);
    let quantity = currentProdElem.querySelector('.productQuantity').innerText;
    let price = currentProdElem.querySelector('.productPrice').innerText;
    // console.log(quantity, price);
    price = price.replace("₹", "");

    let existingProd = arrLocalStorageProd.find((curProd) => curProd.id === id);

    // console.log(existingProd.quantity);

    if((existingProd && quantity > 1)) {
        // let receivedQty = quantity;
        quantity = Number(existingProd.quantity) + Number(quantity);
        // console.log(quantity);
        if(quantity <= stock) {
            price = Number(price * quantity).toFixed(2);
            let updateCart = {id, quantity, price};
            updateCart = arrLocalStorageProd.map((curProd) => {
                return curProd.id === id ? updateCart : curProd;
            });
            // console.log(updateCart);
            
            localStorage.setItem("cartProductLS", JSON.stringify(updateCart));
            // show toast when product add to cart
            showToast("add", id);
        } else {
            alert(`You are trying to add more products than the available stock.\nCurrent quantity in cart: ${Number(existingProd.quantity)}.\nAttempted total quantity: ${Number(quantity)}.\nNote: The maximum stock for this product is ${stock}.`);
            // quantity = receivedQty;
        }
    }

    if(existingProd){
        return false;
    }

    price = Number(price * quantity).toFixed(2);
    quantity = Number(quantity);

    // let updateCart = {id, quantity, price};
    // console.log(updateCart);
    arrLocalStorageProd.push({id, quantity, price});
    localStorage.setItem("cartProductLS", JSON.stringify(arrLocalStorageProd));

    // update the cart button value
    updateCartValue(arrLocalStorageProd);

    // show toast when product add to cart
    showToast("add", id);
};