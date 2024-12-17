import React from 'react'

export default function Hero() {
    return (
        <div className='flex flex-col sm:flex-row  border-solid border-2 border-green-700'>

            {/* aca vamos a darle forma al lado de la izquierda */}
            <div className='w-full sm:w-1/2 flex items-center justify-center py-10 sm:py-0'>
                <div className='text-white'>
                    <div className='flex items-center gap-2'>
                        <p class='w-8 md:w-11 h-[2px] bg-green-700' />
                        <p className='font-medium text-sm md:text-base'>OUR BEST SELLERS</p>

                    </div>
                    <h1 className='text-3xl sm:py-3 lg:text-5x1 leading-relaxed '>Latest Arrivals</h1>
                    <div className='flex items-center gap-2'>
                        <p className='font-semibold text-sm md:text-base'>SHOP NOW</p>
                        <p className='w-8 md:w-11 h-[2px] bg-green-700' />
                    </div>
                </div>

            </div>
            {/* Ahora la derecha Fuelte */}

            <div id="default-carousel" className="relative w-full p-5" data-carousel="slide">
                <div className="relative h-56 overflow-hidden rounded-lg md:h-96">

                    <div className=" duration-200 ease-in-out" data-carousel-item="active">
                        <img src="https://i0.wp.com/www.tomosygrapas.com/wp-content/uploads/2022/12/Venom-lethal-protector-banner.jpg?fit=1012%2C569&ssl=1" className="absolute block w-full -translate-x-1/2 -translate-y-1/2 top-1/2 left-1/2" alt="..." />
                    </div>

                    <div className="hidden duration-200 ease-in-out" data-carousel-item>
                        <div classNameName="relative h-full">
                            <img src="https://i.ebayimg.com/images/g/0EoAAOSwdtxfrMw~/s-l1200.jpg" className="absolute block w-full -translate-x-1/2 -translate-y-1/2 top-1/2 left-1/2" alt="..." />
                        </div>
                    </div>

                    <div className="hidden duration-200 ease-in-out" data-carousel-item>
                        <img src="https://cultureshockonline.co.za/cdn/shop/files/4956.jpg?v=1717690302" className="absolute block w-full -translate-x-1/2 -translate-y-1/2 top-1/2 left-1/2" alt="..." />
                    </div>

                    <div className="hidden duration-200 ease-in-out" data-carousel-item>
                        <img src="https://cdn.europosters.eu/image/750/wall-murals/batman-and-joker-comic-cover-i166717.jpg" className="absolute block w-full -translate-x-1/2 -translate-y-1/2 top-1/2 left-1/2" alt="..." />
                    </div>

                    <div className="hidden duration-200 ease-in-out" data-carousel-item>
                        <img src="https://comicvine.gamespot.com/a/uploads/scale_small/0/4/9245-2353-10208-1-marvel-super-heroes.jpg" className="absolute block w-full -translate-x-1/2 -translate-y-1/2 top-1/2 left-1/2" alt="..." />
                    </div>
                </div>

                <div className="absolute z-30 flex -translate-x-1/2 bottom-5 left-1/2 space-x-3 rtl:space-x-reverse">
                    <button type="button" className="w-3 h-3 rounded-full" aria-current="true" aria-label="Slide 1" data-carousel-slide-to="0"></button>
                    <button type="button" className="w-3 h-3 rounded-full" aria-current="false" aria-label="Slide 2" data-carousel-slide-to="1"></button>
                    <button type="button" className="w-3 h-3 rounded-full" aria-current="false" aria-label="Slide 3" data-carousel-slide-to="2"></button>
                    <button type="button" className="w-3 h-3 rounded-full" aria-current="false" aria-label="Slide 4" data-carousel-slide-to="3"></button>
                    <button type="button" className="w-3 h-3 rounded-full" aria-current="false" aria-label="Slide 5" data-carousel-slide-to="4"></button>
                </div>

                <button type="button" className="absolute top-0 start-0 z-30 flex items-center justify-center h-full px-4 cursor-pointer group focus:outline-none" data-carousel-prev>
                    <span className="inline-flex items-center justify-center w-10 h-10 rounded-full bg-white/30 dark:bg-gray-800/30 group-hover:bg-white/50 dark:group-hover:bg-gray-800/60 group-focus:ring-4 group-focus:ring-white dark:group-focus:ring-gray-800/70 group-focus:outline-none">
                        <svg className="w-4 h-4 text-white dark:text-gray-800 rtl:rotate-180" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 6 10">
                            <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 1 1 5l4 4" />
                        </svg>
                        <span className="sr-only">Previous</span>
                    </span>
                </button>
                <button type="button" className="absolute top-0 end-0 z-30 flex items-center justify-center h-full px-4 cursor-pointer group focus:outline-none" data-carousel-next>
                    <span className="inline-flex items-center justify-center w-10 h-10 rounded-full bg-white/30 dark:bg-gray-800/30 group-hover:bg-white/50 dark:group-hover:bg-gray-800/60 group-focus:ring-4 group-focus:ring-white dark:group-focus:ring-gray-800/70 group-focus:outline-none">
                        <svg className="w-4 h-4 text-white dark:text-gray-800 rtl:rotate-180" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 6 10">
                            <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m1 9 4-4-4-4" />
                        </svg>
                        <span className="sr-only">Next</span>
                    </span>
                </button>
            </div>

        </div >
    )
}

