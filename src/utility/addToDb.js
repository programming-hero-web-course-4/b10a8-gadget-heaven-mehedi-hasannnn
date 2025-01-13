import Swal from "sweetalert2";

const getStoredCartList = () =>{
    // cartList
    const storedListStr = localStorage.getItem('cart-list');
    if(storedListStr){
        const storedList = JSON.parse(storedListStr);
        return storedList;
    }
    else{
        return [];
    }
}

const addToStoredCartList = (id) =>{
    const storedList = getStoredCartList();
    if(storedList.includes(id)){
        console.log(id, 'already exists in the cart')
        Swal.fire({
            position: "center",
            icon: "error",
            title:  "Item already exists in the cart",
            showConfirmButton: false,
            timer: 1500
          });
    }
    else{
        storedList.push(id);
        const storedListStr = JSON.stringify(storedList);
        localStorage.setItem('cart-list', storedListStr);
        Swal.fire({
            position: "center",
            icon: "success",
            title:  "Item has been added to the cart",
            showConfirmButton: false,
            timer: 1500
          });
    }
}

// for wishlist

const getStoredWishList = () => {
    // read-list
    const storedWishListStr = localStorage.getItem('wish-list');
    if (storedWishListStr) {
        const storedWishList = JSON.parse(storedWishListStr);
        return storedWishList;
    }
    else {
        return [];
    }
}

const addToStoredWishList = (id) => {
    const storedWishList = getStoredWishList();
    if (storedWishList.includes(id)) {
        // already exists. do not add it
        console.log(id, 'already exists in the read list');
        Swal.fire({
            position: "center",
            icon: "error",
            title:  "Item already exists in the Wishlist",
            showConfirmButton: false,
            timer: 1500
          });
    }
    else {
        storedWishList.push(id);
        const storedWishListStr = JSON.stringify(storedWishList);
        localStorage.setItem('wish-list', storedWishListStr);
        Swal.fire({
            position: "center",
            icon: "success",
            title:  "Item has been added to the Wishlist",
            showConfirmButton: false,
            timer: 1500
          });
    }
}


export { addToStoredCartList, addToStoredWishList, getStoredWishList , getStoredCartList};