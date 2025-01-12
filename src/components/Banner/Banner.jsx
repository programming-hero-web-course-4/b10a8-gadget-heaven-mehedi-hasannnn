import React from 'react';
import bannerImage from '../../assets/banner.jpg';
import { Link } from 'react-router-dom';

const Banner = () => {
    return (
        <div>
            <div
            className="hero h-[700px]"
            style={{
                backgroundColor: '#9538E2',
            }}
        >
            <div className="hero-overlay bg-opacity-60"></div>
            <div className="hero-content text-neutral-content text-center">
                <div className="max-w-sm sm:max-w-md md:max-w-lg lg:max-w-2xl">
                    <h1 className="mb-5 text-4xl sm:text-5xl font-bold">
                        Upgrade Your Tech Accessorize with Gadget Heaven Accessories
                    </h1>
                    <p className="mb-5 text-sm sm:text-base md:text-lg">
                        Explore the latest gadgets that will take your experience to the next level. From smart devices to the coolest accessories, we have it all!
                    </p>
                    <Link to="dashboard"><button className="btn btn-primary">Shop Now</button></Link>
                </div>
            </div>
        </div>

        <div className="-mt-40 ml-32">
            <img src={bannerImage} alt="Banner" className="w-[888px] h-[489px] rounded-xl " />
            </div>

        </div>
    );
};

export default Banner;
