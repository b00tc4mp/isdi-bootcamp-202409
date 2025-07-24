import { useState } from 'react'
import { errors } from '../../com/index.js'
import logic from '../logic/index.js'
const { SystemError } = errors
import { LoginForm } from './components/LoginForm.jsx'
import { RotatingLoginText } from './components/RotatingLoginText.jsx'
import { useSettings } from './SettingsContext.jsx'
import { useNavigate } from 'react-router-dom';

export default function Login(props) {
  console.log('Login -> render')

  const { language } = useSettings()
  const navigate = useNavigate();

  const texts = {
    es: {
      noAccount: '¿No tienes cuenta?',
      signup: 'Regístrate',
      systemError: 'Lo sentimos, intenta más tarde.'
    },
    en: {
      noAccount: "Don't have an account?",
      signup: 'Sign Up',
      systemError: 'Sorry, try again later.'
    }
  }

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const handleSubmit = event => {
    event.preventDefault()

    try {
      logic.loginUser(email, password)
        .then(() => {
          setEmail('')
          setPassword('')
          props.onLoggedIn()
        })
        .catch(error => {
          if (error instanceof SystemError)
            alert(texts[language].systemError)
          else
            alert(error.message)

          console.error(error)
        })
    } catch (error) {
      alert(error.message)
      console.error(error)
    }
  }

 const handleRegisterClick = event => {
  event.preventDefault();
  navigate('/register', { state: { fromLogin: true } });
};

  return (
    <main className="min-h-screen flex items-center justify-center bg-[#edf6f9] flex-col">

      <RotatingLoginText />

      <LoginForm
        email={email}
        setEmail={setEmail}
        password={password}
        setPassword={setPassword}
        onSubmit={handleSubmit}
      />
      <p className="mt-4 text-sm text-gray-600">{texts[language].noAccount}</p>
      <a href="" onClick={handleRegisterClick} className="text-blue-500 hover:underline">
        {texts[language].signup}
      </a>
    </main>
  )
}
