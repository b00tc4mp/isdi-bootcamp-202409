import LocationButton from '../library/LocationButton'

import DetailedInfo from './DetailedInfo'

import useController from './useController'

export default function EastBlueMap() {
    const {
        characters,
        selectedArc,

        handleLocationClicked,
        handleExitLocation
    } = useController()
    return <main className="w-screen h-screen flex justify-center items-center">
        <div className="w-full h-full">
            <img onClick={handleExitLocation} src="/images/eastbluemap.png" alt="east-blue" className="w-full h-full" />
        </div>
        <div> {/* Empieza la fiesta de lo absoluto jeje god ORE WA ISAGI YOICHI, ORE WA... STRIKER DAAAA*/}
            <LocationButton onClick={handleLocationClicked} id="Romance-Dawn" className="absolute left-[82.1%] top-[28%] transform -translate-x-1/2"></LocationButton>
            <LocationButton onClick={handleLocationClicked} id="Orange-Town" className="absolute left-[60.4%] top-[35.6%] transform -translate-x-1/2"></LocationButton>
            <LocationButton onClick={handleLocationClicked} id="Syrup-Village" className="absolute left-[45.06%] top-[39.9%] transform -translate-x-1/2"></LocationButton>
            <LocationButton onClick={handleLocationClicked} id="Baratie" className="absolute left-[58%] top-[65%] transform -translate-x-1/2"></LocationButton>
            <LocationButton onClick={handleLocationClicked} id="Arlong-Park" className="absolute left-[25.87%] top-[34.8%] transform -translate-x-1/2"></LocationButton>
            <LocationButton onClick={handleLocationClicked} id="Loguetown" className="absolute left-[15.75%] top-[68.2%] transform -translate-x-1/2"></LocationButton>
        </div>

        {selectedArc && <DetailedInfo characters={characters} selectedArc={selectedArc} />}
    </main>
}