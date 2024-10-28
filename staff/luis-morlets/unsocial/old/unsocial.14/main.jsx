//let loggedInUserId = null

const rootElement = document.getElementById('root')
const root = ReactDOM.createRoot(rootElement)

const { Component } = React

class PasswordInput extends Component {
    constructor(props) {
        super(props)

        this.state = { status: 'https://icons.veryicon.com/png/o/miscellaneous/computer-room-integration/show-password-3.png', type: 'password' }
    }

    render() {

        return <div style={{ display: 'flex' }}>
            <input type={this.state.type} id={this.props.id} required={true} style={{ width: '100%', boxSizing: 'border-box', paddingRight: '30px' }} />
            <img src={this.state.status}
                style={{ cursor: 'pointer', position: 'absolute', width: '20px', right: '55px', }}
                onClick={() => this.setState({
                    status: this.state.status === 'https://icons.veryicon.com/png/o/miscellaneous/computer-room-integration/show-password-3.png'
                        ? 'https://icons.veryicon.com/png/o/miscellaneous/computer-room-integration/hide-password.png'
                        : 'https://icons.veryicon.com/png/o/miscellaneous/computer-room-integration/show-password-3.png',
                    type: this.state.type === 'password'
                        ? 'text'
                        : 'password'
                })}
            />
        </div>
    }
}

function Login(props) {
    return <section>
        <h2>Login</h2>

        <form onSubmit={event => {
            event.preventDefault()

            const { target: form } = event

            const {
                username: { value: username },
                password: { value: password }
            } = form

            try {
                sessionStorage.loggedInUserId = authenticateUser(username, password)

                form.reset()

                props.onLoggedIn()
            } catch (error) {
                alert(error.message)

                console.error(error)
            }
        }}>
            <label htmlFor="username">Username</label>
            <input type="text" id="username" required={true} style={{ width: '100%', boxSizing: 'border-box' }} />

            <label htmlFor="password">Password</label>
            <PasswordInput id='password' />

            <button type="submit">Login</button>
        </form>

        <p>Don't have an account? <a href="" onClick={event => {
            event.preventDefault()

            props.onRegisterLink()
        }}>Register</a></p>
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
                ['password-repeat']: { value: passwordRepeat }
            } = form

            try {
                registerUser(name, email, username, password, passwordRepeat)

                form.reset()

                props.onRegister()
            } catch (error) {
                alert(error.message)

                console.error(error)
            }
        }}>

            <label htmlFor="name">Name</label>
            <input type="text" id="name" required={true} style={{ width: '100%', boxSizing: 'border-box' }} />

            <label htmlFor="email">E-mail</label>
            <input type="email" id="email" required={true} style={{ width: '100%', boxSizing: 'border-box' }} />

            <label htmlFor="username">Username</label>
            <input type="text" id="username" required={true} style={{ width: '100%', boxSizing: 'border-box' }} />

            <label htmlFor="password">Password</label>
            <PasswordInput id="password" />

            <label htmlFor="password-repeat">Repeat Password</label>
            <PasswordInput id="password-repeat" />

            <button type="submit">Register</button>
        </form>

        <p>Already have an account? <a href="" onClick={event => {
            event.preventDefault()

            props.onLoginLink()
        }}>Login</a></p>
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

            <h3>Hey, {this.state.name}, you're here!</h3>
            <button type="button" onClick={() => {
                delete sessionStorage.loggedInUserId

                this.props.onLogout()
            }}>Logout</button>
            <button type="button" onClick={() => this.setState({ view: 'new' })}>➕</button>

            {this.state.view === 'list' && <PostList />}
            {this.state.view === 'new' && <CreatePost onCreatePost={() => this.setState({ view: 'list' })} />}
        </section>
    }
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

                props.onCreatePost()
            } catch (error) {
                alert(error.message)

                console.log(error)
            }
        }}>
            <label htmlFor="image">Image</label>
            <input type="text" id="image" required={true} style={{ width: '100%', boxSizing: 'border-box' }} />

            <label htmlFor="text">Text</label>
            <input type="text" id="text" required={true} style={{ width: '100%', boxSizing: 'border-box' }} />

            <button type="submit">Create</button>
        </form>
    </div>
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
        <h3>Posts</h3>

        {posts.map(post => <article>
            <h4>{post.author}</h4>
            <img src={post.image} style={{ width: '100%' }} />
            <div>
                <button type="button" style={{ cursor: 'pointer' }}>🤍</button>
                <span>{post.likes}</span>
            </div>
            <p>{post.text}</p>
            <time>{post.date}</time>
        </article>)}
    </div>
}

class App extends Component {
    constructor(props) {
        super(props)

        !sessionStorage.loggedInUserId ? this.state = { view: 'login' } : this.state = { view: 'home' }
    }

    render() {
        return <div>
            <h1>Unsocial</h1>

            {this.state.view === 'login' && <Login
                onLoggedIn={() => this.setState({ view: 'home' })}
                onRegisterLink={() => this.setState({ view: 'register' })} />}

            {this.state.view === 'register' && <Register
                onRegister={() => this.setState({ view: 'login' })}
                onLoginLink={() => this.setState({ view: 'login' })} />}

            {this.state.view === 'home' && <Home
                onLogout={() => this.setState({ view: 'login' })} />}
        </div>
    }
}

root.render(<App />)