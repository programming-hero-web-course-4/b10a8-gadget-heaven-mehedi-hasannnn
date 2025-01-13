import React, { useEffect, useState } from "react";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";

const Dashboard = () => {
  const [allGadgets, setAllGadgets] = useState([]);
  const [cartListed, setCartListed] = useState([]);
  const [wishListed, setWishListed] = useState([]);
  const [activeTab, setActiveTab] = useState("cart"); // Tabs: "cart" or "wishlist"
  const [isSorted, setIsSorted] = useState(false); // To toggle the sorting order
  const navigate = useNavigate(); // Hook for navigation

  // Function to get the stored cart list from localStorage
  const getStoredCartList = () => {
    const storedList = localStorage.getItem("cart-list");
    return storedList ? JSON.parse(storedList) : [];
  };

  // Function to get the stored wishlist from localStorage
  const getStoredWishList = () => {
    const storedList = localStorage.getItem("wish-list");
    return storedList ? JSON.parse(storedList) : [];
  };

  // Fetch all gadgets on component mount
  useEffect(() => {
    const fetchGadgets = async () => {
      const gadgetsData = await fetch("/gadgetsData.json");
      const gadgets = await gadgetsData.json();
      setAllGadgets(gadgets);
    };

    fetchGadgets();
  }, []);

  // Update cartListed and wishListed whenever allGadgets changes
  useEffect(() => {
    const storedCartList = getStoredCartList();
    const storedWishList = getStoredWishList();

    // Filter gadgets based on product_id in storedCartList
    const cartList = allGadgets.filter((gadget) =>
      storedCartList.includes(gadget.product_id)
    );

    const wishList = allGadgets.filter((gadget) =>
      storedWishList.includes(gadget.product_id)
    );

    setCartListed(cartList);
    setWishListed(wishList);
  }, [allGadgets]);

  // Function to add a gadget to the wishlist
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

      // Update the wishlist state
      setWishListed((prevWishlist) => [
        ...prevWishlist,
        allGadgets.find((gadget) => gadget.product_id === id),
      ]);
    }
  };

  // Function to add a gadget to the cart from the wishlist
  const addToCart = (id) => {
    // Find the item from the wishlist
    const item = allGadgets.find((gadget) => gadget.product_id === id);

    // Add item to the cart list
    const updatedCart = [...cartListed, item];
    localStorage.setItem("cart-list", JSON.stringify(updatedCart));

    // Remove item from wishlist
    const updatedWishList = wishListed.filter((gadget) => gadget.product_id !== id);
    localStorage.setItem("wish-list", JSON.stringify(updatedWishList));

    // Update the state
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

  // Calculate total price of items in the cart
  const totalPrice = cartListed.reduce((sum, item) => sum + item.price, 0);

  // Function to sort the cart items by price in descending order
  const sortCartItems = () => {
    const sortedCart = [...cartListed].sort((a, b) => b.price - a.price);
    setCartListed(sortedCart);
    setIsSorted(!isSorted); // Toggle the sorting state
  };

  // Function to handle the purchase action
  const handlePurchase = () => {
    Swal.fire({
      title: "Congratulations!",
      text: "Your purchase was successful.",
      icon: "success",
      confirmButtonText: "Close",
    }).then(() => {
      // Clear the cart and reset the total price
      localStorage.setItem("cart-list", JSON.stringify([])); // Clear the cart in localStorage
      setCartListed([]); // Clear the cart state
      navigate("/"); // Navigate to the home page
    });
  };

  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">Dashboard</h1>

      {/* Tabs */}
      <div className="flex gap-4 mb-6">
        <button
          className={`px-4 py-2 rounded ${
            activeTab === "cart" ? "bg-blue-500 text-white" : "bg-gray-200 text-gray-800"
          }`}
          onClick={() => setActiveTab("cart")}
        >
          My Cart
        </button>
        <button
          className={`px-4 py-2 rounded ${
            activeTab === "wishlist" ? "bg-blue-500 text-white" : "bg-gray-200 text-gray-800"
          }`}
          onClick={() => setActiveTab("wishlist")}
        >
          My Wish List
        </button>
      </div>

      {/* Tab Content */}
      {activeTab === "cart" ? (
        <div>
          <div className="flex justify-between mx-5">
            <h2 className="text-xl font-semibold mb-2">My Cart</h2>

            {/* Sort by Price Button */}
            <button
              onClick={sortCartItems}
              className="px-4 py-2 bg-blue-500 text-white rounded"
            >
              Sort by Price
            </button>

            {/* Purchase Button */}
            <button
              onClick={handlePurchase}
              className="px-4 py-2 bg-green-500 text-white rounded ml-2"
              disabled={cartListed.length === 0 || totalPrice === 0} // Disable if cart is empty or total price is 0
            >
              Purchase
            </button>

            {/* Total Price Section */}
            <h3 className="text-lg font-semibold">
              <span>
                Total Price: <span className="text-blue-500">${totalPrice}</span>
              </span>
            </h3>
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

                  {/* Add to Cart Button */}
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
