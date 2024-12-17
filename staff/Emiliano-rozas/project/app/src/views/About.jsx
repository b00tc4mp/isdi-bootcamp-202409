import React from 'react'
import { Title, Newsletter } from '../components/index'

export default function About() {
    return (
        <div>
            <div className='text-2xl text-center pt-8 border-t  border-green-700'>
                <Title text1={'ABOUT'} text2={' US'} />
            </div>

            <div className='my-10 flex flex-col md:flex-row gap-16'>
                <img
                    className='w-full rounded md:max-w-[450px]'
                    src="https://www.popmythology.com/wp-content/uploads/2014/11/justice-league-batman-superman-reading-comics-2.jpg"
                    alt="Justice League members reading comics"
                />
                <div className='flex flex-col justify-center gap-6 md:w-2/4 text-white'>
                    <p>
                        Entelequia is a comic book and bookstore specialized in the import, sale, and distribution of Argentine, American, and European comics, manga, anime, illustration books, music, design, animation, cinema, and special effects. We have the widest catalog of fantasy, horror, and science fiction literature and a wide range of merchandising, action figures, posters, trading cards, and collectible items for genre lovers.
                    </p>
                    <p>
                        We are pioneers in the sale of cult products in the country. With more than 40 years of experience in the field, we differentiate ourselves by our personalized service, our friendly customer service, and our passion for art and the fantastic world.
                    </p>
                    <b className='text-white'>Our Mission</b>
                    <p className='text-white'>
                        At Entelequia Comic-Book Store, our mission is to share the magic of comics, manga, and geek culture with everyone. We offer a diverse collection that inspires, entertains, and sparks imagination. Whether you're a collector or a new fan, we aim to provide a seamless shopping experience that connects you with the stories and characters you love. 📚✨
                    </p>
                </div>
            </div>

            <div className='text-xl py-4'>
                <Title text1={'WHY'} text2={' CHOOSE US'} />
            </div>

            <div className='flex flex-col md:flex-row text-sm mb-20'>
                <div className='border border-green-700 px-10 md:px-16 py-8 sm:py-20 flex flex-col gap-5'>
                    <b className='text-white mb-2'>Quality Assurance:</b>
                    <p className='text-white'>
                        At Entelequia Comic-Book Store, we are committed to delivering the highest quality experience. From carefully curated collections to secure transactions and reliable service, we ensure every aspect of your journey meets the highest standards. Your satisfaction and trust are our top priorities.
                    </p>
                </div>
                <div className='border  border-green-700 px-10 md:px-16 py-8 sm:py-20 flex flex-col gap-5'>
                    <b className='text-white mb-2'>Convenience:</b>
                    <p className='text-white'>
                        At Entelequia Comic-Book Store, we make your shopping experience effortless and enjoyable. With intuitive navigation, secure payments, and swift deliveries, everything you need is just a click away. Explore, select, and enjoy your favorite comics with ease!
                    </p>
                </div>
                <div className='border border-green-700 px-10 md:px-16 py-8 sm:py-20 flex flex-col gap-5'>
                    <b className='text-white mb-2'>Exceptional Customer Service:</b>
                    <p className='text-white'>
                        At Entelequia Comic-Book Store, we are committed to providing top-notch support for every customer. Whether you have questions, need assistance, or want to share feedback, our dedicated team is here to help you every step of the way. Your satisfaction is our priority!
                    </p>
                </div>
            </div>
            <Newsletter />
        </div>
    )
}
