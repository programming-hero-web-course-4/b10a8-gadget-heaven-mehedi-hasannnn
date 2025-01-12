import React from 'react';
import { Link } from 'react-router-dom';

const Gadget = ({ gadget }) => {

    const {product_id, product_title, product_image, price} = gadget;

    return (
        <div>
            <div className="card card-compact bg-base-100 w- shadow-xl p-6 ">
  <figure className='py-8'>
    <img
      src={gadget.product_image}
      className='h-[150px]'
      alt="gadget images" />
  </figure>
  <div className="card-body">
    <h2 className="card-title font-bold">{gadget.product_title}</h2>
    <p className='font-semibold'>Price: {gadget.price}</p>
    <div className="card-actions justify-end">
      <Link to={`/gadgets/${product_id}`}>
      <button className="btn text-purple-600 bg-white rounded-xl border-purple-600">View Details</button>
      </Link>
    </div>
  </div>
</div>
        </div>
    );
};

export default Gadget;