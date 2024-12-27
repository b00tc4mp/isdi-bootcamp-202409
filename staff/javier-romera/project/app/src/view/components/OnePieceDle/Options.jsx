import { compareFirstLetters, isAnyCharacterWithFirstLetter } from '../../../util'

export default function Options({ inputValue, availableCharacters, onCharacterClick }) {
    const handleCharClick = event => {
        const characterName = event.currentTarget.querySelector("p").textContent

        onCharacterClick(characterName)
    }

    return <div className="bg-[rgba(250,249,243,1)] absolute z-[1] w-[22rem] max-h-[14rem] rounded-[.5rem] border-[black] border-[2px] overflow-y-auto">

        {isAnyCharacterWithFirstLetter(inputValue, availableCharacters) ?
            availableCharacters.map(char => {
                let possibleCharacter = compareFirstLetters(inputValue, char)

                if (possibleCharacter[0] || possibleCharacter[1])
                    return <div key={char.name} onClick={handleCharClick} className="h-[4rem] flex flex-col justify-center items-start px-[1rem] border-b-[1px] border-t-[1px] border-[black] bg-[rgba(250,249,243,1)] hover:bg-[#EAE9E4] transition duration-200 z-50 cursor-pointer">
                        <p>{char.name}</p>
                        {!possibleCharacter[0] && possibleCharacter[1] && <span className="text-[.75rem] text-[#6c6656]">{char.alias}</span>}
                    </div>
            }) :
            <div className="h-[2.5rem] flex flex-col justify-center items-start pl-[1rem] border-b-[1px] border-t-[1px] border-[black] bg-[rgba(215,167,104,0.6)]">
                <p>No character found</p>
            </div>}
    </div>
}