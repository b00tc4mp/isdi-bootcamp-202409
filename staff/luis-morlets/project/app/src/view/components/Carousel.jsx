import React, { useEffect, useState } from 'react'
import { ImArrowRight, ImArrowLeft } from 'react-icons/im'
import { errors } from 'com'

import useContext from '../useContext'

import logic from '../../logic'

const { SystemError } = errors

export default function Carousel({ data }) {
    console.log('Carousel -> render')

    const [images, setImages] = useState(0)

    const [character, setCharacter] = useState(null)

    const { alert } = useContext()

    const handleNextImage = () => {
        setImages(images === data.length - 1 ? 0 : images + 1)
    }

    const handlePrevImage = () => {
        setImages(images === 0 ? data.length - 1 : images - 1)
    }

    let playerId = logic.getPlayerId()

    const { uuid } = logic.getCharacter

    useEffect(() => {
        try {
            logic.getCharacter(playerId, characterId)
                .then(setCharacter)
                .catch(error => {
                    if (error instanceof SystemError)
                        alert('Can\'t retieve characters, try later.')
                    else
                        alert(error.message)

                    console.error(error)
                })
        } catch (error) {
            alert(error.message)

            console.error(error)
        }
    }, [])

    return <div className="flex items-center bg-[url('/images/background2.png')] h-[95%] relative bg-cover w-[95%]
    border-orange-900 border-8">
        <div className="flex relative items-center
    left-[3rem] h-[80%] w-[45%] ml-[7rem]">
            <ImArrowLeft className='w-[50px] h-[50px] text-black left-[5rem] hover:cursor-pointer items-start' onClick={handlePrevImage} />

            {data.map((item, index) => {
                return <img src={item.src} alt={`${item.character} avatar`} key={index} className={images === index ? 'img-container' : 'img-hidden'} />
            })}

            <ImArrowRight className='w-[50px] h-[50px] text-black hover:cursor-pointer left-[37rem]' onClick={handleNextImage} />
        </div>

        <div className="absolute self-center w-[40%] h-[90%] right-[8rem]">
            <img src="/images/menusbg.png" alt="menu image" className="h-full w-full" />
        </div>
        <div className="relative flex self-end right-[35%] bottom-[10%] gap-4 w-[15%]">
            <button className="bg-black w-full">Select</button>
            <button className="bg-black w-full">Quit</button>
        </div>
    </div>
}