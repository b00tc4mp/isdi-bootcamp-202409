import { Button, Input, Form, Anchor, PasswordInput } from './library';
import logo from "../assets/LOGOS.png";

import { errors } from 'com'


export default function Register(props) {
    console.log('Register -> render')


    const handleSubmit = event => {
        event.preventDefault()

        const { target: form } = event

        const {
            name: { value: name },
            email: { value: email },
            username: { value: username },
            password: { value: password },
            passwordRepeat: { value: passwordRepeat }
        } = form

        try {
            logic.registerUser(name, email, username, password, passwordRepeat)
                .then(() => {
                    form.reset()

                    props.onRegistered()
                })
                .catch(error => {
                    if (error instanceof SystemError)
                        alert('Sorry, try again later')
                    else
                        alert(error.message)

                    console.error(error)
                })
        } catch (error) {
            alert(error.message)

            console.error(error)
        }
    }

    const handleLoginClick = event => {
        event.preventDefault()

        props.onLoginClick()
    }

return <main className='justify-self-center h-full'>
    <div className='flex items-center justify-around mb-[32px] mt-[32px]'>
        <h1 className='text-[30px] font-bold'> Hábitos </h1>
        <img src={logo} alt=" Logo de la app" className='w-[64px] h-[64px]'/>
    </div>

    <h2 className='text-[24px] font-bold ml-[32px]'> Login </h2>

    <Form onSubmit={handleSubmit} className="bg-white p-[32px] rounded-lg shadow-md w-[320px] mb-[16px]">

        <Input type="text" placeholder="Name and surname" className='w-4/5 mb-6 mx-auto px-4 py-2 border border-gray-300 rounded'> </Input>
        <Input type="email" placeholder="E-mail" className='w-4/5 mb-6 mx-auto px-4 py-2 border border-gray-300 rounded'></Input>
        <Input type="text" placeholder="Username" className='w-4/5 mb-6 mx-auto px-4 py-2 border border-gray-300 rounded'></Input>
        <PasswordInput id="password" placeholder="password" className= 'w-4/5 mb-6 mx-auto px-4 py-2 border border-gray-300 rounded'/>
        <PasswordInput id="password-repeat" placeholder="repeat password" className='w-4/5 mb-6 mx-auto px-4 py-2 border border-gray-300 rounded' />

    <Button type="submit" className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600 transition-all"> Login </Button>
    </Form>

    <div className="mt-[16px]">
    <Anchor href="/login" onClick={handleLoginClick} className="text-blue-500 hover:underline"> Si tienes cuenta,haz login <strong>aquí</strong> </Anchor>
    </div>

</main>
}