import logic from '../logic'
import { errors } from 'com'
import useContext from './useContext'
import { PasswordInput } from './components/library/index.js'

const { SystemError } = errors

export default function Settings() {
  console.debug('Settings -> render')

  const { alert } = useContext()

  const handlePasswordSubmit = (event) => {
    event.preventDefault()

    const { target: form } = event

    const {
      ['old-password']: { value: oldPassword },
      ['new-password']: { value: newPassword },
      ['password-repeat']: { value: newPasswordRepeat },
    } = form

    try {
      logic
        .changePassword(oldPassword, newPassword, newPasswordRepeat)
        .then(() => {
          form.reset()
          alert('Your password has been changed succesfully', 'good')
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

  const handleEmailSubmit = (event) => {
    event.preventDefault()
    const { target: form } = event

    const {
      ['old-email']: { value: oldEmail },
      ['new-email']: { value: newEmail },
      ['email-repeat']: { value: newEmailRepeat },
    } = form

    try {
      logic
        .changeEmail(oldEmail, newEmail, newEmailRepeat)
        .then(() => {
          form.reset()
          alert('Your email has been changed succesfully', 'good')
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
  return (
    <div className="flex flex-col items-center bg-gray-50 px-4 pt-16 pb-16 min-h-screen">
      {/* Title */}
      <h1 className="text-xl font-bold text-center text-gray-800">Settings</h1>

      {/* Change Email Section */}
      <div className="w-full max-w-md bg-white rounded-lg shadow-md p-4 mb-2">
        <h2 className="text-lg font-semibold text-gray-700 mb-3">Change Your Email</h2>
        <form onSubmit={handleEmailSubmit} className="space-y-3">
          <div>
            <input
              type="email"
              id="old-email"
              placeholder="Current Email"
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500 text-sm"
            />
          </div>
          <div>
            <input
              type="email"
              id="new-email"
              placeholder="New Email"
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500 text-sm"
            />
          </div>
          <div>
            <input
              type="email"
              id="email-repeat"
              placeholder="Repeat New Email"
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500 text-sm"
            />
          </div>
          <button
            type="submit"
            className="w-full bg-blue-500 text-white py-2 rounded-md shadow-sm hover:bg-blue-600 focus:ring focus:ring-blue-200 text-sm"
          >
            Change Email
          </button>
        </form>
      </div>

      {/* Change Password Section */}
      <div className="w-full max-w-md bg-white rounded-lg shadow-md p-4">
        <h2 className="text-lg font-semibold text-gray-700 mb-3">Change Your Password</h2>
        <form onSubmit={handlePasswordSubmit} className="space-y-3">
          <div>
            <PasswordInput id="old-password" placeholder="Current Password" />
          </div>
          <div>
            <PasswordInput id="new-password" placeholder="New Password" />
          </div>
          <div>
            <PasswordInput id="password-repeat" placeholder="Repeat New Password" />
          </div>
          <button
            type="submit"
            className="w-full bg-blue-500 text-white py-2 rounded-md shadow-sm hover:bg-blue-600 focus:ring focus:ring-blue-200 text-sm"
          >
            Change Password
          </button>
        </form>
      </div>
    </div>
  )
}
