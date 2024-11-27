
let loggedInUser = null

const rootElement = document.getElementById('root')
const root = ReactDOM.createRoot(rootElement)

const { Component } = React

class PasswordInput extends Component {
    constructor(props) {
        console.log("PasswordInput -> constructor")

        super(props)

        this.state = { status: "😌", type: "password" }
    }
    render() {
        console.log("PasswordInput -> render")

        return <div style={{ display: "flex" }}>
            <input type={this.state.type} id={this.props.id} style={{ width: "100%", boxSizing: "border-box", paddingRight: "18px" }} />
            <span style={{ cursor: "pointer", position: "absolute", right: "257px" }}
                onClick={() => this.setState({
                    status: this.state.status === "😌" ? "😳" : "😌",
                    type: this.state.status === "password" ? "text" : "password"
                })}
            >{this.state.status}</span>
        </div>
    }
}

function Login(props) {
    console.log("Login -> render")
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
            <input type="text" id="username" />

            <label htmlFor="password">Password</label>
            <PasswordInput id="password" />

            <button type="submit">Login</button>
        </form>

        <a href=""
            onClick={event => {
                event.preventDefault()

                const register = new Register()

                props.registerInquire()

            }}>Register</a>

    </section>
}

function Register(props) {
    return <section>
        <h2>Register</h2>
        <form onSubmit={event => {
            event.preventDefault()

            const {
                target: {
                    name: { value: name },
                    email: { value: email },
                    username: { value: username },
                    password: { value: password },
                    passwordRepeat: { value: passwordRepeat } } } = event

            try {
                registerUser(name, email, username, password, passwordRepeat)

                event.target.reset()

                props.logBack()
            } catch (error) {

                alert(error.message)

                console.error(error)
            }
        }}>
            <label htmlFor="name">Name</label>
            <input type="text" id="name" />

            <label htmlFor="email">E-mail</label>
            <input type="text" id="email" />

            <label htmlFor="username">Username</label>
            <input type="text" id="username" />

            <label htmlFor="password">Password</label>
            <PasswordInput id="password" />

            <label htmlFor="passwordRepeat">Repeat Password</label>
            <PasswordInput id="passwordRepeat" />

            <button type="submit">Register</button>
        </form>

        <a href=""
            onClick={event => {

                event.preventDefault()

                props.logBack()
            }}
        >Login</a>
    </section >

}

function Home(props) {
    return <section>
        <h2>Home</h2>
        <h3>Hello...!</h3>
        <button type="button"
            onClick={event => {

                event.preventDefault()

                props.logOut()
            }}
        >Logout</button>

        <button type="button"
            onClick={event => {

                event.preventDefault()

                props.onCreatePost()
            }}
        >➕</button>
        <div>
            <h3>Posts</h3>

            <article>
                <h4>WendyDarling</h4>
                <img src=" https://pm1.aminoapps.com/8360/ad07e2d2cdf6e1733328d6e7b7848b87db38a2bbr1-1536-2048v2_hq.jpg" style={{ width: '100%' }} />
                <p>here I am</p>
                <time>Thu Oct 17 2024 12:59:05 GMT+0200 (Central European Summer Time)</time>
            </article>

            <article>
                <h4>Peterpan</h4>
                <img src="https://i.pinimg.com/originals/8c/60/1a/8c601a25311a1a5098896f751a784b54.jpg" style={{ width: '100%' }} />
                <p>Here we are</p>
                <time>Thu Oct 17 2024 12:59:05 GMT+0200 (Central European Summer Time)</time>
            </article>

        </div>
    </section>
}

function CreatePost(props) {
    return <div>
        <h3>Create Post</h3>
        <form>
            <label htmlFor="image">Imagen</label>
            <input type="text" id="image" />

            <label htmlFor="text">Text</label>
            <input type="text" id="text" />

            <button type="submit">Submit</button>

        </form>
    </div>
}


class App extends Component {
    constructor(props) {
        super(props)

        this.state = { view: "login", showCreatePost: false }
    }

    render() {
        return <div>
            <h1>Unsocial</h1>
            {this.state.view === "login" &&
                <Login
                    onLoggedIn={() => this.setState({ view: "home" })}
                    registerInquire={() => this.setState({ view: "register" })} />}
            {this.state.view === "register" &&
                <Register
                    logBack={() => this.setState({ view: "login" })} />}
            {this.state.view === "home" &&
                <Home
                    logOut={() => this.setState({ view: "login" })}
                    onCreatePost={() => this.setState({ showCreatePost: true })} />}
        </div>
    }
}


root.render(<App />)