import { useRef, useEffect, useCallback } from 'react'

/**
 * Custom hook for handling textarea auto-resize functionality
 * @param {string} value - The current value of the textarea
 * @param {number} maxHeight - Maximum height in pixels (default: 96px)
 * @returns {Object} - The textarea ref and resize function
 */

export default (value, maxHeight = 96) => {
    const textareaRef = useRef(null)

    const resizeTextarea = useCallback(() => {
        const textarea = textareaRef.current
        if (!textarea) return

        // Reset height to auto to get the correct scrollHeight
        textarea.style.height = 'auto'

        // Set the new height based on scrollHeight, capped at maxHeight
        const scrollHeight = textarea.scrollHeight
        textarea.style.height = `${Math.min(scrollHeight, maxHeight)}px`
    }, [maxHeight])

    // Resize whenever value changes
    useEffect(() => {
        resizeTextarea()
    }, [value, resizeTextarea])

    return { textareaRef, resizeTextarea }
}