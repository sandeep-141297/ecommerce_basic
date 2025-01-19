export function showToast(operation, id) {
    const toast = document.createElement("div");
    toast.classList.add("toast");

    // set the text content of the toast based on operation
    if(operation === "add") {
        toast.textContent = `Product with ID ${id} has been added`;
    } else {
        toast.textContent = `Product with ID ${id} has been deleted`;
    }

    document.body.append(toast);

    //automatically remove the toast after few seconds
    setTimeout(() => {
        toast.remove();
    }, 2000);
};