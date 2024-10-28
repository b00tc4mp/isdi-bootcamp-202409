let loggedInUser = null //no hay ningún usuario conectado al inicio

const rootElement = document.getElementById('root') //donde se montarán todos los componentes de la aplicación
const root = ReactDOM.createRoot(rootElement) // para mostrar los componentes de React en la página web.

const { Component } = React //para poder crear componentes de clase

class PasswordInput extends Component {
    constructor(props) {
        console.log('PasswordInput -> constructor')

        super(props) // this.props = props  // Se llama a super para pasar las props al constructor de la clase base.


        this.state = { status: '😌', type: 'password' } /// Se define el estado inicial
    }

    render() { //se muestra el campo de entrada y un emoji
        console.log('PasswordInput -> render')

        return <div style={{ display: 'flex', position: 'relative' }}>
            <input type={this.state.type} id={this.props.id} style={{ width: '100%', boxSizing: 'border-box', paddingRight: '18px' }} />
            <span
                style={{ cursor: 'pointer', position: 'absolute', right: '10px', top: '8px' }}
                onClick={() => this.setState({ // Cuando alguien hace clic en la carita, pasa algo divertido, this.setState({ ... }) cambia el estado del componente.
                    status: this.state.status === '😌' ? '😳' : '😌',
                    type: this.state.type === 'password' ? 'text' : 'password'
                })}
            >{this.state.status}</span>
        </div>
    }
}

function Login(props) { //Un campo de entrada para la contraseña usando el componente PasswordInput.
    console.log('Login -> render')

    return <section>
        <h2>Login</h2>

        <form onSubmit={event => { //onSubmit), recoge los valores del formulario y llama a una función authenticateUser para validar al usuario.
            event.preventDefault()

            const { target: { username: { value: username }, password: { value: password } } } = event


            try {
                loggedInUser = authenticateUser(username, password)

                event.target.reset()

                props.onLoggedIn()
            } catch (error) {
                //passwordInput.setValue('')

                alert(error.message)

                console.error(error)
            }
        }}>

            <label htmlFor="username">Username</label>
            <div style={{ display: 'flex' }}>
                <input type="text" id="username" style={{ width: '100%', boxSizing: 'border-box' }} />
            </div>

            <label htmlFor="password">Password</label>
            <PasswordInput id="password" />

            <button type="submit">Login</button>
        </form>

        <a href="">Register</a>
    </section>
}

function Register() {
    return <section>
        <h2>Register</h2>

        <form>
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

        <a href="">Login</a>
    </section>
}

function Home() {
    return <section>
        <h2>Home</h2>

        <h3>Hello, Peter Pan!</h3>
        <button type="button">Logout</button>
        <button type="button">➕</button>

        <div>
            <h3>Posts</h3>

            <article>
                <h4>wendydarling</h4>
                <img src="https://pm1.aminoapps.com/8360/ad07e2d2cdf6e1733328d6e7b7848b87db38a2bbr1-1536-2048v2_hq.jpg" style={{ width: '100%' }} />
                <p>here i am</p>
                <time>Thu Oct 17 2024 12:59:05 GMT+0200 (Central European Summer Time)</time>
            </article>

            <article>
                <h4>peterpan</h4>
                <img src="https://i.pinimg.com/originals/8c/60/1a/8c601a25311a1a5098896f751a784b54.jpg" style={{ width: '100%' }} />
                <p>here we are</p>
                <time>Thu Oct 17 2024 12:59:05 GMT+0200 (Central European Summer Time)</time>
            </article>
        </div>
    </section>
}

class App extends Component {
    constructor(props) {
        super(props)

        this.state = { view: 'login' } //// El estado inicial es la vista de inicio de sesión.
    }



    render() {
        return <div>
            <h1>Unsocial</h1>

            {this.state.view === 'login' && <Login onLoggedIn={() => this.setState({ view: 'home' })} />}
            {this.state.view === 'register' && <Register />}
            {this.state.view === 'home' && <Home />}
        </div>
    }
}

root.render(<App />)