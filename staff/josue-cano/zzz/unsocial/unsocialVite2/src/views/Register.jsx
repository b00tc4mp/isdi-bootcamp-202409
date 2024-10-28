
import { Component } from 'react'
import registerUser from '../components/logic/registerUser';
import PasswordInput from '../components/library/PasswordInput';



class Register extends Component {
    constructor(props){
        super(props)
        this.registrarUsuario=this.registrarUsuario.bind(this)
    }
    
    registrarUsuario(event){
        event.preventDefault()
        
        // const { target: { username: { value: username }, password: { value: password } } } = event
        // const usuario = event.target.username.value
        // const clave = event.target.password.value
        //form es un alias para el objeto target
        const {target:form} = event  

        const {
            name :{value:name},
            email :{value:email},
            username :{value:username},
            password :{value:password},
            ['password-repeat']:{value:repeat}
        }=form

        try {
            registerUser(name, email, username, password,repeat)

            event.target.reset()

            this.props.toLogin()
        } catch (error) {
            //passwordInput.setValue('')

            alert(error.message)

            console.error(error)
        
    }
    }

    render(){
        return <section>
        <h2>Register</h2>

        <form onSubmit={this.registrarUsuario}>
            <label htmlFor="name">Name</label>
            <input type="text" id="name" style={{ width: '100%', boxSizing: 'border-box' }} />

            <label htmlFor="email">E-mail</label>
            <input type="email" id="email" style={{ width: '100%', boxSizing: 'border-box' }} />

            <label htmlFor="username">Username</label>
            <input type="text" id="username" style={{ width: '100%', boxSizing: 'border-box' }} />

            <label htmlFor="password">Password</label>
            <PasswordInput id="password" />

            <label htmlFor="password-repeat">Repeat Password</label>
            <PasswordInput id="password-repeat" />

            <button type="submit">Register</button>


        </form>
            
        <a href="" onClick={event => {
            event.preventDefault()

            this.props.toLogin()
        }}>Login</a>

    </section>
}
}

export default Register;