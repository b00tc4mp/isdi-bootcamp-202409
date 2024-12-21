export default function DetailedInfo({ characters, selectedArc }) {
    return <div className="fixed w-[25rem] h-[35rem] bg-[rgba(250,249,243,1)] justify-start flex flex-col rounded-[1rem] border-[2px] border-[black] overflow-y-auto">
        <h1 className="text-[2rem] mt-[1rem]">{selectedArc === 'Romance-Dawn' ? `Foosha Village` :
            selectedArc === 'Orange-Town' ? 'Orange Town' :
                selectedArc === 'Syrup-Village' ? 'Syrup Village' :
                    selectedArc === 'Baratie' ? 'Baratie' :
                        selectedArc === 'Arlong-Park' ? 'Arlong Park' : 'Loguetown'}</h1>
        <p className="text-[.9rem] mb-[1rem]">{`${selectedArc.replaceAll('-', ' ')} arc`}</p>
        <div className="border-t-[2px] mb-[1.5rem] w-full h-[2px] border-[black]"></div>

        {characters.map((char, index) => {
            const { name, description } = char
            return <div className="" key={index}>
                <ul className="pl-[2rem] pb-[2rem] flex flex-col items-start list-disc">
                    <li className="text-[1.25rem] list-none">{name}</li>
                    <li className="ml-[1rem] text-justify pr-[3rem]">{description}</li>
                </ul>
            </div>
        })}
    </div>
}