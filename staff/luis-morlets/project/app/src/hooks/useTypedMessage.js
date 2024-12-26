import { useEffect, useState } from 'react'

import timeout from '../utils/timeout'

export default message => {
    const [typedMessage, setTypedMessage] = useState('')

    useEffect(() => {
        setTypedMessage('')

        if (message.length) {
            (async () => {
                let visibleMessage = ''

                for (let i = 0; i < message.length; i++) {
                    await timeout(40)

                    visibleMessage = visibleMessage + message[i]
                    setTypedMessage(visibleMessage)
                }
            })()
        }
    }, [message])

    return typedMessage
}