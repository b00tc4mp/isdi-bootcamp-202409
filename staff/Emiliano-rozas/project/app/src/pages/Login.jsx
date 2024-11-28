import React from 'react'
import { Link } from 'react-router-dom'

const Login = () => {

    const onSubmitHandler = (event) => {
        event.preventDefault()
    }

    return (
        <form onSubmit={onSubmitHandler} className='flex flex-col items-center w-[90%] sm:max-w-96 m-auto mt-14 gap-4 text-white'>
            <div className='inline-flex items-center gap-2 mb-2 mt-10'>
                <p className='text-3xl text-white'>Login</p>
                <hr className=' border-none h-[1.5px] w-8 bg-green-700' />
            </div>
            <input type="text" className='w-full px-3 py-2focus:outline-none focus:ring-0 focus:border-green-700 caret-green-700 bg-black ' placeholder='Username' required />
            <input type="password" className='w-full px-3 py-2focus:outline-none focus:ring-0 focus:border-green-700 caret-green-700 bg-black' placeholder='Password' required />
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

export default Login