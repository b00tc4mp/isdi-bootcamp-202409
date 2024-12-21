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

                    logic.getUserDetails()
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

                    logic.getUserDetails()
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

    return <div className="w-screen h-screen fixed flex justify-center items-center">
        <div className="absolute z-[50] w-[17.5rem] h-[30rem] bg-[rgba(250,249,243,1)] rounded-[1rem] border-[2px] border-[black] overflow-y-auto">
            <header className="h-[2rem] w-[17.3rem] mt-0 flex justify-end fixed z-[10] rounded-tl-[.9rem] rounded-tr-[.9rem] border-t-1 border-black px-[1rem] bg-[rgba(175,255,255,1)] border-b-[2px]">
                <Button className="w-[full] text-[1.25rem]" onClick={handleCloseRanking}>𐢫</Button>
            </header>

            <div className="mb-[2.5rem]"></div>
            {ranking.map((user, index) => {
                let customClassName = ''
                let customFontBold = ''

                if (userDetails)
                    if (userDetails.username === user.username) {
                        customClassName = 'bg-[rgba(175,255,255,1)]'
                        customFontBold = 'font-bold'
                    }
                if (index + 1 === 1) customClassName = 'bg-[gold]'
                if (index + 1 === 2) customClassName = 'bg-[silver]'
                if (index + 1 === 3) customClassName = 'bg-[#CD7F32]'

                return <div key={index} className={`h-[3.5rem] flex mb-[.5rem] border-t-[2px] border-b-[2px] border-[black] ${customClassName} ${customFontBold}`}>
                    <div className="flex items-center pl-[1rem]">
                        <p>{index + 1}.</p>
                    </div>
                    <div className="flex items-center w-full">
                        <p className="pl-[.375rem]">{user.username}</p>
                        <p className="absolute right-[0] pr-[1rem]">{user.score} berries</p>
                    </div>
                </div>
            })}

            {!isUserInRanking && userDetails && !logic.isUserRoleAnonymous() &&
                <div className="h-[2rem] flex mt-[2rem] mb-[.5rem] border-t-[2px] border-b-[2px] bg-[rgba(175,255,255,1)] border-[black] font-bold">
                    <div className="flex items-center pl-[1rem]">
                        <p>{userDetails.index + 1}: </p>
                    </div>
                    <div className="flex items-center w-full">
                        <p className="pl-[.375rem]">{userDetails.username}</p>
                        <p className="absolute right-[0] pr-[1rem]">{userDetails.score} berries</p>
                    </div>
                </div>}

            {ranking.length < 21 && <Button className="underline mb-[.75rem] mt-[.25rem]" onClick={handleShowMoreClick}>Show more</Button>}
        </div>
    </div>
}