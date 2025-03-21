import Logo from '../assets/logo.png'
import logic from '../logic'
import { errors } from 'com'

const { SystemError } = errors

export default function Register(props) {
  console.log('Register -> render')

  const handleSubmit = (event) => {
    event.preventDefault()

    const { target: form } = event

    const {
      name: { value: name },
      email: { value: email },
      password: { value: password },
      passwordRepeat: { value: passwordRepeat },
    } = form

    try {
      logic
        .registerUser(name, email, password, passwordRepeat)
        .then(() => {
          form.reset()

          alert('user succesfully registered', 'success')

          props.onRegistered()
        })
        .catch((error) => {
          if (error instanceof SystemError) alert('Sorry, try again later')
          else alert(error.message)

          console.error(error)
        })
    } catch (error) {
      alert(error.message)

      console.error(error)
    }
  }

  const handleLoginClick = (event) => {
    event.preventDefault()
    props.onLoginClick()
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-screen text-gray-800 bg-gray-50 px-4">
      {/* Logo */}
      <div className="mb-6">
        <img src={Logo} alt="Loving Hands Logo" className="h-12" />
      </div>

      {/* Register Form */}
      <h1 className="text-2xl font-bold text-center mb-4">Create Your Account</h1>
      <p className="text-center text-sm text-gray-600 mb-6">
        Fill in the details below to get started with Loving Hands.
      </p>

      <form onSubmit={handleSubmit} className="w-full max-w-sm space-y-4">
        {/* Name Field */}
        <div>
          <label htmlFor="name" className="block text-sm font-medium text-gray-700">
            Full Name
          </label>
          <input
            type="text"
            id="name"
            placeholder="Enter your full name"
            className="mt-1 w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 text-sm"
          />
        </div>

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

        {/* Repeat Password Field */}
        <div>
          <label htmlFor="passwordRepeat" className="block text-sm font-medium text-gray-700">
            Repeat Password
          </label>
          <input
            type="password"
            id="passwordRepeat"
            placeholder="Repeat your password"
            className="mt-1 w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 text-sm"
          />
        </div>

        {/* Register Button */}
        <button
          type="submit"
          className="w-full bg-blue-500 text-white py-2 px-4 rounded-lg shadow-md hover:bg-blue-600 transition-all duration-200"
        >
          Register
        </button>
      </form>

      {/* Login Link */}
      <p className="text-center text-sm text-gray-600 mt-4">
        Already have an account?{' '}
        <a onClick={handleLoginClick} href="/login" className="text-blue-500 hover:underline">
          Login
        </a>
      </p>
    </div>
  )
}
