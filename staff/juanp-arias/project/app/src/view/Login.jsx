import logic from '../logic'
import { errors } from 'com'
import logo2 from '../assets/logo2.png'
import { Input, Label, Field, Button, Form } from './library'
import useContext from './useContext'

const { SystemError } = errors
export default function Login(props) {
    const { alert } = useContext()

    const handleSubmit = event => {
        event.preventDefault()
        const { target: { email: { value: email }, password: { value: password } } } = event
        try {
            logic.loginUser(email, password)
                .then(() => {
                    event.target.reset()
                    props.onLoggedIn()
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

    const goBackClick = event => {
        event.preventDefault()
        props.onBackClick()
    }

    return <main className='flex items-center justify-center h-screen bg-gradient-to-b from-gray-50 to-blue-100 dark:from-gray-800 dark:to-gray-900 transition-colors duration-300'>
        <div className='bg-white dark:bg-gray-800 p-6 rounded-xl shadow-lg w-full max-w-sm'>
            <div className='flex justify-between items-center'>
                <div>
                    <h1 className='text-2xl font-bold text-gray-900 dark:text-white'>Welcome back</h1>
                    <p className='text-sm text-gray-500 dark:text-gray-400 mt-1'>Log-in to your account</p>
                </div>
                <img src={logo2} alt='Logo' className='h-16 w-16 rounded-full shadow-md' />
            </div>
            <Form onSubmit={handleSubmit} className='mt-6 space-y-4'>
                <Field>
                    <Label htmlFor='email'>E-mail</Label>
                    <Input type='email' id='email' placeholder='E-mail' />
                </Field>
                <Field>
                    <Label htmlFor='password'>Password</Label>
                    <Input type='password' id='password' placeholder='Password' />
                </Field>
                <div className='forgot-link'>
                    <a href='#' className='text-sm text-blue-500 dark:text-blue-400 hover:underline'>Forgot password?</a>
                </div>
                <Button type='submit'>Log in</Button>
            </Form>
            <p className='text-xs text-center text-gray-500 dark:text-gray-400 mt-4'>
                By continuing, you agree to our{' '}
                <a href='#' className='text-blue-500 dark:text-blue-400 hover:underline'>Terms of Service</a>{' '}
                and{' '}
                <a href='#' className='text-blue-500 dark:text-blue-400 hover:underline'>Privacy Policy</a>.
            </p>
            <div className='mt-6 text-center'>
                <a href='' className='text-sm text-blue-500 dark:text-blue-400 hover:underline' onClick={goBackClick}>Go back</a>
            </div>
        </div>
    </main>
}    