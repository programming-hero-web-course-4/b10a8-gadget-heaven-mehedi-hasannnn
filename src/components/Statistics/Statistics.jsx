import React, { useEffect, useState } from 'react';
import {
    ComposedChart,
    Area,
    Bar,
    Scatter,
    XAxis,
    YAxis,
    Tooltip,
    CartesianGrid,
    Legend,
    ResponsiveContainer,
} from 'recharts';
import { Helmet } from 'react-helmet-async';

const Statistics = () => {
    const [data, setData] = useState([]);

    useEffect(() => {
        fetch('./gadgetsData.json')
            .then((response) => response.json())
            .then((jsonData) => {
                
                const chartData = jsonData.map((item) => ({
                    name: item.product_title,  
                    price: item.price,         
                    rating: item.rating,       
                }));
                setData(chartData);
            });
    }, []);

    return (
        <div className=" mx-auto">
            <Helmet>
   <title>Gadget Heaven || Statistics</title>
</Helmet>
            <div className='bg-purple-600 text-center p-10 mb-4 '>
            <h2 className="text-4xl text-white  font-bold">Product Statistics</h2>
            <p className="text-white mt-4 ">
            Explore the latest gadgets that will take your experience to the next level. From smart devices to the coolest accessories, we have it all!
            </p>
            </div>
            {data.length > 0 ? (
                <ResponsiveContainer width="100%" height={400}>
                    <ComposedChart data={data}>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="name" />
                        <YAxis />
                        <Tooltip />
                        <Legend />
                        <Area type="monotone" dataKey="price" fill="#8884d8" stroke="#8884d8" />
                        <Bar dataKey="price" barSize={20} fill="#413ea0" />
                        <Scatter dataKey="rating" fill="red" />
                    </ComposedChart>
                </ResponsiveContainer>
            ) : (
                <p className="text-center text-gray-500">Loading data...</p>
            )}
        </div>
    );
};

export default Statistics;
