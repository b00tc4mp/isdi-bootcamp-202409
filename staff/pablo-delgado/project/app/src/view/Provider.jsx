///WIPP
import { useState, useRef } from 'react'
//import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet'
//import 'leaflet/dist/leaflet.css'

// import Container from '../library/Container'
// import Heading from '../library/Heading'
// import Image from '../library/Image'
// import Paragraph from '../library/Paragraph'
// import Button from '../library/Button'

export default function HealthCareProvider({ healthCareProvider }) {
    const mapRef = useRef()
    const [openingHoursVisible, setOpeningHoursVisible] = useState(false)
    const [mapVisible, setMapVisible] = useState(false)

    const onOpeningHoursClick = () => setOpeningHoursVisible(true)

    const onCancelOpeningHoursClick = () => setOpeningHoursVisible(false)

    const onOpenMapClick = () => setMapVisible(true)

    const onCloseMapClick = () => setMapVisible(false)

    return <article className="shadow-lg bg-white p-6 rounded-xl mx-5 mb-5 z-10">
        <Container className="flex flex-col justify-center items-center space-y-4">
            <Heading className="font-extrabold text-2xl text-center text-gray-800">{healthCareProvider.name}</Heading>

            <Container className="flex flex-row h-auto w-full space-x-4">
                <Container className="flex-shrink-0">
                    <Image className="w-32 h-32 object-cover rounded-xl" src={healthCareProvider.image} alt={healthCareProvider.name} />
                </Container>

                <Container className="flex flex-col flex-grow space-y-3">
                    <Paragraph className="text-gray-600">{healthCareProvider.street}</Paragraph>

                    {healthCareProvider.openingHours[0] === 'Open 24h' ? (
                        <Paragraph className="text-green-500 font-semibold">Open 24H</Paragraph>
                    ) : (
                        <Button className="text-blue-600 underline hover:text-blue-800" onClick={onOpeningHoursClick}>
                            View Opening Hours
                        </Button>
                    )}

                    {openingHoursVisible && (
                        <>
                            <ul className="list-disc ml-5 text-gray-600">
                                {healthCareProvider.openingHours.map((hour, index) => (
                                    <li key={index}>{hour}</li>
                                ))}
                            </ul>
                            <Button className="text-red-600 underline hover:text-red-800" onClick={onCancelOpeningHoursClick}>
                                Hide Opening Hours
                            </Button>
                        </>
                    )}

                    <a
                        className="text-blue-500 underline break-words hover:text-blue-700 break-all"
                        href={healthCareProvider.webURL}
                        target="_blank"
                        rel="noopener noreferrer"
                    >
                        {healthCareProvider.webURL}
                    </a>

                    <a
                        className="text-blue-500 underline break-words hover:text-blue-700"
                        href={`tel:${healthCareProvider.phoneNumber}`}
                    >
                        {healthCareProvider.phoneNumber}
                    </a>
                </Container>
            </Container>

            <Button className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition" onClick={onOpenMapClick}>
                View on Map
            </Button>

            {mapVisible && (
                <Container className="relative w-full max-w-md mt-4">
                    <MapContainer
                        className="h-[200px] w-full rounded-2xl z-0" // Remove z-index from Map
                        center={healthCareProvider.location.coordinates}
                        zoom={13}
                        ref={mapRef}
                    >
                        <TileLayer
                            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                        />
                        <Marker position={healthCareProvider.location.coordinates}>
                            <Popup>
                                {healthCareProvider.name}
                                <br />
                                <a href={`http://maps.google.com/maps?q=${healthCareProvider.location.coordinates}`} target="_blank" rel="noopener noreferrer" className="underline">
                                    Google Maps
                                </a>
                            </Popup>
                        </Marker>
                    </MapContainer>

                    <Container className="flex justify-center items-center h-full mt-3">
                        <Button
                            className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600 transition z-10"
                            onClick={onCloseMapClick}
                        >
                            Close Map
                        </Button>
                    </Container>

                </Container>
            )}
        </Container>
    </article>
}