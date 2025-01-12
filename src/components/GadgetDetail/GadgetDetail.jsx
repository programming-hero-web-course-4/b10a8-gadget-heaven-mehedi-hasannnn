import React from 'react';
import { Link, useLoaderData, useParams } from 'react-router-dom';

const GadgetDetail = () => {
    const { product_id } = useParams();
    const data = useLoaderData();
    const gadget = data.find(gadget => gadget.product_id === product_id);

    const {
        product_image,
        product_title,
        price,
        description,
        Specification, 
        availability,
        rating,
    } = gadget;

    const renderStars = (rating) => {
        const fullStars = Math.floor(rating);
        const halfStar = rating % 1 !== 0;
        const emptyStars = 5 - Math.ceil(rating);

        return (
            <>
                {Array(fullStars).fill(<span>★</span>)}
                {halfStar && <span>☆</span>}
                {Array(emptyStars).fill(<span>☆</span>)}
            </>
        );
    };

    return (
        <div className="flex flex-col md:flex-row items-center gap-8 p-6">
           
            <div className="flex-shrink-0">
                <img
                    src={product_image}
                    alt={product_title}
                    className="rounded-lg shadow-lg max-w-xs md:max-w-sm"
                />
            </div>

            <div className="flex-grow">
                <h1 className="text-3xl font-bold mb-4">{product_title}</h1>

                <p className="text-xl font-semibold text-gray-700 mb-4">Price: ${price.toFixed(2)}</p>

                <div
                    className={`text-sm p-2 py-1 w-28 text-center rounded-full mb-4 ${
                        availability ? 'bg-green-200 text-green-800' : 'bg-red-200 text-red-800'
                    }`}
                >
                    {availability ? 'In Stock' : 'Out of Stock'}
                </div>

                <p className="text-gray-600 mb-4">{description}</p>

                <div className="mb-4">
                    <h2 className="font-semibold text-lg mb-2">Specifications:</h2>
                    <ul className="list-disc list-inside text-gray-600">
                        {Specification.map((spec, index) => (
                            <li key={index}>{spec}</li>
                        ))}
                    </ul>
                </div>

                <div className="mb-6">
                    <h2 className="font-semibold text-lg mb-2">Rating:</h2>
                    <div className="text-yellow-500 text-xl">{renderStars(rating)}</div>
                </div>

                <div className="flex gap-4">
                    <button className="btn bg-purple-600 text-white flex items-center gap-2">
                        Add To Cart
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="h-5 w-5"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth="2"
                                d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"
                            />
                        </svg>
                    </button>
                    <button className="btn bg-purple-600 text-white flex items-center gap-2">
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="h-5 w-5"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth="2"
                                d="M12 21l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.18L12 21z"
                            />
                        </svg>
                        Wishlist
                    </button>
                </div>
                <Link to="/"><button className='btn mt-4 bg-purple-600 text-white'>Back</button></Link>
            </div>
        </div>
    );
};

export default GadgetDetail;
