import registerUser from '../logic/registerUser'
import PasswordInput from '../components/library/PasswordInput'

function Register() {
    console.log('Register -> render')

    return <section>
        <h2>Register</h2>

        <form onSubmit={event => {
            event.preventDefault()

            const {target: form } = event

            const { 
                name: {value: name},
                email: {value: email},
                username: { value: username},  
                password: {value: password}, 
                ['passowrd-repeat']: { value: passowrdRepeat }
            } = form

            try {
                registerUser(name, email, username, password, passwordRepeat)

               form.reset()

                props.onRegistered() 
            } catch (error) {

                alert(error.message)

                console.error(error)
            }
        }}>
        
            <label htmlFor="name">Name</label>
            <input type="text" id="name" placeholder="i.e. Tom" style={{width: '100%', boxSizing: 'border-box'}}/>

            <label htmlFor="email">E-mail</label>
            <input type="email" id="email" placeholder="i.e. unsocial@gmail.com" style={{width: '100%', boxSizing: 'border-box'}}/>

            <label htmlFor="username">Username</label>
            <input type="text" id="username" style={{width: '100%', boxSizing: 'border-box'}}/>

            <label htmlFor="password">Password</label>
            <PasswordInput id="password" />

            <label htmlFor="password-repeat">Repeat Password</label>
            <PasswordInput id="password-repeat" />

            <button type="submit">Register</button>
        </form>

        <a href="" onClick={event => {
            event.preventDefault()

            props.onLoginClick()
        }}>Login</a>
    </section>
    
}

export default Register