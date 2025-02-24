export default function Stats({ character }) {
    console.log('Stats -> render')

    const { name, class: charClass, race, statistics, skills } = character

    return <section className="flex flex-col relative h-auto w-full max-w-screen-md mx-auto bg-[url('/images/menusbg.png')] bg-center bg-cover bg-[#d1b092] border-[8px] box-border border-[#874d1e] rounded-lg p-4 sm:p-6 justify-start">

        <h2 className="text-center font-bold text-4xl text-black m-0">Statistics</h2>
        {/*Character Info*/}
        <div className="self-center text-center mb-4">
            <p className="font-bold text-2xl text-[#6b3d1c]">
                [<span className="text-[#681919]">{name}</span>]
            </p>
            <p className="text-gray-700 text-xl">LV 1</p>
            <p className="text-[#681919] font-bold mt-1 text-xl">{charClass}</p>
            <p className="text-[#681919] font-bold mt-1 text-xl">{race}</p>
        </div>

        {/*AC and HP*/}
        <div className="flex justify-center mb-6 gap-4">
            <div className="relative">
                <img className="w-20 h-16" src="/images/shieldIcon 1.png" alt="shield icon in pixelart" />
                <span className="absolute text-lg top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 font-bold text-black p-4">
                    {statistics.armorClass}
                </span>
            </div>
            <div className="relative">
                <img className="w-20 h-16" src="/images/heart 2.png" alt="heart icon in pixelart" />
                <span className="absolute text-lg top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 font-bold text-black">
                    {statistics.hitPoints}
                </span>
            </div>
        </div>

        {/*Statistics*/}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-y-2 text-black justify-items-center">
            {/* Strength */}
            <div className="flex items-center flex-col gap-1">
                <p className="font-bold">Strength</p>
                <p className="w-10 h-10 bg-gray-200 border-2 border-gray-700 rounded-md flex items-center justify-center font-bold text-lg">{statistics.strength}</p>
            </div>
            {/* Dexterity */}
            <div className="flex items-center flex-col gap-1">
                <p className="font-bold">Dexterity</p>
                <p className="w-10 h-10 bg-gray-200 border-2 border-gray-700 rounded-md flex items-center justify-center font-bold text-lg">{statistics.dexterity}</p>
            </div>
            {/* Constitution */}
            <div className="flex items-center flex-col gap-1">
                <p className="font-bold">Constitution</p>
                <p className="w-10 h-10 bg-gray-200 border-2 border-gray-700 rounded-md flex items-center justify-center font-bold text-lg">{statistics.constitution}</p>
            </div>
            {/* Intelligence */}
            <div className="flex items-center flex-col gap-1">
                <p className="font-bold">Intelligence</p>
                <p className="w-10 h-10 bg-gray-200 border-2 border-gray-700 rounded-md flex items-center justify-center font-bold text-lg">{statistics.intelligence}</p>
            </div>
            {/* Wisdom */}
            <div className="flex items-center flex-col gap-1">
                <p className="font-bold">Wisdom</p>
                <p className="w-10 h-10 bg-gray-200 border-2 border-gray-700 rounded-md flex items-center justify-center font-bold text-lg">{statistics.wisdom}</p>
            </div>
            {/* Charisma */}
            <div className="flex items-center flex-col gap-1">
                <p className="font-bold">Charisma</p>
                <p className="w-10 h-10 bg-gray-200 border-2 border-gray-700 rounded-md flex items-center justify-center font-bold text-lg">{statistics.charisma}</p>
            </div>
        </div>
        {/*Abilities and skills*/}
        <div className="mb-6">
            <h3 className="font-bold text-3xl underline text-black mb-2 text-center">Abilities</h3>
            <ul className="grid grid-cols-1 sm:grid-cols-2 gap-y-2 text-black justify-items-center">
                {skills.map(skill => (
                    <li
                        key={skill._id}
                        className="bg-gray-100 border-2 border-gray-400 rounded-md text-center py-1 font-bold shadow-sm text-black w-[50%]"
                    >
                        {skill.name}
                    </li>
                ))}
            </ul>
        </div>
    </section >
}