import { useEffect, useState } from 'react'
import logic from '../../../logic'

export default function useController() {
    const [characters, setCharacters] = useState(null)
    const [selectedArc, setSelectedArc] = useState(null)
    const [score, setScore] = useState(0)

    useEffect(() => {
        if (!score && logic.isUserLoggedIn()) {
            try {
                logic.getUserScore()
                    .then(score => {
                        setScore(score)
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
        let parsedArc = arc.replaceAll('-', ' ')

        if (logic.isUserRoleAnonymous())
            alert('If you want to progress through the map and have access to the details, you will have to login so you can gain score playing the minigames!')
        else
            alert(`OIOIOIOI BAAAKAAAAA you need more score to access ${parsedArc} details, go play some minigames KSO YAROOO`)
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