import { formatBounty, formatHeight } from "../../util"

export default function Answers({ answers, guessedCharacters }) {
    return <div>
        {answers.map((answer, superIndex) => {
            let hasDF

            hasDF = guessedCharacters[superIndex].hasOwnProperty('devilFruit')
            return <div key={superIndex} className="grid grid-cols-9 gap-[.5rem]">
                {answer.map((ans, index) => {
                    let color
                    let higher
                    let lower

                    if (ans === true) color = 'bg-[#84cc16]'
                    else if (ans === false) color = 'bg-[red]'
                    else if (ans === 'higher') {
                        color = 'bg-[red]'
                        higher = true
                    }
                    else if (ans === 'lower') {
                        color = 'bg-[red]'
                        lower = true
                    }
                    else color = 'bg-[yellow]'

                    return <div key={index} className={`break-words mb-[1rem] w-[80px] h-[80px] flex justify-center items-center border-[2px] border-[black] rounded-[.5rem] ${color}`}>
                        <p className="w-[inherit]">
                            {index === 0 && `${guessedCharacters[superIndex].name}`}

                            {index === 1 && `${guessedCharacters[superIndex].gender}`}

                            {index === 2 && `${guessedCharacters[superIndex].affiliation}`}

                            {index === 3 && hasDF && `${guessedCharacters[superIndex].devilFruit.type}`}
                            {index === 3 && !hasDF && '𐢫'}

                            {index === 4 && 'jeje god'}

                            {index === 5 && `${formatBounty(guessedCharacters[superIndex].bounty)}`}
                            {index === 5 && higher && "↑"}
                            {index === 5 && lower && "↓"}

                            {index === 6 && `${formatHeight(guessedCharacters[superIndex].height)}`}
                            {index === 6 && higher && "↑"}
                            {index === 6 && lower && "↓"}

                            {index === 7 && `${guessedCharacters[superIndex].sea}`}

                            {index === 8 && `${guessedCharacters[superIndex].firstArc.name}`}
                            {index === 8 && higher && "↑"}
                            {index === 8 && lower && "↓"}
                        </p>
                    </div>
                })}
            </div>
        })}
    </div>
}