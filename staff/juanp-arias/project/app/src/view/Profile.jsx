import logic from '../logic'
import { Field, Input, Label, Form, DoneButton, CancelButton, Main, Loading } from './library'
import { useState, useEffect } from 'react'
import { useLocation } from 'react-router-dom'
import { SectionHeader, SectionContainer } from './components'
import { errors } from 'com'
import useContext from './useContext'

const { SystemError } = errors
export default function Profile({ onCancelClick }) {
    const [datos, setDatos] = useState(null)
    const location = useLocation()
    const { alert, confirm } = useContext()

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
        try {
            fetchDatos()
        } catch (error) {
            alert(error.message)
            console.error(error)
        }
    }, [location.pathname])

    if (!datos) return <Loading />

    const handleSubmit = event => {
        event.preventDefault()
        const { target: form } = event
        const { name: { value: name }, email: { value: email }, dateOfBirth: { value: dateOfBirth }, role: { value: role } } = form

        confirm('Are you sure you want to update your data? Please double-check before proceeding.', accepted => {
            if (accepted) {
                try {
                    logic.updateUserData(name, email, dateOfBirth, role)
                        .then(() => {
                            form.reset()
                            alert('Data changed', 'success')
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
                } catch (error) {
                    alert(error.message)
                    console.error(error)
                }
            }
        }, 'warn')
    }
    const handleCancelClick = event => {
        event.preventDefault()
        onCancelClick()
    }
    const birthdate = new Date(datos.dateOfBirth).toLocaleDateString()
    return <Main>
        <SectionContainer>
            <SectionHeader sectionName='profile' />
            <Form onSubmit={handleSubmit} className='p-6 space-y-1'>
                <Field>
                    <Label htmlFor='name'>Name</Label>
                    <Input id='name' defaultValue={datos.name}></Input>
                </Field>
                <Field>
                    <Label htmlFor='email'>E-mail</Label>
                    <Input id='email' defaultValue={datos.email}></Input>
                </Field>
                <Field>
                    <Label htmlFor='dateOfBirth'>Birthdate</Label>
                    <Input type='text' defaultValue={birthdate} disabled></Input>
                    <Input id='dateOfBirth' type='hidden' defaultValue={datos.dateOfBirth}></Input>
                </Field>
                <Field>
                    <Label htmlFor='role'>Role</Label>
                    <Input id='role' type='text' defaultValue={datos.role} disabled />
                </Field>
                <div className='flex justify-end space-x-2 mr-1'>
                    <p className='text-gray-600 font-semibold text-xs dark:text-gray-400'>💡 Keeping your profile up-to-date is important! Please make sure both your <strong>name</strong> and <strong>email address</strong> are correctly filled in.</p>
                    <CancelButton onClick={handleCancelClick}>Cancel</CancelButton>
                    <DoneButton type='submit'>Done</DoneButton>
                </div>
            </Form>
        </SectionContainer>
    </Main>
}