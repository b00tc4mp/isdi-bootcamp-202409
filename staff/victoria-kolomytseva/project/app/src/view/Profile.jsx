import { useParams } from 'react-router-dom'
import { errors } from 'com'
const { SystemError } = errors
import { Input, Button, Form, Field, Label } from './library'
import useContext from './useContext'
import logic from '../logic'
import { useState, useEffect } from 'react'

export default function Profile(props) {
    const { userId } = useParams()
    const { alert } = useContext()
    const handleSubmit = event => {
        event.preventDefault()

        const { target: form } = event
        const {
            name: { value: name },
            surname: { value: surname },
            phone: { value: phone },
            city: { value: city },
            postalCode: { value: postalCode }
        } = form

        try {
            logic.updateUserProfile(userId, name, surname, phone, city, postalCode)
                .then(() => {
                    alert('Saved successfully', 'success')
                })
                .catch(error => {
                    if (error instanceof SystemError)
                        alert('Sorry, try again later.')
                    else
                        alert(error.message)

                    console.error(error)
                })
        } catch (error) {
            alert(error.message)

            console.error(error)
        }
    }
    const handleLogoutClick = event => {
        event.preventDefault()

        props.handleUserLoggedOut()
    }

    const [formData, setFormData] = useState({
        name: '',
        surname: '',
        phone: '',
        city: '',
        postalCode: ''
    })

    useEffect(() => {
        try {
            logic.getUser(userId)// una función `getUser` para obtener los datos del usuario
                .then(user => {
                    setFormData({
                        name: user.name,
                        surname: user.surname,
                        phone: user.phone,
                        city: user.city,
                        postalCode: user.postalCode
                    })
                })
                .catch(error => {
                    console.error(error)
                    alert(error.message)
                })
        } catch (error) {
            console.error(error)
            alert(error.message)
        }
    }, [userId])


    return <main className="flex justify-center items-center flex-col h-screen box-border  from-background-light to-background-dark bg-gradient-to-b">


        <Form onSubmit={handleSubmit}>
            <Field>

                <Label htmlFor="name">Name</Label>
                <Input type="text" id="name" defaultValue={formData.name} />
            </Field>

            <Field>
                <Label htmlFor="surname">Surname</Label>
                <Input type="text" id="surname" defaultValue={formData.surname} />
            </Field>

            <Field>
                <Label htmlFor="phone">Phone</Label>
                <Input type="text" id="phone" defaultValue={formData.phone} />
            </Field>

            <Field>
                <Label htmlFor="city">City</Label>
                <Input type="text" id="city" defaultValue={formData.city} />
            </Field>
            <Field>
                <Label htmlFor="postalCode">Postal Code</Label>
                <Input type="text" id="postalCode" defaultValue={formData.postalCode} />
            </Field>

            <Button type="submit" className="from-primary-light to-primary-dark bg-gradient-to-b mt-10">Save</Button>
        </Form>


        <Button className="absolute top-2 right-2 bg-secondary mt-1 w-40" onClick={handleLogoutClick}>Logout</Button>

    </main>
}

