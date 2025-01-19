import { getLSCartProd } from "./getLSCartProd";
import { showToast } from "./showToast";
import { updateCartProdTotal } from "./updateCartProdTotal";
import { updateCartValue } from "./updateCartValue";

export const removeCartProd = (id) => {
    let locaLSData = getLSCartProd();
    locaLSData = locaLSData.filter((curProd) => curProd.id !== id);

    // update the localstorage after remove product
    localStorage.setItem("cartProductLS", JSON.stringify(locaLSData));

    // update cart div after remove prod from LS
    let removeDiv = document.getElementById(`card${id}`);

    if(removeDiv) {
        removeDiv.remove();
        // show toast when product remove from cart
        showToast("delete", id);
    }

    // update cart button
    updateCartValue(locaLSData);

    // calculating the cart total in our cartProducts page
    updateCartProdTotal();
}