import { getLSCartProd } from "./getLSCartProd";

export const fetchQtyFromLS = (id, price) => {
    let locaLSData = getLSCartProd();

    // console.log(locaLSData);

    let existingProduct = locaLSData.find((curProd) => curProd.id === id);
    let quantity = 1;

    if(existingProduct) {
        quantity = existingProduct.quantity;
        price = existingProduct.price;
    }

    // console.log(quantity, price);

    return { quantity, price };
}