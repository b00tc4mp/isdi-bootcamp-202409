import React, { useState, useEffect } from 'react';

export default function Carousel() {
    const images = [
        "https://i0.wp.com/www.tomosygrapas.com/wp-content/uploads/2022/12/Venom-lethal-protector-banner.jpg?fit=1012%2C569&ssl=1",
        "https://hips.hearstapps.com/hmg-prod/images/thumb-1920-892817-1567104591.jpg",
        "https://static1.srcdn.com/wordpress/wp-content/uploads/2022/07/Hero-For-Hire.jpg",
        "https://sm.ign.com/t/ign_latam/screenshot/default/evamun_ut7k.1280.jpg",
        "https://i.pinimg.com/736x/d9/19/f8/d919f8f02e4225e56456e7bab4240d8b.jpg"
    ];

    const [currentIndex, setCurrentIndex] = useState(0);

    const nextSlide = () => {
        setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
    };

    const prevSlide = () => {
        setCurrentIndex((prevIndex) => (prevIndex - 1 + images.length) % images.length);
    };

    useEffect(() => {
        const interval = setInterval(nextSlide, 3500);
        return () => clearInterval(interval);
    }, []);

    return (
        <div className="relative w-full p-5">
            <div className="relative h-56 overflow-hidden rounded-lg md:h-96">
                <img
                    src={images[currentIndex]}
                    className="block w-full h-full object-cover"
                    alt={`Slide ${currentIndex + 1}`}
                />
            </div>

            <button
                type="button"
                className="absolute top-1/2 left-5 z-30 flex items-center justify-center h-10 w-10 rounded-full bg-black/50 text-white"
                onClick={prevSlide}
            >
                &#10094;
            </button>
            <button
                type="button"
                className="absolute top-1/2 right-5 z-30 flex items-center justify-center h-10 w-10 rounded-full bg-black/50 text-white"
                onClick={nextSlide}
            >
                &#10095;
            </button>

            <div className="absolute bottom-5 left-1/2 transform -translate-x-1/2 flex space-x-2">
                {images.map((_, index) => (
                    <span
                        key={index}
                        className={`block w-3 h-3 rounded-full ${currentIndex === index ? 'bg-green-700' : 'bg-gray-400'}`}
                        onClick={() => setCurrentIndex(index)}
                    ></span>
                ))}
            </div>
        </div>
    );
}
