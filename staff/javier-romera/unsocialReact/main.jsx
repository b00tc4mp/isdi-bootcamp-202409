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
                sessionStorage.loggedInUserId = authenticateUser(username, password)

                event.target.reset()

                props.onLoggedIn()
            } catch (error) {
                alert(error.message)
                console.error(error)
                event.target.password.value = ""
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

            props.onRegisterClick()
        }}>Register</a>
    </section>
}

function Register(props) {
    return <section>
        <h2>Register</h2>

        <form onSubmit={event => {
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
                registerUser(name, email, username, password, passwordRepeat)

                form.reset()

                props.onRegistered()
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
        return <section>
            <h2>Home</h2>

            <h3>Welcome, {this.state.name}!</h3>

            <button type="button" onClick={() => {
                delete sessionStorage.loggedInUserId

                this.props.onLoggedOut()
            }}>Logout</button>
            <button type="button"
                onClick={() => this.setState({ view: 'new' })}>+</button>

            {this.state.view === 'list' && <PostList onDeletedPost={() => this.setState({ view: 'list' })} />}
            {this.state.view === 'new' && <CreatePost onCreated={() => this.setState({ view: 'list' })} />}
        </section>
    }
}

function PostList(props) {
    let posts

    try {
        posts = getPosts()
    } catch (error) {
        alert(error.message)
        console.error(error)
    }

    return <div>
        <h3>Posts</h3>

        {posts.map(post => <article>
            <h4>{getUserUsername(post.author)}</h4>
            <img src={post.image} style={{ width: '100%' }} />
            <p>{post.text}</p>
            <time>{post.date}</time>
            {sessionStorage.loggedInUserId === post.author && <button type="button" onClick={() => {
                deletePost(post)

                props.onDeletedPost()
            }}>Delete Post</button>}
        </article>)}
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
            <input type="text" id="image"></input>

            <label htmlFor="text">Text</label>
            <input type="text" id="text"></input>

            <button type="Submit">Create</button>
        </form>
    </div>
}

class App extends Component {
    constructor(props) {
        super(props)

        this.state = { view: typeof sessionStorage.loggedInUserId !== 'undefined' ? 'home' : 'login' }
    }

    render() {
        return <div>
            <h1>laicosnU</h1>
            {this.state.view === 'login' && <Login
                onLoggedIn={() => this.setState({ view: 'home' })}
                onRegisterClick={() => this.setState({ view: 'register' })}
            />}
            {this.state.view === 'register' && <Register
                onLoginClick={() => this.setState({ view: 'login' })}
                onRegistered={() => this.setState({ view: 'login' })} />}
            {this.state.view === 'home' && <Home onLoggedOut={() => this.setState({ view: 'login' })} />}
        </div>
    }
}

root.render(<App />)