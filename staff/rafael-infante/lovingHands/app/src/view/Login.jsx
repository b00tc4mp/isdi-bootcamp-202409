import Logo from '../assets/logo.png'

import logic from '../logic'

import { errors } from 'com'

const { SystemError } = errors

import useContext from './useContext'

export default function Login(props) {
  console.log('Login -> render')

  const { alert } = useContext()

  const handleSubmit = (event) => {
    event.preventDefault()

    const { target: form } = event

    const {
      email: { value: email },
      password: { value: password },
    } = form

    try {
      logic
        .loginUser(email, password)
        .then(() => {
          form.reset()

          props.onLoggedIn()
        })
        .catch((error) => {
          if (error instanceof SystemError) alert('Sorry, try again later.')
          else alert(error.message)

          console.error(error)
        })
    } catch (error) {
      alert(error.message)

      console.error(error)
    }
  }

  const handleRegisterClick = (event) => {
    event.preventDefault()

    props.onRegisterClick()
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-screen text-gray-800 bg-gray-50 px-4">
      {/* Logo */}
      <div className="mb-6">
        <img src={Logo} alt="Loving Hands Logo" className="h-12" />
      </div>

      {/* Login Form */}
      <h1 className="text-2xl font-bold text-center mb-4">Login to Loving Hands</h1>
      <p className="text-center text-sm text-gray-600 mb-6">Please enter your credentials to access your account.</p>

      <form onSubmit={handleSubmit} className="w-full max-w-sm space-y-4">
        {/* Email Field */}
        <div>
          <label htmlFor="email" className="block text-sm font-medium text-gray-700">
            Email Address
          </label>
          <input
            type="email"
            id="email"
            placeholder="Enter your email"
            className="mt-1 w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 text-sm"
          />
        </div>

        {/* Password Field */}
        <div>
          <label htmlFor="password" className="block text-sm font-medium text-gray-700">
            Password
          </label>
          <input
            type="password"
            id="password"
            placeholder="Enter your password"
            className="mt-1 w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 text-sm"
          />
        </div>

        {/* Login Button */}
        <button
          type="submit"
          className="w-full bg-blue-500 text-white py-2 px-4 rounded-lg shadow-md hover:bg-blue-600 transition-all duration-200"
        >
          Login
        </button>
      </form>

      {/* Register Link */}
      <p className="text-center text-sm text-gray-600 mt-4">
        Don't have an account?{' '}
        <a onClick={handleRegisterClick} href="/register" className="text-blue-500 hover:underline">
          Register
        </a>
      </p>
    </div>
  )
}
