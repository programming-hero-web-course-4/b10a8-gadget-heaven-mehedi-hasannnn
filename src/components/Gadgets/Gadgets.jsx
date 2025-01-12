import React, { useEffect, useState } from 'react';
import Gadget from '../Gadget/Gadget';

const Gadgets = () => {
    const [gadgets, setGadgets] = useState([]);
    const [filteredGadgets, setFilteredGadgets] = useState([]);
    const [activeCategory, setActiveCategory] = useState("All Products");

    useEffect(() => {
        fetch('./gadgetsData.json')
            .then((res) => res.json())
            .then((data) => {
                setGadgets(data);
                setFilteredGadgets(data); 
            });
    }, []);

    const handleFilter = (category) => {
        setActiveCategory(category);
        if (category === "All Products") {
            setFilteredGadgets(gadgets);
        } else {
            setFilteredGadgets(gadgets.filter((gadget) => gadget.category === category));
        }
    };

    return (
        <div>
            <h2 className="text-4xl font-bold text-center my-6 lg:my-10">Explore Cutting-Edge Gadgets</h2>
<div className="flex flex-col lg:flex-row overflow-hidden overflow-y-auto">
            
            <div className="w-full lg:w-1/5 bg-gray-100 p-4 shadow-md">
                <h3 className="text-xl font-semibold mb-4 text-center lg:text-left">Filter by Category</h3>
                <button
                    className={`btn w-full mb-2 ${activeCategory === "All Products" ? "bg-purple-600 text-white" : "bg-white border-purple-600 text-purple-600"}`}
                    onClick={() => handleFilter("All Products")}
                >
                    All Products
                </button>
                <button
                    className={`btn w-full mb-2 ${activeCategory === "laptops" ? "bg-purple-600 text-white" : "bg-white border-purple-600 text-purple-600"}`}
                    onClick={() => handleFilter("laptops")}
                >
                    Laptops
                </button>
                <button
                    className={`btn w-full mb-2 ${activeCategory === "phones" ? "bg-purple-600 text-white" : "bg-white border-purple-600 text-purple-600"}`}
                    onClick={() => handleFilter("phones")}
                >
                    Phones
                </button>
                <button
                    className={`btn w-full ${activeCategory === "smart watches" ? "bg-purple-600 text-white" : "bg-white border-purple-600 text-purple-600"}`}
                    onClick={() => handleFilter("smart watches")}
                >
                    Smart Watches
                </button>
            </div>

            <div className="w-full lg:w-4/5 p-4 lg:p-6">
                

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                    {filteredGadgets.length > 0 ? (
                        filteredGadgets.map((gadget) => (
                            <Gadget gadget={gadget} key={gadget.product_id} />
                        ))
                    ) : (
                        <p className="text-center col-span-full text-gray-500">
                            No products available in this category.
                        </p>
                    )}
                </div>
            </div>
        </div>

        </div>
    );
};

export default Gadgets;
