import logic from '../../../logic'
import { LocationButton, DisabledLocationButton } from './library'

import DetailedInfo from './DetailedInfo'

import useController from './useController'

export default function EastBlueMap() {
    const {
        characters,
        selectedArc,
        score,

        handleLocationClicked,
        handleExitLocation,
        handleDisabledLocationClicked
    } = useController()
    return <main className="w-screen h-screen flex justify-center items-center">
        <div className="w-full h-full">
            <img onClick={handleExitLocation} src="/images/eastbluemap.png" alt="east-blue" className="w-full h-full" />
        </div>
        <div>
            <LocationButton onClick={handleLocationClicked} id="Romance-Dawn" className="absolute left-[82.1%] top-[28%] transform -translate-x-1/2"></LocationButton>

            {score >= 500 && logic.isUserRoleRegular() ? <LocationButton onClick={handleLocationClicked} id="Orange-Town" className="absolute left-[60.4%] top-[35.6%] transform -translate-x-1/2"></LocationButton> :
                <DisabledLocationButton onClick={handleDisabledLocationClicked} id="Orange-Town" className="absolute left-[60.4%] top-[35.6%] transform -translate-x-1/2"></DisabledLocationButton>}

            {score >= 1000 && logic.isUserRoleRegular() ? <LocationButton onClick={handleLocationClicked} id="Syrup-Village" className="absolute left-[45.06%] top-[39.9%] transform -translate-x-1/2"></LocationButton> :
                <DisabledLocationButton onClick={handleDisabledLocationClicked} id="Syrup-Village" className="absolute left-[45.06%] top-[39.9%] transform -translate-x-1/2"></DisabledLocationButton>}

            {score >= 1750 && logic.isUserRoleRegular() ? <LocationButton onClick={handleLocationClicked} id="Baratie" className="absolute left-[58%] top-[65%] transform -translate-x-1/2"></LocationButton> :
                <DisabledLocationButton onClick={handleDisabledLocationClicked} id="Baratie" className="absolute left-[58%] top-[65%] transform -translate-x-1/2"></DisabledLocationButton>}

            {score >= 3000 && logic.isUserRoleRegular() ? <LocationButton onClick={handleLocationClicked} id="Arlong-Park" className="absolute left-[25.87%] top-[34.8%] transform -translate-x-1/2"></LocationButton> :
                <DisabledLocationButton onClick={handleDisabledLocationClicked} id="Arlong-Park" className="absolute left-[25.87%] top-[34.8%] transform -translate-x-1/2"></DisabledLocationButton>}

            {score >= 5000 && logic.isUserRoleRegular() ? <LocationButton onClick={handleLocationClicked} id="Loguetown" className="absolute left-[15.75%] top-[68.2%] transform -translate-x-1/2"></LocationButton> :
                <DisabledLocationButton onClick={handleDisabledLocationClicked} id="Loguetown" className="absolute left-[15.75%] top-[68.2%] transform -translate-x-1/2"></DisabledLocationButton>}
        </div>

        {selectedArc && <DetailedInfo characters={characters} selectedArc={selectedArc} />}
    </main>
}