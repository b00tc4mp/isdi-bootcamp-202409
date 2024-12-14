import { useEffect, useState } from 'react'
import { Button } from '../library'
import { errors } from 'com'

const { SystemError } = errors

import logic from '../../logic'

export default function Ranking({ onCloseRankingClick }) {
    const [ranking, setRanking] = useState([])
    const [userDetails, setUserDetails] = useState(null)
    const [isUserInRanking, setIsUserInRanking] = useState(false)

    useEffect(() => {
        try {
            logic.getRankingScores(ranking.length)
                .then(newScores => {
                    setRanking(newScores)

                    logic.getUserScore()
                        .then(newUserDetails => {
                            setUserDetails(newUserDetails)

                            const found = newScores.some(newScore => newScore.username === newUserDetails.username)

                            if (found) setIsUserInRanking(true)
                        })

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
    }, [])

    const handleShowMoreClick = () => {
        try {
            logic.getRankingScores(ranking.length)
                .then(newScores => {
                    setRanking(newScores)

                    logic.getUserScore()
                        .then(newUserDetails => {
                            setUserDetails(newUserDetails)

                            const found = newScores.some(newScore => newScore.username === newUserDetails.username)

                            if (found) setIsUserInRanking(true)
                        })

                })
        } catch (error) {
            alert(error.message)

            console.error(error)
        }
    }

    const handleCloseRanking = () => {
        onCloseRankingClick()
    }

    return <div className="absolute w-[17.5rem] h-[30rem] bg-[rgba(250,249,243,1)] rounded-[1rem] border-[2px] border-[black] overflow-y-auto">
        <div className="h-[2rem] w-[inherit] flex justify-end fixed z-[10]">
            <Button className="mr-[.75rem]" onClick={handleCloseRanking}>❌</Button>
        </div>
        <div className="mb-[2rem]"></div>
        {ranking.map((score, index) => {
            let customClassName = ''

            if (userDetails)
                if (userDetails.username === score.username)
                    customClassName = 'bg-[rgba(175,255,255,1)]'

            return <div key={index} className={`h-[3.5rem] flex mb-[.5rem] border-t-[2px] border-b-[2px] border-[black] ${customClassName}`}>
                <div className="flex items-center pl-[1rem]">
                    <p>{index + 1}.</p>
                </div>
                <div className="flex items-center w-full">
                    <p className="pl-[.375rem]">{score.username}</p>
                    <p className="absolute right-[0] pr-[1rem]">{score.score} points</p>
                </div>
            </div>
        })}

        {!isUserInRanking && userDetails &&
            <div className="h-[2rem] flex mt-[2rem] mb-[.5rem] border-t-[2px] border-b-[2px] bg-[rgba(175,255,255,1)] border-[black]">
                <div className="flex items-center pl-[1rem]">
                    <p>n/a: </p>
                </div>
                <div className="flex items-center w-full">
                    <p className="pl-[.375rem]">{userDetails.username}</p>
                    <p className="absolute right-[0] pr-[1rem]">{userDetails.score} points</p>
                </div>
            </div>}

        {ranking.length < 21 && <Button className="mb-[.75rem] mt-[.25rem]" onClick={handleShowMoreClick}>Show more</Button>}
    </div>
}