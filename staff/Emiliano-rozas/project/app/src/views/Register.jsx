import React from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { ToastContainer, toast } from "react-toastify"
import "react-toastify/dist/ReactToastify.css"
import logic from '../logic/index'
import { errors } from 'com'

const { SystemError } = errors

export default function Register() {
    const navigate = useNavigate()

    const onSubmitHandler = event => {
        event.preventDefault()

        const { target: form } = event

        const {
            name: { value: name },
            username: { value: username },
            email: { value: email },
            password: { value: password },
            ['password-repeat']: { value: passwordRepeat }
        } = form
        try {
            logic.registerUser(name, email, username, password, passwordRepeat)
                .then(() => {
                    form.reset()
                    navigate('/login')
                    toast.success('User successfully registered')
                })
                .catch(error => {
                    if (error instanceof SystemError)
                        toast.error('Sorry, try again later.')
                    else
                        toast.warning(error.message)
                    console.error(error)
                })
        } catch (error) {
            toast.error(error.message)

            console.error(error)
        }
    }

    return (
        <form onSubmit={onSubmitHandler} className='flex flex-col items-center w-[90%] sm:max-w-96 m-auto mb-6 mt-14 gap-4 text-white'>
            <ToastContainer />
            <div className='inline-flex items-center gap-2 mb-2 mt-10'>
                <p className='text-3xl text-white'>Register</p>
                <hr className=' border-none h-[1.5px] w-8 bg-green-700' />
            </div>
            <label htmlFor="name"></label>
            <input type="text" className='w-full px-3 py-2 border rounded focus:outline-none focus:ring-0 focus:border-green-700 caret-green-700 bg-black' id="name" placeholder='Name' required />

            <label htmlFor="username"></label>
            <input type="text" className='w-full px-3 py-2 border rounded focus:outline-none focus:ring-0 focus:border-green-700 caret-green-700 bg-black' id="username" placeholder='Username' required />

            <label htmlFor="email"></label>
            <input type="email" className='w-full px-3 py-2 border roundedfocus:outline-none focus:ring-0 focus:border-green-700 caret-green-700 bg-black' placeholder='Email' id="email" required />

            <label htmlFor="password"></label>
            <input type="password" className='w-full px-3 py-2 border rounded focus:outline-none focus:ring-0 focus:border-green-700 caret-green-700 bg-black' placeholder='Password' id="password" required />

            <label htmlFor="password-repeat"></label>
            <input type="password" className='w-full px-3 py-2 border rounded focus:outline-none focus:ring-0 focus:border-green-700 caret-green-700 bg-black' placeholder='Repeat Password' id="password-repeat" required />

            <div className='w-full flex justify-between text-sm mt-[-8px]'>
                <p className='cursor-pointer hover:text-green-700'>Forgot you password?</p>
                <Link to='/login'>
                    <p className='cursor-pointer  text-decoration: underline  hover:text-green-700 underline-offset-2	'>Login Here</p>
                </Link>
            </div >
            <button type='submit' className='bg-green-700 text-white  px-8 py-2 rounded-md h-11 border-solid border-[1px] border-white font-light'>Register</button>
        </form >
    )
}

