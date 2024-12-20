import React, { useContext } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import logic from '../logic/index'
import { errors } from 'com'
import { ShopContext } from '../context/ShopContext'
import { ToastContainer, toast } from "react-toastify"
import "react-toastify/dist/ReactToastify.css"

const { SystemError } = errors

export default function Login() {
    const navigate = useNavigate()
    const { setUserLoggedIn } = useContext(ShopContext)

    const onSubmitHandler = (event) => {
        event.preventDefault()

        const { target: { username: { value: username }, password: { value: password } } } = event

        try {
            logic.loginUser(username, password)
                .then(() => {
                    event.target.reset()
                    setUserLoggedIn(true)
                    navigate('/')
                })
                .catch(error => {
                    if (error instanceof SystemError)
                        toast.error('Sorry, try again later')
                    else
                        toast.error(error.message)
                    console.error(error)
                })
        } catch (error) {
            alert(error.message)

            console.error(error)
        }
    }

    return (
        <form onSubmit={onSubmitHandler} className='flex flex-col items-center w-[90%] sm:max-w-96 m-auto mb-72 mt-24 gap-4 text-white'>
            <ToastContainer />
            <div className='inline-flex items-center gap-2 mb-2 mt-10'>
                <p className='text-3xl text-white'>Login</p>
                <hr className=' border-none h-[1.5px] w-8 bg-green-700' />
            </div>
            <label htmlFor="username"></label>
            <input type="text" name="username" id="username" className='w-full px-3 py-2 border rounded focus:outline-none focus:ring-0 focus:border-green-700 caret-green-700 bg-black' placeholder='Username' required />
            <label htmlFor="password"></label>
            <input type="password" name="password" id="password" className='w-full px-3 py-2 border rounded focus:outline-none focus:ring-0 focus:border-green-700 caret-green-700 bg-black' placeholder='Password' required />
            <div className='w-full flex justify-between text-sm mt-[-8px]'>
                <p className='cursor-pointer hover:text-green-700'>Forgot you password?</p>
                <Link to='/register'>
                    <p className='cursor-pointer hover:text-green-700 text-decoration: underline underline-offset-2 '>Create account</p>
                </Link>
            </div >
            <button type='submit' className='bg-green-700 text-white  px-8 py-2 rounded-md h-11 border-solid border-[1px] border-white font-light'>Login</button>
        </form >
    )
}

