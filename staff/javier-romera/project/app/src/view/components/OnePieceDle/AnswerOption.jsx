import { formatBounty, formatHeight } from '../../../util'

export default function AnswerOption(props) {
    const {
        index,
        color,
        name,
        gender,
        affiliation,
        hasDF,
        devilFruitType,
        hakiString,
        bounty,
        higher,
        lower,
        height,
        sea,
        firstArcName
    } = props

    return <div className={`mb-[1rem] w-[80px] h-[80px] flex justify-center items-center border-[2px] border-[black] rounded-[.5rem] ${color} text-[0.75rem]`}>
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
}