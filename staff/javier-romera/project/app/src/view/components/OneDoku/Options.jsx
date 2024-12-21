import { compareFirstLetters, isAnyCharacterWithFirstLetter } from '../../../util'

import { Button } from '../../library'

export default function Options({ availableCharacters, inputValue, onCharacterSelected, currentIndex }) {
    const handleSelectedCharacter = event => {
        onCharacterSelected(event.target.id, currentIndex)
    }

    return <div className="bg-[rgba(250,249,243,1)] absolute z-[1] mt-[3.5rem] w-[25rem] max-h-[14rem] rounded-[.5rem] border-[black] border-[2px] overflow-y-auto">
        {isAnyCharacterWithFirstLetter(inputValue, availableCharacters) ?
            availableCharacters.map(char => {
                let possibleCharacter = compareFirstLetters(inputValue, char)

                if (possibleCharacter[0] || possibleCharacter[1])
                    return <div key={char.name} className="w-[inherit] flex justify-between border-b-[1px] border-t-[1px] border-[black] bg-[rgba(250,249,243,1)] ">
                        <div className="h-[4rem] flex flex-col justify-center items-start px-[1rem]">
                            <p>{char.name}</p>
                            {!possibleCharacter[0] && possibleCharacter[1] && <span className="text-[.75rem] text-[#6c6656]">{char.alias}</span>}
                        </div>
                        <div className="flex justify-center items-center pr-[1.5rem]">
                            <Button id={char.name} onClick={handleSelectedCharacter} className="px-[.625rem] py-[.125rem] border-[black] border-[2px] bg-[#ffe6c3] rounded-[.25rem] hover:bg-[rgba(175,255,255,1)] transition duration-300">Select</Button>
                        </div>
                    </div>
            }) :
            <div className="h-[2.5rem] flex flex-col justify-center items-start pl-[1rem] border-b-[1px] border-t-[1px] border-[black] bg-[rgba(215,167,104,0.6)]">
                <p>No character found</p>
            </div>}
    </div>
}