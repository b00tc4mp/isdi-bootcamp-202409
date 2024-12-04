import logic from '../logic'
import { Field, Input, Label, Form, Button } from './library'
import { useState, useEffect } from 'react'
import { useLocation } from 'react-router-dom'
import { SectionHeader, SectionContainer } from './components'
import { errors } from 'com'
import useContext from './useContext'

const { SystemError } = errors

export default function Profile() {
    const [datos, setDatos] = useState(null)
    const location = useLocation()
    const { alert } = useContext()

    const fetchDatos = () => {
        if (logic.isUserLoggedIn()) {
            logic.getUserDatos()
                .then((userDatos) => {
                    setDatos(userDatos)
                })
                .catch((error) => {
                    alert(error.message)
                    console.error(error)
                })
        } else {
            setDatos(null)
        }
    }

    useEffect(() => {
        fetchDatos()
    }, [location.pathname])

    if (!datos) {
        return <main className="flex justify-center items-center bg-gray-100 min-h-screen">
            <p>Loading...</p>
        </main>
    }

    const handleSubmit = event => {
        event.preventDefault();
        const { target: form } = event;
        const {
            name: { value: name },
            email: { value: email },
            dateOfBirth: { value: dateOfBirth },
            role: { value: role },
        } = form;

        logic.updateUserData(name, email, dateOfBirth, role)
            .then(() => {
                form.reset()
                alert('Data changed')
                fetchDatos()
            })
            .catch((error) => {
                if (error instanceof SystemError) {
                    alert('Sorry, try again later.')
                } else {
                    alert(error.message)
                }
                console.error(error)
                form.reset()
            })
    }

    return <main className="flex justify-center items-center bg-gray-100 min-h-screen pb-8">
        <SectionContainer>
            <SectionHeader sectionName="profile" />
            <Form onSubmit={handleSubmit} className="p-6 space-y-1">
                <Field>
                    <Label htmlFor="name">Name</Label>
                    <Input id="name" defaultValue={datos.name}></Input>
                </Field>
                <Field>
                    <Label htmlFor="email">E-mail</Label>
                    <Input id="email" defaultValue={datos.email}></Input>
                </Field>
                <Field>
                    <Label htmlFor="dateOfBirth">Birthdate</Label>
                    <Input id="dateOfBirth" type="date" defaultValue={datos.dateOfBirth}></Input>
                </Field>
                <Field>
                    <Label htmlFor="role">Role</Label>
                    <Input id="role" type="text" defaultValue={datos.role} />
                </Field>
                <Button type="submit">Done</Button>
            </Form>
        </SectionContainer>
    </main>
}
