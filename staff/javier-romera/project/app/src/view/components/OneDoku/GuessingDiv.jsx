import { Form, Input } from '../../library'

import { getConditionText } from '../../../util'
import Options from './Options'

export default function GuessingDiv({ currentIndex, conditions, handleSubmit, inputValue, onChange, isTyping, availableCharacters, handleCharacterSelected }) {
    const conditionsText = getConditionText(currentIndex, conditions)

    return <div className="absolute w-[35rem] z-10">
        <div className="bg-[rgba(215,167,104,1)] rounded-[.5rem] py-[1rem] w-[inherit] border-[2px] border-[black]">
            <div>
                <p className="text-[1.5rem] font-bold">Make your guess</p>
                <p className="text-[1.25rem]">{conditionsText[0]} / {conditionsText[1]}</p>
            </div>
            <div className="flex justify-center">
                <Form onSubmit={handleSubmit} className="flex justify-center items-center mt-[1rem]">
                    <Input autoFocus autoComplete="off" id="guess" value={inputValue} onInput={onChange} className="text-[1.125rem] w-[25rem] h-[2.5rem] pl-[.5rem] rounded-[.25rem] border-[2px] border-[black] focus:outline-none" />
                </Form>

                {isTyping && <Options availableCharacters={availableCharacters} inputValue={inputValue} onCharacterSelected={handleCharacterSelected} currentIndex={currentIndex} />}
            </div>
        </div>
    </div>
}