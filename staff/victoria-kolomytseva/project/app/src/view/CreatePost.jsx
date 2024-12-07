import logic from '../logic'
import { getUserLocation } from '../logic/users'
import { useEffect, useState } from 'react'
import useContext from './useContext'
import { Label, Input, Button, Form, Field } from './library'



export default function CreatePost() {
    console.log('CreatePost -> render')
    const [location, setLocation] = useState({
        latitude: null,
        longitude: null
    })
    const { alert } = useContext()

    const handleSubmit = event => {
        event.preventDefault()

        const { target: form } = event

        const {
            image: { value: image },
            petType: { value: petType },
            whatHappened: { value: whatHappened },
            petGender: { value: petGender },
            text: { value: text }
        } = form

        const { latitude, longitude } = location

        try {
            logic.createPost(image, whatHappened, petType, petGender, text, latitude, longitude)
                .then(() => {
                    alert('Saved successfully', 'success')
                })
                .catch(error => {
                    alert(error.message)

                    console.error(error)
                })
        } catch (error) {
            alert(error.message)

            console.error(error)
        }
    }

    const handleLocationUser = async event => {
        event.preventDefault()
        const location = await logic.getUserLocation()
        console.log(location)
        setLocation({ latitude: location.coords.latitude, longitude: location.coords.longitude })
    }

    return <div className="pt-12 pb-24 min-h-screen from-background-light to-background-dark bg-gradient-to-b flex flex-col space-y-10">
        <p className='text-center font-semibold'>Upload ad</p>
        <Form onSubmit={handleSubmit}>
            <Field>

                <Label htmlFor="whatHappened" className='text-center font-medium'>What happened?</Label>
                <ul className="flex flex-row w-full gap-6 justify-center">
                    <li>
                        <input type="radio" name="whatHappened" id="lostMyMascot" value="lostMyMascot" className="hidden peer" />
                        <label htmlFor="lostMyMascot" className="flex flex-col items-center justify-between w-full p-2 text-gray-500 bg-white border border-gray-200 rounded-lg cursor-pointerdark:peer-checked:text-blue-500 peer-checked:border-blue-600 peer-checked:text-blue-600 hover:text-gray-600 hover:bg-gray-100">
                            <p>Lost my mascot</p>
                        </label>
                    </li>
                    <li>
                        <input type="radio" name="whatHappened" id="foundMascot" value="foundMascot" className="hidden peer" />
                        <label htmlFor="foundMascot" className="flex flex-col items-center justify-between w-full p-2 text-gray-500 bg-white border border-gray-200 rounded-lg cursor-pointerdark:peer-checked:text-blue-500 peer-checked:border-blue-600 peer-checked:text-blue-600 hover:text-gray-600 hover:bg-gray-100">
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
                <Input type="text" id="image" />

            </Field>
            <Field>
                <Button type="button" onClick={handleLocationUser} className="from-primary-light to-primary-dark bg-gradient-to-b mt-1 w-40 mx-auto">Share my location</Button>
            </Field>
            <Button type="submit" className="from-primary-light to-primary-dark bg-gradient-to-b mt-1 w-40 mx-auto">Create</Button>
        </Form>
    </div>
}