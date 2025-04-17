import { useState, useEffect, useRef } from 'react'

import logic from '../logic'

export default function Home() {
    const [name, setName] = useState(null)
    const [players, setPlayers] = useState([])

    const playerRef = useRef()

    useEffect(() => {
        console.log('Home -> componentDidMount & componentWillReceiveProps')

        if (logic.isUserLoggedIn()) {
            if (!name)
                try {
                    logic.getUserName((error, name) => {
                        if (error) {
                            alert(error.message)

                            console.error(error)

                            return
                        }

                        setName(name)
                    })
                } catch (error) {
                    alert(error.message)

                    console.error(error)
                }
        } else setName(null)

        const player = playerRef.current

        player.x = 0
        player.y = 0

        const STEP = 20

        document.addEventListener('keydown', event => {
            console.log(event.key)

            if (event.key === 'ArrowRight')
                player.style.left = `${(player.x += STEP)}px`
            else if (event.key === 'ArrowLeft')
                player.style.left = `${(player.x -= STEP)}px`
            else if (event.key === 'ArrowUp')
                player.style.top = `${(player.y -= STEP)}px`
            else if (event.key === 'ArrowDown')
                player.style.top = `${(player.y += STEP)}px`

            try {
                logic.savePlayerState(player.x, player.y, error => {
                    if (error) {
                        alert(error.message)

                        console.error(error)

                        return
                    }
                })
            } catch (error) {
                alert(error.message)

                console.error(error)
            }
        })

        const intervalId = setInterval(() => {
            console.log('Home -> players interval')

            try {
                logic.getPlayersState((error, state) => {
                    if (error) {
                        alert(error.message)

                        console.error(error)

                        return
                    }

                    setPlayers(state)
                })
            } catch (error) {
                alert(error.message)

                console.error(error)
            }
        }, 100)


        return () => clearInterval(intervalId)
    }, [])

    console.log('Home -> render')

    return <main className="py-12">
        <div ref={playerRef} className="flex flex-col items-center absolute">
            <span className="text-6xl">🤡</span>
            {name && <h3 className="text-xs">{name}</h3>}
        </div>

        {players.map(({ id, username, coords: { x, y } }) =>
            <div key={id} style={{ left: `${x}px`, top: `${y}px`, display: 'flex', flexDirection: 'column', alignItems: 'center', position: 'absolute' }}>
                <span className="text-6xl">🤡</span>
                <h3 className="text-xs">{username}</h3>
            </div>
        )}
    </main>
}