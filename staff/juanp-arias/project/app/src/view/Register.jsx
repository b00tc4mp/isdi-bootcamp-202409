import { errors } from 'com'
import logo2 from '../assets/logo2.png'
import { Input, Label, Field, Button, Form } from './library'
import logic from '../logic'
import useContext from './useContext'

const { SystemError } = errors
export default function Register({ onRegistered, onBackClick }) {
    const { alert } = useContext()

    const handleSubmit = event => {
        event.preventDefault()
        const { target: form } = event
        const {
            name: { value: name },
            email: { value: email },
            dateOfBirth: { value: dateOfBirth },
            password: { value: password },
            repeatpassword: { value: repeatpassword }
        } = form

        try {
            logic.registerUser(name, email, dateOfBirth, password, repeatpassword)
                .then(() => {
                    form.reset()
                    alert('User registered', 'success')
                    onRegistered()
                })
                .catch(error => {
                    if (error instanceof SystemError)
                        alert('Sorry, try again later.')
                    else
                        alert(error.message)
                    console.error(error)
                    form.reset()
                })
        } catch (error) {
            alert(error.message)
            console.error(error)
        }
    }

    const onGoBackClick = event => {
        event.preventDefault()
        onBackClick()
    }

    return <main className='flex items-center justify-center h-screen bg-gradient-to-b from-gray-50 to-blue-100 dark:from-gray-800 dark:to-gray-900 pt-2 transition-colors duration-300'>
        <div className='bg-white dark:bg-gray-800 p-6 rounded-xl shadow-lg w-full max-w-md'>
            <div className='flex justify-between items-center mb-6'>
                <div>
                    <h1 className='text-2xl font-bold text-gray-900 dark:text-white'>
                        Welcome to <span className='text-sky-500 dark:text-sky-400'>studify</span>
                    </h1>
                    <p className='text-sm text-gray-500 dark:text-gray-400 mt-1'>Create your account</p>
                </div>
                <img src={logo2} alt='logo' className='h-16 w-16 rounded-full shadow-md' />
            </div>
            <Form onSubmit={handleSubmit} className='space-y-2'>
                <Field>
                    <Label htmlFor='name'>Your name</Label>
                    <Input type='text' id='name' placeholder='Name' />
                </Field>
                <Field>
                    <Label htmlFor='email'>Email address</Label>
                    <Input type='email' id='email' placeholder='E-mail' />
                </Field>
                <Field>
                    <Label htmlFor='dateOfBirth'>Birthdate</Label>
                    <Input type='date' id='dateOfBirth' />
                </Field>
                <Field>
                    <Label htmlFor='password'>Password</Label>
                    <Input type='password' id='password' placeholder='Password' />
                </Field>
                <Field>
                    <Label htmlFor='repeatpassword'>Password repeat</Label>
                    <Input type='password' id='repeatpassword' placeholder='Password' />
                </Field>
                <Button type='submit'>Create account</Button>
            </Form>
            <p className='text-xs text-center text-gray-500 dark:text-gray-400 mt-4'>
                By continuing, you agree to our{' '}
                <a href='#' className='text-blue-500 dark:text-blue-400 hover:underline'>Terms of Service</a>{' '}
                and{' '}
                <a href='#' className='text-blue-500 dark:text-blue-400 hover:underline'>Privacy Policy</a>.
            </p>
            <div className='mt-6 text-center'>
                <a href='' className='text-sm text-blue-500 dark:text-blue-400 hover:underline' onClick={onGoBackClick}>
                    Go back
                </a>
            </div>
        </div>
    </main>
}