import { updateCartValue } from "./updateCartValue";

export const getLSCartProd = () => {
    let cartProducts = localStorage.getItem("cartProductLS");
    if(!cartProducts){
        return [];
    }
    cartProducts = JSON.parse(cartProducts);

    // show the cart button value
    updateCartValue(cartProducts);

    return cartProducts;
};