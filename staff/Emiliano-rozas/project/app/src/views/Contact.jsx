import React from 'react'
import { Title, Newsletter } from '../components/index'

export default function Contact() {
    return (
        <div>
            <div className='text-center text-2xl pt-10 border-t'>
                <Title text1={'CONTACT'} text2={' US'} />
            </div>

            <div className='my-10 flex flex-col justify-center md:flex-row gap-10 mb-28'>
                <img
                    className='w-full md:max-w-[480px]'
                    src="https://i.pinimg.com/474x/6a/e9/a6/6ae9a6d7a70707aff3a267268c61e76e.jpg"
                    alt="Interior of a comic book store"
                />

                <div className='flex flex-col justify-center items-start gap-6'>
                    <p className='font-semibold text-xl text-white'>Our Store</p>
                    <p className='text-white'>
                        Uruguay 341 - Buenos Aires, Argentina <br />
                        Juramento 2584 - Buenos Aires, Argentina
                    </p>
                    <p className='text-white'>
                        Tel: <a href='tel:+5491147884521' className='text-green-400 hover:underline'>+54-911-4788-4521</a> / <a href='tel:+5491143727282' className='text-green-400 hover:underline'>+54-911-4372-7282</a><br />
                        <a href='mailto:info@entelequia.com.ar' className='text-green-400 hover:underline'>info@entelequia.com.ar</a> / <a href='mailto:belgrano@entelequia.com.ar' className='text-green-400 hover:underline'>belgrano@entelequia.com.ar</a>
                    </p>

                    <p className='font-semibold text-xl text-white'>Careers at Entelequia</p>
                    <p className='text-white'>Learn more about our teams and job openings</p>

                    <button className='border rounded border-white text-white bg-green-700 px-8 py-4 text-sm hover:bg-green-500 transition-all duration-500 mb-4'>
                        Explore Jobs
                    </button>
                </div>
            </div>

            <div className='flex justify-center my-10'>
                <iframe
                    title='Entelequia Location'
                    className='w-full md:max-w-[600px] h-[350px] border-0 rounded'
                    src="https://www.google.com/maps/embed/v1/place?key=YOUR_API_KEY&q=Uruguay+341+Buenos+Aires+Argentina"
                    allowFullScreen
                />
            </div>
            <Newsletter />
        </div>
    )
}
