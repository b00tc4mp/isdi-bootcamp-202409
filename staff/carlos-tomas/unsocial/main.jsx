let loggedInUser = null

const rootElment = document.getElementById("root")
const root = ReactDOM.createRoot(rootElment)

const { Component } = React

class PasswordInput extends Component {
    constructor(props) {
        super(props)

        this.state = { status: '😌', type: "password" }
    }

    render() {

        return <div style={{ display: "flex" }}>
            <input type={this.state.type} id={this.props.id} style={{ width: "100%", bosSizing: "boder-box", paddingRight: "18px" }} />
            <span
                style={{ cursor: "pointer", position: "absolute", right: "10px" }}
                onClick={() => this.setState({
                    status: this.state.status === '😌' ? "😳" : "😌",
                    type: this.state.type === "password" ? "text" : "password"
                })}
            >{this.state.status}</span>
        </div >

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
            <input type="text" id="username" style={{ width: "100%", boxSizing: "border-box" }} />

            <label htmlFor="password">Password</label>
            <PasswordInput id="password" />

            <button type="submit">Login</button>
        </form>

        <a href=" "
            onClick={event => {
                event.preventDefault()

                props.RegiForm()

            }}>Register</a>
    </section>
}

function Register(props) {
    return <section>
        <h2>Register</h2>
        <form onSubmit={event => {
            event.preventDefault()

            const { target: { name: { value: name }, username: { value: username }, email: { value: email }, password: { value: password }, passwordRepeat: { value: passwordRepeat } } } = event
            try {

                registerUser(name, email, username, password, passwordRepeat)

                event.target.reset()

                props.returnLogin()


            } catch (error) {
                alert(error.message)

                console.error(error)
            }
        }}>
            <label htmlFor="name">Name</label>
            <input type="text" id="name" style={{ width: "100%", boxSizing: "border-box" }} />

            <label htmlFor="email">E-mail</label>
            <input type="email" id="email" style={{ width: "100%", boxSizing: "border-box" }} />

            <label htmlFor="username">Username</label>
            <input type="text" id="username" style={{ width: "100%", boxSizing: "border-box" }} />

            <label htmlFor="password">Password</label>
            <PasswordInput id="password" />

            <label htmlFor="passwordRepeat">Repeat Password</label>
            <PasswordInput id="passwordRepeat" />

            <button type="submit">Register</button>
        </form>
        <a href=""
            onClick={event => {
                event.preventDefault()

                props.returnLogin()

            }}>Login</a>
    </section >
}

function Home(props) {
    return <section>
        <h2>Home</h2>

        <h3>Hello, Peter Pan!</h3>
        <button type="button"
            onClick={event => {
                event.preventDefault()

                props.returnLogin()

            }}>Logout</button>
        <button type="button">➕</button>

        <div>
            <h3>Posts</h3>

            <article>
                <h4>wendydarling</h4>
                <img src="https://pm1.aminoapps.com/8360/ad07e2d2cdf6e1733328d6e7b7848b87db38a2bbr1-1536-2048v2_hq.jpg" style={{ width: "100%" }} />
                <p>here i am</p>
                <time>Thu Oct 17 2024 15:21:27 GMT+0200 (hora de verano de Europa central)</time>
            </article>

            <article>
                <h4>peterpan</h4>
                <img src="https://i.pinimg.com/originals/8c/60/1a/8c601a25311a1a5098896f751a784b54.jpg" style={{ width: "100%" }} />
                <p>here we are</p>
                <time>Thu Oct 17 2024 15:21:27 GMT+0200 (hora de verano de Europa central)</time>
            </article>
        </div>
    </section>
}



class App extends Component {
    constructor(props) {
        super(props)

        this.state = { view: "login" }
    }

    render() {
        return <div>
            <h1>Unsocial</h1>

            {this.state.view === "login" && <Login onLoggedIn={() => this.setState({ view: "home" })} RegiForm={() => this.setState({ view: "register" })} />}
            {this.state.view === "register" && <Register returnLogin={() => this.setState({ view: "login" })} />}
            {this.state.view === "home" && <Home returnLogin={() => this.setState({ view: "login" })} />}

        </div>
    }
}

root.render(<App />)
