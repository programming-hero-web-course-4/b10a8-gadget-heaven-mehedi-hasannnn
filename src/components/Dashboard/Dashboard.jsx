import React, { useEffect, useState } from "react";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";

const Dashboard = () => {
  const [allGadgets, setAllGadgets] = useState([]);
  const [cartListed, setCartListed] = useState([]);
  const [wishListed, setWishListed] = useState([]);
  const [activeTab, setActiveTab] = useState("cart"); 
  const [isSorted, setIsSorted] = useState(false); 
  const navigate = useNavigate(); 

  const getStoredCartList = () => {
    const storedList = localStorage.getItem("cart-list");
    return storedList ? JSON.parse(storedList) : [];
  };

  const getStoredWishList = () => {
    const storedList = localStorage.getItem("wish-list");
    return storedList ? JSON.parse(storedList) : [];
  };

  useEffect(() => {
    const fetchGadgets = async () => {
      const gadgetsData = await fetch("/gadgetsData.json");
      const gadgets = await gadgetsData.json();
      setAllGadgets(gadgets);
    };

    fetchGadgets();
  }, []);

  useEffect(() => {
    const storedCartList = getStoredCartList();
    const storedWishList = getStoredWishList();

    const cartList = allGadgets.filter((gadget) =>
      storedCartList.includes(gadget.product_id)
    );

    const wishList = allGadgets.filter((gadget) =>
      storedWishList.includes(gadget.product_id)
    );

    setCartListed(cartList);
    setWishListed(wishList);
  }, [allGadgets]);

  const addToStoredWishList = (id) => {
    const storedList = getStoredWishList();

    if (storedList.includes(id)) {
      Swal.fire({
        position: "center",
        icon: "error",
        title: "Item already exists in the wishlist",
        showConfirmButton: false,
        timer: 1500,
      });
    } else {
      storedList.push(id);
      localStorage.setItem("wish-list", JSON.stringify(storedList));
      Swal.fire({
        position: "center",
        icon: "success",
        title: "Item has been added to the wishlist",
        showConfirmButton: false,
        timer: 1500,
      });

      setWishListed((prevWishlist) => [
        ...prevWishlist,
        allGadgets.find((gadget) => gadget.product_id === id),
      ]);
    }
  };

  const addToCart = (id) => {
    const item = allGadgets.find((gadget) => gadget.product_id === id);

  
    const updatedCart = [...cartListed, item];
    localStorage.setItem("cart-list", JSON.stringify(updatedCart));


    const updatedWishList = wishListed.filter((gadget) => gadget.product_id !== id);
    localStorage.setItem("wish-list", JSON.stringify(updatedWishList));

    
    setCartListed(updatedCart);
    setWishListed(updatedWishList);

    Swal.fire({
      position: "center",
      icon: "success",
      title: "Item has been added to the cart",
      showConfirmButton: false,
      timer: 1500,
    });
  };

  const totalPrice = cartListed.reduce((sum, item) => sum + item.price, 0);


  const sortCartItems = () => {
    const sortedCart = [...cartListed].sort((a, b) => b.price - a.price);
    setCartListed(sortedCart);
    setIsSorted(!isSorted); 
  };

  const handlePurchase = () => {
    Swal.fire({
      title: "Congratulations!",
      text: "Your purchase was successful.",
      icon: "success",
      confirmButtonText: "Close",
    }).then(() => {
     
      localStorage.setItem("cart-list", JSON.stringify([])); 
      setCartListed([]); 
      navigate("/"); 
    });
  };

  return (
    <div>
      <div className='bg-purple-600 text-center p-10 mb-4 '>
            <h2 className="text-4xl text-white  font-bold">Product Statistics</h2>
            <p className="text-white mt-4 ">
            Explore the latest gadgets that will take your experience to the next level. From smart devices to the coolest accessories, we have it all!
            </p>
            </div>

     
      <div className="flex gap-4 mb-6 justify-center">
        <button
          className={`px-4 py-2 rounded ${
            activeTab === "cart" ? "bg-gray-400 rounded-xl font-bold text-purple-600" : "bg-purple-600 font-bold text-white"
          }`}
          onClick={() => setActiveTab("cart")}
        >
          My Cart
        </button>
        <button
          className={`px-4 py-2 rounded ${
            activeTab === "wishlist" ? "bg-gray-400 rounded-xl font-bold text-purple-600" : "bg-purple-600 font-bold text-white"
          }`}
          onClick={() => setActiveTab("wishlist")}
        >
          My Wish List
        </button>
      </div>

     
      {activeTab === "cart" ? (
        <div className="mx-5 my-5">
          
          <div className="flex justify-between items-center mb-2">

  <div>
    <h2 className="text-xl font-semibold">My Cart</h2>
  </div>

  <div className="flex items-center space-x-4">
 
    <h3 className="text-lg font-semibold">
      Total Price: <span className="text-blue-500">${totalPrice}</span>
    </h3>

    <button
      onClick={sortCartItems}
      className="px-4 py-2 bg-blue-500 text-white rounded"
    >
      Sort by Price
    </button>

    <button
      onClick={handlePurchase}
      className="px-4 py-2 bg-green-500 text-white rounded"
      disabled={cartListed.length === 0 || totalPrice === 0}
    >
      Purchase
    </button>
  </div>
</div>



          {cartListed.length > 0 ? (
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
              {cartListed.map((item) => (
                <div
                  key={item.product_id}
                  className="border p-4 rounded shadow-lg flex flex-col items-center"
                >
                  <img
                    src={item.product_image}
                    alt={item.product_title}
                    className="w-32 h-32 object-cover mb-2"
                  />
                  <h3 className="font-semibold">{item.product_title}</h3>
                  <p>{item.description}</p>
                  <p>Price:${item.price}</p>
                </div>
              ))}
            </div>
          ) : (
            <p>No items in the cart yet.</p>
          )}
        </div>
      ) : (
        <div>
          <h2 className="text-xl font-semibold mb-2">My Wish List</h2>
          {wishListed.length > 0 ? (
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
              {wishListed.map((item) => (
                <div
                  key={item.product_id}
                  className="border p-4 rounded shadow-lg flex flex-col items-center"
                >
                  <img
                    src={item.product_image}
                    alt={item.product_title}
                    className="w-32 h-32 object-cover mb-2"
                  />
                  <h3 className="font-semibold">{item.product_title}</h3>
                  <p>{item.description}</p>
                  <p>${item.price}</p>

             
                  <button
                    onClick={() => addToCart(item.product_id)}
                    className="mt-2 px-4 py-2 bg-blue-500 text-white rounded"
                  >
                    Add to Cart
                  </button>
                </div>
              ))}
            </div>
          ) : (
            <p>No items in the wishlist yet.</p>
          )}
        </div>
      )}
    </div>
  );
};

export default Dashboard;
