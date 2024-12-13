import React, { useEffect, useState } from 'react'
import { ImArrowRight, ImArrowLeft } from 'react-icons/im'
import images from '../../data/images'

import useContext from '../useContext'

import logic from '../../logic'

export default function Carousel({ onQuitClick, onCharacterChange, onSelect, onStartAdventure }) {
    console.log('Carousel -> render')

    const [imageIndex, setImageIndex] = useState(0)
    const [party, setParty] = useState([])
    const { confirm } = useContext()


    useEffect(() => {
        const initialImage = images[0]
        selectedCharacter(initialImage.id)
    }, [])

    const selectedCharacter = async (uuid) => {
        try {
            const character = await logic.getCharacterByUuid(uuid)
            onCharacterChange(character)
        } catch (error) {
            alert(error.message)

            console.error(error)
        }
    }

    const handleNextImage = () => {
        const newIndex = imageIndex === images.length - 1 ? 0 : imageIndex + 1
        setImageIndex(newIndex)

        const nextImage = images[newIndex]
        selectedCharacter(nextImage.id)
    }

    const handlePrevImage = () => {
        const newIndex = imageIndex === 0 ? images.length - 1 : imageIndex - 1
        setImageIndex(newIndex)

        const prevImage = images[newIndex]
        selectedCharacter(prevImage.id)
    }

    const handleQuitClick = event => {
        confirm('Are you sure you want to quit to main menu?', accepted => {
            if (accepted) {
                event.preventDefault()

                onQuitClick()
            }
        }, 'warn')
    }

    const handleOnSelected = async () => {
        const currentImage = images[imageIndex]
        if (!party.includes(currentImage.id) && party.length < 4) {
            setParty([...party, currentImage.id]) // Añade el personaje seleccionado
            await onSelect(currentImage.id)
        }
    }

    const isSelected = (id) => party.includes(id)

    return <section className="flex relative
    left-[3rem] h-[90%] w-[45%] self-center top-4">
        <div className="flex justify-center items-center w-full gap-12">
            <ImArrowLeft className='w-[50px] h-[50px] text-black hover:cursor-pointer items-start relative bottom-8' onClick={handlePrevImage} />

            {images.map((image, newIndex) => {
                return <img src={image.src}
                    alt={`${image.character} avatar`}
                    key={newIndex}
                    className={newIndex === imageIndex ? 'img-container' : 'img-hidden'}
                    style={{
                        opacity: isSelected(image.id) ? 0.5 : 1
                    }} />
            })}

            <ImArrowRight className='w-[50px] h-[50px] text-black hover:cursor-pointer items-start relative bottom-8' onClick={handleNextImage} />
        </div>

        <div className="relative flex self-end right-[50%] bottom-[5%] gap-4 w-[15%]">
            <button className="bg-black w-full" onClick={handleOnSelected} disabled={isSelected(images[imageIndex].id)}>Select</button>
            {logic.isPlayerLoggedIn() && <button className="bg-black w-full" onClick={handleQuitClick}>Quit</button>}

            <div className="absolute top-[90%] left-[50%] transform -translate-x-1/2">
                <button
                    className="bg-gray-800 px-4 py-2 rounded"
                    onClick={onStartAdventure}
                    disabled={party.length < 4}
                >
                    Start Adventure
                </button>
            </div>
        </div>
    </section>
}