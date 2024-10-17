let loggedInUser = null

const rootElement = document.getElementById('root')
const root = ReactDOM.createRoot(rootElement)

const { Component } = React

class PasswordInput extends Component {
    constructor(props) {
        super(props)

        this.state = { type: 'password', status: '🔐' }
    }

    render() {
        return <div className="password-input">
            <input type={this.state.type} id={this.props.id}></input>
            <span className="lock"
                onClick={() => this.setState({
                    type: this.state.type === 'password' ? 'text' : 'password',
                    status: this.state.status === '🔐' ? '🔓' : '🔐'
                })}>
                {this.state.status}
            </span>
        </div>
    }
}

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
            <input type="text" id="username"></input>

            <label htmlFor="password">Password</label>
            <input type="password" id="password"></input>

            <button type="submit">Login</button>
        </form>
        <a href="" onClick={event => {
            event.preventDefault()

            props.onRegister()
        }}>Register</a>
    </section>
}

function Register(props) {
    return <section>
        <h2>Register</h2>

        <form onSubmit={event => {
            event.preventDefault()

            const { target: { name: { value: name }, email: { value: email }, username: { value: username }, password: { value: password }, passwordRepeat: { value: passwordRepeat } } } = event

            try {
                registerUser(name, email, username, password, passwordRepeat)

                event.target.reset()

                props.onLogin()
            } catch (error) {
                alert(error.message)
                console.error(error)
            }
        }}>
            <label htmlFor="name">Name</label>
            <input type="text" id="name"></input>

            <label htmlFor="email">Email</label>
            <input type="email" id="email"></input>

            <label htmlFor="username">Username</label>
            <input type="text" id="username"></input>

            <label htmlFor="password">Password</label>
            <input type="password" id="password"></input>

            <label htmlFor="passwordRepeat">Confirm password</label>
            <input type="password" id="passwordRepeat"></input>

            <button type="submit">Register</button>
        </form>
        <a href="" onClick={event => {
            event.preventDefault()

            props.onLogin()
        }}>Login</a>
    </section>
}

function Home(props) {
    return <section>
        <h2>Home</h2>

        <h3>Welcome, {loggedInUser.name}!</h3>

        <button type="button" onClick={() => {
            props.onLoggedOut()
        }}>Logout</button>
        <button type="button">+</button>
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

        this.state = { view: 'login' }
    }

    render() {
        return <div>
            <h1>laicosnU</h1>
            {this.state.view === 'login' && <Login onLoggedIn={() => this.setState({ view: 'home' })}
                onRegister={() => this.setState({ view: 'register' })} />}
            {this.state.view === 'register' && <Register onLogin={() => this.setState({ view: 'login' })} />}
            {this.state.view === 'home' && <Home onLoggedOut={() => this.setState({ view: 'login' })} />}
        </div>
    }
}

root.render(<App />)