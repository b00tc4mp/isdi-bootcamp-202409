import { formatBounty, formatHeight, getHakiString } from "../../../util"

export default function Answers({ answers, guessedCharacters }) {
    return <div>
        {answers.map((answer, superIndex) => { // first map ==> iterate on answers array with bools and strings
            let hasDF = guessedCharacters[superIndex].hasOwnProperty('devilFruit') // check if current char has df
            const { observation, armament, conqueror } = guessedCharacters[superIndex]
            let hakiString = getHakiString(observation, armament, conqueror)

            return <div key={superIndex} className="grid grid-cols-9 gap-[.5rem]">
                {answer.map((ans, index) => { // iterate on each answer in answers array (the previous one), we are now seeing bools and strings in each position
                    let color, higher, lower, devilFruitType // auxiliar variables

                    if (ans === true) color = 'bg-[#84cc16]' // various validations to define the style of the div that the map will return
                    else if (ans === false) color = 'bg-[#ef4444]'
                    else if (ans === 'higher') {
                        color = 'bg-[#ef4444]'
                        higher = true
                    }
                    else if (ans === 'lower') {
                        color = 'bg-[#ef4444]'
                        lower = true
                    }
                    else color = 'bg-[#fcd34d]'

                    const { name, gender, affiliation, bounty, height, sea, firstArc: { name: firstArcName } } = guessedCharacters[superIndex]

                    if (hasDF) {
                        let { devilFruit: { type } } = guessedCharacters[superIndex]
                        devilFruitType = type
                    }

                    //AnswerOption
                    return <div key={index} className={`mb-[1rem] w-[80px] h-[80px] flex justify-center items-center border-[2px] border-[black] rounded-[.5rem] ${color} text-[0.75rem]`}>
                        <p>
                            {index === 0 && `${name}`}

                            {index === 1 && `${gender}`}

                            {index === 2 && `${affiliation}`}

                            {index === 3 && hasDF && `${devilFruitType}`}
                            {index === 3 && !hasDF && '𐢫'}

                            {index === 4 && `${hakiString}`}

                            {index === 5 && `${formatBounty(bounty)}`}
                            {index === 5 && higher && "↑"}
                            {index === 5 && lower && "↓"}

                            {index === 6 && `${formatHeight(height)}`}
                            {index === 6 && higher && "↑"}
                            {index === 6 && lower && "↓"}

                            {index === 7 && `${sea}`}

                            {index === 8 && `${firstArcName}`}
                            {index === 8 && higher && "↑"}
                            {index === 8 && lower && "↓"}
                        </p>
                    </div>
                })}
            </div>
        })}
    </div>
}