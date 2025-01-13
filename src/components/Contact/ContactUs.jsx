import React from 'react';
import { Helmet } from 'react-helmet-async';

const ContactUs = () => {
    return (
        <div className="mx-auto">
<Helmet>
   <title>Gadget Heaven || Contact Us</title>
</Helmet>
            
<div className='bg-purple-600 text-center p-10'>
            <h2 className='text-4xl text-white  font-bold'>Dashboard</h2>
            <p className='text-white mt-4 '>Have questions or need assistance? Reach out to us using the form below!</p>
            </div>
            
            <form className="space-y-6 p-6 max-w-4xl">
                <div>
                    <label className="block text-sm font-medium text-gray-700" htmlFor="name">Your Name</label>
                    <input
                        type="text"
                        id="name"
                        className="w-full p-2 border border-gray-300 rounded-md"
                        placeholder="Enter your name"
                    />
                </div>
                <div>
                    <label className="block text-sm font-medium text-gray-700" htmlFor="email">Email Address</label>
                    <input
                        type="email"
                        id="email"
                        className="w-full p-2 border border-gray-300 rounded-md"
                        placeholder="Enter your email"
                    />
                </div>
                <div>
                    <label className="block text-sm font-medium text-gray-700" htmlFor="message">Message</label>
                    <textarea
                        id="message"
                        className="w-full p-2 border border-gray-300 rounded-md"
                        rows="5"
                        placeholder="Type your message"
                    ></textarea>
                </div>
                <button type="submit" className="btn bg-purple-500 text-white rounded-md px-4 py-2 hover:bg-purple-700">
                    Send Message
                </button>
            </form>
        </div>
    );
};

export default ContactUs;
