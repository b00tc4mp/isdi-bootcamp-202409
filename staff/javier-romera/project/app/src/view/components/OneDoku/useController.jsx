import { useState } from 'react'

export default function useController() {
    const [showGuessingDiv, setShowGuessingDiv] = useState(false)

    const handleGridClick = () => {
        setShowGuessingDiv(true)
    }

    const handleGridGuessingExit = () => {
        if (!showGuessingDiv) return

        setShowGuessingDiv(false)
    }

    return {
        showGuessingDiv,

        handleGridClick,
        handleGridGuessingExit
    }
}