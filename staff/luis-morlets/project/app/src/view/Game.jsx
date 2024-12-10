import { useState } from 'react'
import Carousel from './components/Carousel'
import images from '../utils/images'

export default function Game() {
    console.log('Game -> render')

    const [avatar, setAvatar] = useState()

    return <main className="game-container">
        <Carousel className='relative z-10' data={images} />
    </main>
}