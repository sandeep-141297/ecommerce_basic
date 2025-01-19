import { getLSCartProd } from "./getLSCartProd";

export const updateCartProdTotal = () => {
    const productSubTotal = document.querySelector(".productSubTotal");
    const productFinalTotal = document.querySelector(".productFinalTotal");

    // get data from local storage
    let localStorageProd = getLSCartProd();
    let initialValue = 0;

    let totalProductsPrice = localStorageProd.reduce((accum, curElem) => {
        let productPrice = parseFloat(curElem.price) || 0;
        return accum + productPrice;
    }, initialValue);

    // console.log(totalProductsPrice);

    if(totalProductsPrice > 0){
        productSubTotal.textContent = `₹${totalProductsPrice.toFixed(2)}`;
        productFinalTotal.textContent = `₹${(totalProductsPrice + 50).toFixed(2)}`;
    } else {
        productSubTotal.textContent = '₹0';
        productFinalTotal.textContent = '₹0';
    }
    
}