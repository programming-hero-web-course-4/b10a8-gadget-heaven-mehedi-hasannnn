import React from 'react';
import Banner from '../Banner/Banner';
import Gadgets from '../Gadgets/Gadgets';
import { Helmet } from 'react-helmet-async';

const Home = () => {
    return (
        <div>

            <Helmet>
                <title>Gadget Heaven || Home</title>
            </Helmet>

            <Banner></Banner>
            <Gadgets></Gadgets>
        </div>
    );
};

export default Home;