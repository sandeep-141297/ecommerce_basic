import products from "./api/products.json";
import { getLSCartProd } from "./getLSCartProd";
import { fetchQtyFromLS } from "./fetchQtyFromLS";
import { removeCartProd } from "./removeCartProd";
import { incrementDecrementProd } from "./incrementDecrementProd";
import { updateCartProdTotal } from "./updateCartProdTotal";

let cartProducts = getLSCartProd();

// console.log(cartProducts);

let filterProducts = products.filter((curProd) => {
    return cartProducts.some((curElem) => curElem.id === curProd.id);

    // const cartProductIds = cartProducts.map((curElem) => curElem.id);
    // return cartProductIds.includes(curProd.id);

    // return cartProducts.map((curElem) => curElem.id === curProd.id);
    // return cartProducts.includes(curProd.id);
    // console.log(curProd);
});

// console.log(filterProducts);

// to update the addtocart page
const cartElement = document.querySelector("#productCartContainer");
const templateContainer = document.querySelector("#productCartTemplate");

const showCartProducts = () => {
    filterProducts.forEach((curProd) => {
        const { category, id, image, name, stock, price } = curProd;
        // console.log(curProd);
        
        let productClone = document.importNode(templateContainer.content, true);

        const lSActualData = fetchQtyFromLS(id, price);

        productClone.querySelector("#cardValue").setAttribute("id", `card${id}`);
        productClone.querySelector(".category").textContent = category;
        productClone.querySelector(".productName").textContent = name;
        productClone.querySelector(".productImage").src = image;
        productClone.querySelector(".productImage").alt = name;

        productClone.querySelector(".productQuantity").textContent = lSActualData.quantity;
        productClone.querySelector(".productPrice").textContent = lSActualData.price;
        productClone.querySelector(".productQuantity").setAttribute("data-quantity", lSActualData.quantity);

        productClone.querySelector(".stockElement").addEventListener("click", (event) => {
            incrementDecrementProd(event, id, stock, price);
        });
        
        productClone.querySelector(".remove-to-cart-button").addEventListener("click", () => removeCartProd(id));

        cartElement.appendChild(productClone);
    })
};

// showing the cart products
showCartProducts();


// calculating the cart total in our cartProducts page
updateCartProdTotal();
















































// The issue lies in how the different array methods (`some`, `map`, and `includes`) operate and how you're attempting to use them. Here's an explanation:

// ### 1. **Why `some` works as expected:**
//    - The `some` method checks if **any element** in the `cartProducts` array satisfies the condition.
//    - Your code:

//?      cartProducts.some((curElem) => curElem.id === curProd.id);

//      - `curElem` refers to an object in `cartProducts`.
//      - This checks if any object in `cartProducts` has an `id` matching the current product's `id` in `products`.

//      Result: It correctly returns `true` if a match exists, and `false` otherwise, which is perfect for filtering.


// ### 2. **Why `map` doesn't work:**
//    - The `map` method transforms the elements of the array and returns a **new array**.
//    - Your code:

//?      cartProducts.map((curElem) => curElem.id === curProd.id);

//      - This creates an array of boolean values (`true` or `false`) for each `curElem` in `cartProducts`, indicating whether `curElem.id` matches `curProd.id`.
//      - However, `filter` expects a boolean (`true` or `false`) directly for each `curProd`.

//      Result: The `filter` method cannot use the array returned by `map`.


// ### 3. **Why `includes` doesn't work:**
//    - The `includes` method checks if an **element** exists in the array.
//    - Your code:

//?      cartProducts.includes(curProd.id);

//      - Here, `cartProducts` is an array of objects, but you're trying to check for the existence of a single `id` (a primitive value).
//      - Since `curProd.id` is not an object, `includes` will not find a match.

//      To make `includes` work, you need an array of `id`s:

//      const cartProductIds = cartProducts.map((curElem) => curElem.id);
//      cartProductIds.includes(curProd.id);


//      Result: `includes` works after transforming `cartProducts` into an array of `id`s.


// ### Corrected Code:
//? let filterProducts = products.filter((curProd) => {
//     return cartProducts.some((curElem) => curElem.id === curProd.id);
//     // OR
//     // const cartProductIds = cartProducts.map((curElem) => curElem.id);
//     // return cartProductIds.includes(curProd.id);
//? });

// console.log(filterProducts);


// ### Key Takeaways:
// - Use `some` for checking if at least one element matches a condition.
// - Use `map` for transforming arrays (e.g., extracting `id`s).
// - Use `includes` with arrays of primitives (like `id`s), not objects.
