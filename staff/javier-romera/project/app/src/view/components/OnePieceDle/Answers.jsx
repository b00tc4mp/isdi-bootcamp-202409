import { getHakiString } from '../../../util'

import AnswerOption from './AnswerOption'

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

                    return <AnswerOption key={index} index={index} color={color} name={name} gender={gender} affiliation={affiliation} hasDF={hasDF} devilFruitType={devilFruitType} hakiString={hakiString} bounty={bounty} higher={higher} lower={lower} height={height} sea={sea} firstArcName={firstArcName} />
                })}
            </div>
        })}
    </div>
}