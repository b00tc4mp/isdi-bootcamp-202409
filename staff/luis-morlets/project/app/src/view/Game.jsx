import { useState, useEffect } from 'react'
import { CreateParty } from './components'
import { useNavigate } from 'react-router-dom'
import images from '../data/images'
import logic from '../logic'

export default function Game() {
    console.log('Game -> render')

    return <main className="game-container">
        <CreateParty
        />
    </main>
}