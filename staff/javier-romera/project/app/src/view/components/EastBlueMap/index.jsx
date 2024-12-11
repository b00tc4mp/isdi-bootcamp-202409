import { Button } from '../../library'
import LocationButton from '../library/LocationButton'

export default function EastBlueMap() {
    return <main className="w-screen h-screen" >
        <div className="w-full h-full bg-cover bg-no-repeat z-10" style={{
            backgroundImage: "url('/images/eastbluemap.png')"
        }}>
            <LocationButton id="Romance-Dawn" className="absolute left-[72.3rem] top-[16rem]"></LocationButton>
        </div>
    </main>
}