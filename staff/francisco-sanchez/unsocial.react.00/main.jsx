let loggedInUser = null

const rootElement = document.getElementById('root')
const root = ReactDOM.createRoot(rootElement)

const { Component } = React


//Clase PasswordInput, para el campo de contraseña, añade la funcionalidad de ver o esconderla. 
class PasswordInput extends Component {
    constructor(props) {
        console.log('Entramos en el PasswordInput -> Constructor')
        super(props)
        this.state = { status: '🫣', type: 'password' }
    }

    render() {
        console.log('Entramos en el passwordInput Render')

        return <div style={{ display: 'flex' }}>
            <input type={this.state.type} id={this.props.id} style={{ width: '100%', boxSizing: 'border-box', paddingRight: '18px' }} />
            <span
                style={{ cursor: 'pointer', position: 'absolute', right: '10px' }}
                onClick={() => this.setState({
                    status: this.state.status === '🫣' ? '🥹' : '🫣',
                    type: this.state.type === 'password' ? 'text' : 'password'
                })}
            >{this.state.status}</span>
        </div>

    }

}


//Función login, que será nuestra primera pantalla de la aplicación
function Login(props) {
    return <section>
        <h2>Login</h2>

        <form onSubmit={event => {
            event.preventDefault()

            const { target: { username: { value: username }, password: { value: password } } } = event

            try {
                loggedInUser = authenticateUser(username, password)

                event.target.reset()

                props.onLoggedIn()
            } catch (error) {
                alert(error.message)

                console.error(error)
            }
        }}>

            <label htmlFor="username">Username</label>
            <input type="text" id="username" style={{ width: '100%', boxSizing: 'border-box' }} />

            <label htmlFor="password">Password</label>
            <PasswordInput id="password" />



            <button type="submit">Login</button>
        </form>

        <a href=""
            onClick={event => {
                event.preventDefault()
                props.onNavRegister()
            }}>Register</a>
    </section>
}

//Funcion register, que mostrará el formulario de registro
function Register(props) {
    return <section>
        <h2>Register</h2>

        <form onSubmit={event => {
            event.preventDefault()

            const { target: { username: { value: username },
                password: { value: password },
                name: { value: name },
                email: { value: email },
                passwordRepeat: { value: passwordRepeat } } } = event

            try {

                console.log(name)
                console.log(username)
                console.log(email)
                console.log(password)
                console.log(passwordRepeat)

                registerUser(name, email, username, password, passwordRepeat)

                //Para no perderme, aquí va la función de registro

                event.target.reset()

            } catch (error) {
                alert(error.message)

                console.error(error)
            }
        }}>

            <label htmlFor="name">Name</label>
            <input type="text" id="name" style={{ width: '100%', boxSizing: 'border-box' }} />

            <label htmlFor="email">E-mail</label>
            <input type="email" id="email" style={{ width: '100%', boxSizing: 'border-box' }} />

            <label htmlFor="username">Username</label>
            <input type="text" id="username" style={{ width: '100%', boxSizing: 'border-box' }} />

            <label htmlFor="password">Password</label>
            <PasswordInput id="password" />

            <label htmlFor="passwordRepeat">Repeat Password</label>
            <PasswordInput id="passwordRepeat" />

            <button type="submit">Register</button>
        </form>

        <a href=""
            onClick={event => {
                event.preventDefault()
                props.onNavLogin()
            }}>Login</a>

    </section>
}


//Function Home, que se encargará de mostrar la pantalla principal de la aplicación

function Home(props) {
    return <section>
        <h2>Home</h2>
        <h3>Hello Risto</h3>

        <button type="button" onClick={event => {
            event.preventDefault()
            console.log('Click en el boton logout')
            loggedInUser = null
            props.onNavLogin()

        }}>Logout</button>

        <button type="button">✚ New Post</button>

        <div>
            <h3>Posts</h3>
            <div>
                <h4>maxwell</h4>
                <img src="https://picsum.photos/200" style={{ width: '95%' }} />
                <p>Just finished reading a great book!</p>
                <time>Thu Oct 17 2024 16:12:46 GMT+0200 (hora de verano de Europa central)</time>
            </div>
            <div>
                <h4>aliceW</h4>
                <img src="https://fastly.picsum.photos/id/319/200/200.jpg?hmac=UVJeYSi6TAfErW8IEThVndqxRlYBeWaZRymD1KuysSg" style={{ width: '95%' }} />
                <p>Loving the vibes at this concert! 🎶</p>
                <time>Thu Oct 17 2024 16:12:46 GMT+0200 (hora de verano de Europa central)</time>
            </div>
            <div>
                <h4>aliceW</h4>
                <img src="https://fastly.picsum.photos/id/442/200/200.jpg?hmac=S-yNCNr30GK97ulUYoey_Fh2-czIf7YnNgcKp7zrEoE" style={{ width: '95%' }} />
                <p>Exploring the mountains, the view is amazing.</p>
                <time>Thu Oct 17 2024 16:12:46 GMT+0200 (hora de verano de Europa central)</time>
            </div>
            <div>
                <h4>lara</h4>
                <img src="https://picsum.photos/200" style={{ width: '95%' }} />
                <p>Had the best coffee this morning!</p>
                <time>Thu Oct 17 2024 16:12:46 GMT+0200 (hora de verano de Europa central)</time>
            </div>
            <div>
                <h4>lara</h4>
                <img src="https://fastly.picsum.photos/id/809/200/200.jpg?hmac=2U0kkZGtbw4L4bQc3aC8cZA6ywfn2MvR0d-YC4ITcI8" style={{ width: '95%' }} />
                <p>Enjoying the sunny day at the beach!</p>
                <time>Thu Oct 17 2024 16:12:46 GMT+0200 (hora de verano de Europa central)</time>
            </div>
            <div>
                <h4>wendydarling</h4>
                <img src="https://pm1.aminoapps.com/8360/ad07e2d2cdf6e1733328d6e7b7848b87db38a2bbr1-1536-2048v2_hq.jpg" style={{ width: '95%' }} />
                <p>here i am</p>
                <time>Thu Oct 17 2024 16:12:46 GMT+0200 (hora de verano de Europa central)</time>
            </div>
            <div>
                <h4>peterpan</h4>
                <img src="https://i.pinimg.com/originals/8c/60/1a/8c601a25311a1a5098896f751a784b54.jpg" style={{ width: '95%' }} />
                <p>here we are</p>
                <time>Thu Oct 17 2024 16:12:46 GMT+0200 (hora de verano de Europa central)</time>
            </div>
        </div>
    </section>
}


//La classe App extiende de component y la declaramos como class porque será dinámica e ira mutando conforme utilicemos la app

class App extends Component {
    constructor(props) {
        super(props)

        this.state = { view: 'login' }
    }

    render() {
        return <div>
            <h1>Unsocial React v0.0.2</h1>

            {this.state.view === 'login' && <Login onLoggedIn={() => this.setState({ view: 'home' })}
                onNavRegister={() => this.setState({ view: 'register' })} />}

            {this.state.view === 'register' && <Register
                onNavLogin={() => this.setState({ view: 'login' })} />}

            {this.state.view === 'home' && <Home
                onNavLogin={() => this.setState({ view: 'login' })} />}
        </div>
    }
}


root.render(<App />)