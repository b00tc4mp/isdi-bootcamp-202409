import { useEffect, useState } from 'react'
import logic from '../../../logic'

import useContext from '../../useContext'

export default function useController() {
    const { alert } = useContext()

    const [characters, setCharacters] = useState(null)
    const [selectedArc, setSelectedArc] = useState(null)
    const [score, setScore] = useState(0)

    useEffect(() => {
        if (!score && logic.isUserLoggedIn()) {
            try {
                logic.getUserDetails()
                    .then(userScoreAndUsername => {
                        setScore(userScoreAndUsername.score)
                    })
                    .catch(error => {
                        if (error instanceof SystemError)
                            alert('Sorry, try again later')
                        else
                            alert(error.message)

                        console.error(error)
                    })
            } catch (error) {
                alert(error.message)

                console.error(error)
            }
        }
    }, [])

    const handleLocationClicked = event => {
        const { target: { id: arc } } = event

        try {
            logic.getCharactersByArc(arc)
                .then(characters => {
                    setCharacters(characters)
                    setSelectedArc(arc)
                })
        } catch (error) {
            alert(error.message)

            console.error(error)
        }
    }

    const handleDisabledLocationClicked = event => {
        const { target: { id: arc } } = event

        let bounty

        let parsedArc = arc.replaceAll('-', ' ')

        parsedArc === 'Orange Town' ? bounty = 500 : parsedArc === 'Syrup Village' ? bounty = 1000 : parsedArc === 'Baratie' ? bounty = 1750 : parsedArc === 'Arlong Park' ? bounty = 3000 : bounty = 5000

        if (logic.isUserRoleAnonymous())
            alert('You need to log in to be able to increase your bounty and progress through the map!')
        else
            alert(`You need to have a bounty of at least ${bounty} berries to access to ${parsedArc} details`, 'warn')
    }

    const handleExitLocation = () => {
        setCharacters(null)
        setSelectedArc(null)
    }

    return {
        characters,
        selectedArc,
        score,

        handleLocationClicked,
        handleExitLocation,
        handleDisabledLocationClicked
    }
}