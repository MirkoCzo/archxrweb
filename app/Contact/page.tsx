"use client"
import React, { useState } from 'react';

const ContactPage = () => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [message, setMessage] = useState('');

    const handleSubmit = (e:React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        // Envoyer les données du formulaire à votre backend ou effectuer une autre action
        console.log('Nom:', name);
        console.log('Email:', email);
        console.log('Message:', message);
    };

    return (
        <div className="flex flex-col justify-center items-center">
            <h1 className="mb-5 text-3xl font-bold">Contactez-nous</h1>
            <form onSubmit={handleSubmit} className="w-full lg:w-[600px] mx-auto bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">            
            <div className="mb-4">
                    <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="name" >
                    Nom:
                    </label>
                    <input className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" 
                    id="name" 
                    type="text" 
                    value={name} 
                    placeholder='Nom...'
                    onChange={(e) => setName(e.target.value)} />
                </div>
                <div className="mb-4">
                    <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="email">
                        Email:
                    </label>
                    <input className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" 
                    id="email" 
                    type="email" 
                    value={email} 
                    placeholder='Email...'
                    onChange={(e) => setEmail(e.target.value)} />
                </div>
                <div className="mb-6">
                    <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="message">
                        Message:
                    </label>
                    <textarea className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" 
                    id="message" 
                    value={message} 
                    placeholder='Entrez votre message...'
                    onChange={(e) => setMessage(e.target.value)} />
                </div>
                <div className="flex items-center justify-between">
                    <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline" 
                    type="submit">
                        Envoyer
                    </button>
                </div>
            </form>
        </div>
    );
};

export default ContactPage;