import React from 'react'
import assets from '../assets'
import { Link } from 'react-router-dom';

export default function Footer() {
    return (
        <div >
            <hr className='w-full border-1 bg-green-700 border-green-700' />
            <div className='flex flex-col sm:grid grid-cols-[3fr_1fr_1fr] gap-14 my-10 mt-30 text-sm items-center'>

                {/* Sección Principal */}
                <div className="flex flex-col items-center sm:items-start justify-center text-center sm:text-left">
                    <img src={assets.LogoEntelequiaVector} className="ml-28 w-48" alt="Entelequia Logo" />
                    <p className='w-full ml-12 md:w-2/3 text-white'>
                        We are pioneers in the sale of cult products in the country. With more than 40 years of experience in the field, we differentiate ourselves by our personalized service, our friendly customer service, and our passion for art and the fantastic world.
                    </p>
                </div>

                {/* Sección COMPANY */}
                <div className="flex flex-col items-center sm:items-start justify-center">
                    <p className='text-xl font-medium mb-5 text-white'>COMPANY</p>
                    <ul className='flex flex-col gap-2 text-white'>
                        <Link to='/'>
                            <li className='hover:text-green-500 cursor-pointer'>Home</li>
                        </Link>
                        <Link to='/about'>
                            <li className='hover:text-green-500 cursor-pointer'>About us</li>
                        </Link>
                        <li className='hover:text-green-500 cursor-pointer'>Delivery</li>
                        <li className='hover:text-green-500 cursor-pointer'>Privacy Policy</li>
                    </ul>
                </div>

                {/* Sección GET IN TOUCH */}
                <div className="flex flex-col items-center sm:items-start justify-center">
                    <p className='text-xl font-medium mb-5 text-white'>GET IN TOUCH</p>
                    <ul className='flex flex-col gap-2 text-white'>
                        <li><a href='tel:+5491147884521' className='text-green-400 hover:underline'>+54-911-4788-4521</a></li>
                        <li><a href='tel:+5491143727282' className='text-green-400 hover:underline'>+54-911-4372-7282</a></li>
                        <li><a href='mailto:info@entelequia.com.ar' className='text-green-400 hover:underline'>info@entelequia.com.ar</a></li>
                        <li><a href='mailto:belgrano@entelequia.com.ar' className='text-green-400 hover:underline'>belgrano@entelequia.com.ar</a></li>
                    </ul>
                </div>

            </div>

            {/* Línea de separación y Copyright */}
            <hr className='w-full border-1 bg-green-700 border-green-700' />
            <p className='py-5 text-sm text-center text-white'>
                Copyright 2024 © Entelequia Comic-Bookstore - All Rights Reserved.
            </p>
        </div>
    );
}
