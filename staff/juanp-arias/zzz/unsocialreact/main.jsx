const rootElement = document.getElementById('root')
const root = ReactDOM.createRoot(rootElement)

const { Component } = React

class PasswordInput extends Component {
    constructor(props) {
        console.log('PasswordInput -> constructor') // chivato para ver como construye la password input

        super(props) // es igual que this.props = props
        this.state = { status: '😊', type: 'password' }
    }
    render() {

        return <div>
            <input type={this.state.type} id={this.props.id} />
            <span className="emoji"
                style={{ cursor: 'pointer', position: 'absolute', right: '10px' }}
                onClick={() => this.setState({
                    status: this.state.status === '😊' ? '🫥' : '😊',
                    type: this.state.type === 'password' ? 'text' : 'password'
                })}
            >{this.state.status}</span>
        </div>
    }
}

function Login(props) {
    return <section className="section-container">
        <h2>LOGIN</h2>

        <form onSubmit={event => {
            event.preventDefault()

            const { target: { username: { value: username }, password: { value: password } } } = event

            try {
                sessionStorage.loggedInUserId = authenticateUser(username, password)

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
            <PasswordInput id="password" />

            <button type="submit">Login</button>
        </form>

        <h4>Don't have an account?</h4>
        <a href="" onClick={
            event => {
                event.preventDefault()
                props.onRegisterClick()
            }
        }>Register</a>

    </section>
}

function Register(props) {
    return <section className="section-container" id="register">
        <h2>REGISTER</h2>

        <form onSubmit={event => {
            event.preventDefault()

            const { target: { name: { value: name },
                email: { value: email },
                username: { value: username },
                password: { value: password },
                ['password-repeat']: { value: repeatpassword }
            } } = event

            try {
                registerUser(name, email, username, password, repeatpassword)
                event.target.reset()

                props.onRegistered()
            } catch (error) {

                alert(error.message)

                console.error(error)
            }
        }}>
            <label htmlFor="name">Name</label>
            <input type="text" id="name" />

            <label htmlFor="email">E-mail</label>
            <input type="email" id="email" />

            <label htmlFor="username">Username</label>
            <input type="text" id="username" />

            <label htmlFor="password">Password</label>
            <PasswordInput id="password" />

            <label htmlFor="password-repeat">Repeat Password</label>
            <PasswordInput id="password-repeat" />

            <button type="submit">Register</button>
        </form>
        <a href="" onClick={
            event => {
                event.preventDefault()

                props.onLoginClick()
            }}>Login</a>
    </section>
}

class Home extends Component {
    constructor(props) {
        super(props)

        let name

        try {
            name = getUserName(sessionStorage.loggedInUserId)
        } catch (error) {
            alert(error.message)

            console.error(error)
        }

        this.state = { name: name, view: 'list' }
    }

    render() {

        return <section className="section-container">
            <h2>HOME</h2>

            <h3>Welcome, {this.state.name}! </h3>

            <button type="button"
                onClick={() => {
                    delete sessionStorage.loggedInUserId

                    this.props.logoutClick()

                }}>Logout</button>
            <button type="button" onClick={() => this.setState({ view: 'new' })}>+</button>

            {this.state.view === 'list' && <PostList />}
            {this.state.view === 'new' && <CreatePost onCreated={() => this.setState({ view: 'list' })} />}
        </section>
    }
}

function PostList() {

    let posts

    try {
        posts = getPosts()
    } catch (error) {
        alert(error.message)

        console.error(error)
    }

    return <div>
        <h3>POSTS</h3>

        {posts.map(post => <div className="post-container">
            <h4>{getUserUsername(post.author)}</h4>
            <img src={post.image} style={{ width: "100%" }} />
            <span>😊</span>
            <p>{post.text}</p>
            <time>{post.date}</time>
        </div>)}
    </div>
}

function CreatePost(props) {
    return <div>
        <h3>Create Post</h3>

        <form onSubmit={event => {
            event.preventDefault()

            const { target: form } = event

            const {
                image: { value: image },
                text: { value: text }
            } = form

            try {
                createPost(sessionStorage.loggedInUserId, image, text)

                props.onCreated()
            } catch (error) {
                alert(error.message)

                console.error(error)
            }
        }}>
            <label htmlFor="image">Image</label>
            <input type="text" id="image" style={{ width: '100%' }} />

            <label htmlFor="image">Text</label>
            <input type="text" id="text" style={{ width: '100%' }} />

            <button type="submit">Create</button>

        </form>
    </div>
}

class App extends Component {
    constructor(props) {
        super(props)

        this.state = { view: 'login' }
    }

    render() {
        return <div>
            <h1 className="header">UNSOCIAL</h1>

            {this.state.view === 'login' && <Login
                onLoggedIn={() => this.setState({ view: 'home' })}
                onRegisterClick={() => this.setState({ view: 'register' })}
            />}
            {this.state.view === 'register' && <Register
                onLoginClick={() => this.setState({ view: 'login' })}
                onRegistered={() => this.setState({ view: 'login' })}
            />}
            {this.state.view === 'home' && <Home
                logoutClick={() => this.setState({ view: 'login' })}
            />}
        </div>
    }
}


root.render(
    <App />
)