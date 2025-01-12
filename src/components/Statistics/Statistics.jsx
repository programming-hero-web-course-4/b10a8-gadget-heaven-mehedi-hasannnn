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

const Statistics = () => {
    const [data, setData] = useState([]);

    useEffect(() => {
        // Fetch data from the JSON file
        fetch('./gadgetsData.json')
            .then((response) => response.json())
            .then((jsonData) => {
                // Filter relevant products (laptops, phones, smart watches) and map data for the chart
                const chartData = jsonData.map((item) => ({
                    name: item.product_title,  // Using product_title for X-axis
                    price: item.price,          // Using price for the Y-axis
                    rating: item.rating,        // Using rating for Scatter data
                }));
                setData(chartData);
            });
    }, []);

    return (
        <div className="p-6 max-w-4xl mx-auto">
            <h2 className="text-4xl font-bold text-center mb-6">Product Statistics</h2>
            <p className="text-center text-gray-600 mb-6">
                A visual representation of product prices and ratings.
            </p>
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
