import logic from '../logic'
import { useState } from 'react'
import useContext from './useContext'
import { Label, Input, Button, Form, Field } from './library'
import { imageToBase64 } from '../util'
import LocationInput from "./components/LocationInput.jsx"
import { useNavigate } from 'react-router-dom'

export default function CreatePost() {
    const [images, setImages] = useState([])
    const { alert } = useContext()
    const [location, setLocation] = useState(null)
    const navigate = useNavigate()

    const handleSubmit = async event => {
        event.preventDefault()

        const { target: form } = event

        const {
            petType: { value: petType },
            whatHappened: { value: whatHappened },
            petGender: { value: petGender },
            text: { value: text }
        } = form

        const files = form.image.files
        const filetoB64Conversions = Array.prototype.map.call(files, imageToBase64)

        const locationFormatted = {
            coordinates: [location.lat, location.lon],
            address: location.address,
            province: location.province,
        }

        Promise.all(filetoB64Conversions).then((filesb64) => {
            try {
                logic.createPost(filesb64[0], whatHappened, petType, petGender, text, locationFormatted)
                    .then((createdPost) => {
                        alert('Saved successfully', 'success')
                        form.reset()
                        navigate("/")
                    })
                    .catch(error => {
                        alert(error.message)
                        console.error(error)
                    })
            } catch (error) {
                alert(error.message)

                console.error(error)
            }
        })
    }


    const handleImageChange = (event) => {
        const { files } = event.target
        const images = Array.prototype.map.call(files, (file) =>
            URL.createObjectURL(file)
        )
        setImages(images)
    }

    return <div className="pt-4 pb-24 min-h-screen from-background-light to-background-dark bg-gradient-to-b flex flex-col space-y-10">
        <p className='text-center font-semibold'>Upload ad</p>
        <Form onSubmit={handleSubmit}>
            <Field>

                <Label htmlFor="whatHappened" className='text-center font-medium'>What happened?</Label>
                <ul className="flex flex-row w-full gap-6 justify-center">
                    <li>
                        <input type="radio" name="whatHappened" id="lost" value="lost" className="hidden peer" />
                        <label htmlFor="lost" className="flex flex-col items-center justify-between w-full p-2 text-gray-500 bg-white border border-gray-200 rounded-lg cursor-pointerdark:peer-checked:text-blue-500 peer-checked:border-blue-600 peer-checked:text-blue-600 hover:text-gray-600 hover:bg-gray-100">
                            <p>Lost my mascot</p>
                        </label>
                    </li>
                    <li>
                        <input type="radio" name="whatHappened" id="found" value="found" className="hidden peer" />
                        <label htmlFor="found" className="flex flex-col items-center justify-between w-full p-2 text-gray-500 bg-white border border-gray-200 rounded-lg cursor-pointerdark:peer-checked:text-blue-500 peer-checked:border-blue-600 peer-checked:text-blue-600 hover:text-gray-600 hover:bg-gray-100">
                            <p>Found my mascot</p>
                        </label>
                    </li>
                </ul>

            </Field>

            <Field>
                <Label htmlFor="petType" className='text-center font-medium'>What kind of pet?</Label>
                <ul className="flex flex-row w-full gap-6 justify-center">
                    <li>
                        <input type="radio" id="dog" name="petType" value="dog" className="hidden peer" />
                        <label htmlFor="dog" className="flex flex-col items-center justify-between w-full p-2 text-gray-500 bg-white border border-gray-200 rounded-lg cursor-pointerdark:peer-checked:text-blue-500 peer-checked:border-blue-600 peer-checked:text-blue-600 hover:text-gray-600 hover:bg-gray-100">
                            <img className='h-6 w-6' src="assets/dog.svg" />
                            <p>dog</p>
                        </label>
                    </li>
                    <li>
                        <input type="radio" id="cat" name="petType" value="cat" className="hidden peer" />
                        <label htmlFor="cat" className="flex flex-col items-center justify-between w-full p-2 text-gray-500 bg-white border border-gray-200 rounded-lg cursor-pointerdark:peer-checked:text-blue-500 peer-checked:border-blue-600 peer-checked:text-blue-600 hover:text-gray-600 hover:bg-gray-100">
                            <img className='h-6 w-6' src="assets/cat.svg" />
                            <p>cat</p>
                        </label>
                    </li>
                    <li>
                        <input type="radio" id="ferret" name="petType" value="ferret" className="hidden peer" />
                        <label htmlFor="ferret" className="flex flex-col items-center justify-between w-full p-2 text-gray-500 bg-white border border-gray-200 rounded-lg cursor-pointerdark:peer-checked:text-blue-500 peer-checked:border-blue-600 peer-checked:text-blue-600 hover:text-gray-600 hover:bg-gray-100">
                            <img className='h-6 w-6' src="assets/ferret.svg" />
                            <p>ferret</p>
                        </label>
                    </li>
                </ul>

            </Field>
            <Field>
                <Label htmlFor="petGender" className='text-center font-medium'>Gender</Label>
                <ul className="flex flex-row w-full gap-6 justify-center">
                    <li>
                        <input type="radio" id="male" name="petGender" value="male" className="hidden peer" />
                        <label htmlFor="male" className="flex flex-col items-center justify-between w-full p-2 text-gray-500 bg-white border border-gray-200 rounded-lg cursor-pointerdark:peer-checked:text-blue-500 peer-checked:border-blue-600 peer-checked:text-blue-600 hover:text-gray-600 hover:bg-gray-100">
                            <img className='h-6 w-6' src="assets/male.svg" />
                            <p>male</p>
                        </label>
                    </li>
                    <li>
                        <input type="radio" id="female" name="petGender" value="female" className="hidden peer" />
                        <label htmlFor="female" className="flex flex-col items-center justify-between w-full p-2 text-gray-500 bg-white border border-gray-200 rounded-lg cursor-pointerdark:peer-checked:text-blue-500 peer-checked:border-blue-600 peer-checked:text-blue-600 hover:text-gray-600 hover:bg-gray-100">
                            <img className='h-6 w-6' src="assets/female.svg" />
                            <p>female</p>
                        </label>
                    </li>
                </ul>
            </Field>
            <Field>
                <Label htmlFor="text" className='text-center font-medium mt-1 w-30'>Pet feature</Label>
                <Input type="text" id="text" />
            </Field>

            <Field>

                <Label htmlFor="image" className='text-center font-medium mt-1 w-30'>Upload image</Label>
                <input type="file" name="image" id="image" onChange={handleImageChange} />

            </Field>
            <Field>
                <LocationInput
                    onLocationSelect={(location) => {
                        setLocation(location)
                    }}
                />
            </Field>
            {location && (
                <p className="text-green mt-2">
                    Dirección seleccionada: {location.address}
                </p>
            )}
            <Button type="submit" className="from-primary-light to-primary-dark bg-gradient-to-b mt-1 w-40 mx-auto">Create</Button>
        </Form>
    </div>
}