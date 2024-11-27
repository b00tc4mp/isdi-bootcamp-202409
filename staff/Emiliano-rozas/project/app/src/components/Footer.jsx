import React from 'react'
import { assets } from '../assets/index'

function Footer() {
    return (
        <div>
            <div className='flex flex-col sm:grid grid-cols-[3fr_1fr_1fr] gap-14 my-10 mt-40 text-sm'>
                <div className="flex flex-col items-center justify-end">
                    <img src={assets.LogoEntelequiaVector} className="mb-2 w-48" alt="" />
                    <p className='w-full md:w-2/3 text-white text-left'>We are pioneers in the sale of cult products in the country. With more than 40 years of experience in the field, we differentiate ourselves by our personalized service, our friendly customer service and our passion for art and the fantastic world.</p>
                </div>
                <div>
                    <p className='text-xl font-medium mb-5 text-white'>COMPANY</p>
                    <ul className='flex flex-col gap-1 text-white'>
                        <li>Home</li>
                        <li>About us</li>
                        <li>Delivery</li>
                        <li>Privacy Policy</li>
                    </ul>
                </div>
                <div>
                    <p className='text-xl font-medium mb-5 text-white'>GET IN TOUCH</p>
                    <ul className='flex flex-col gap-1 text-white'>
                        <li>+54-911- 4788-4521</li>
                        <li>+54-911-4372-7282</li>
                        <li>info@entelequia.com.ar</li>
                        <li>belgrano@entelequia.com.ar</li>
                    </ul>
                </div>

            </div>
            <div>
                <hr className='w-full' />
                <p className='py-5 text-sm text-center text-white'>Copyright 2024 © Entelequia Comic-Bookstore - All Right Reserved.</p>
            </div>
        </div >
    )
}

export default Footer