import { PasswordInput, Input, Button, Form, Label } from './library'
import logic from '../logic'
import './Profile.css'

export default function Profile(props) {

    const handleSubmit = event => {
        event.preventDefault()

        const { target: { username: { value: username }, password: { value: password } } } = event

        try {
            logic.loginUser(username, password, error => {
                if (error) {
                    alert(error.message)
                    console.error(error)

                    return
                }
                event.target.reset()

                props.onLoggedIn()
            })

        } catch (error) {

            alert(error.message)
            console.error(error)
        }
    }

    const handleHomeClick = event => {
        event.preventDefault()
        props.onHomeClick()
    }

    return <main className='Profile'>
        <h2>Profile</h2>
        <img src="https://www.pngall.com/wp-content/uploads/5/Profile-PNG-File.png" alt="" />
        <Form onSubmit={handleSubmit}>
            <Label htmlfor="username">Username</Label>
            <Input type="text" id="username" placeholder="username"></Input>

            <Label htmlfor="password">Password</Label>
            <PasswordInput id="password" placeholder="password" />

            <Button type="submit"><strong>LOGIN</strong></Button>
        </Form>

        <a href="" onClick={handleHomeClick}>Home</a>

    </main>
}
