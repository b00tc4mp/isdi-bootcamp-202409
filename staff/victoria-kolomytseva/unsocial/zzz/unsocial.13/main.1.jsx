
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
                sessionStorage.loggedInUserId = authenticateUser(username, password)

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

        <a href="" onClick={event => {
            event.preventDefault()

            props.onRegisterClick()
        }}>Register</a>
    </section>
}

function Register(props) {
    console.log('Register -> render')

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

                props.onRegistered()
            } catch (error) {
                alert(error.message)
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

class Home extends Component {
    constructor(props) {
        console.log('Home -> constructor')

        super(props)

        let name

        try {
            console.log(sessionStorage)
            name = getUserName(sessionStorage.loggedInUserId)
        } catch (error) {
            alert(error.message)

            console.error(error)
        }
        this.state = { name: name, view: 'list' }

    }
    render() {
        console.log('Home -> render')

        return <section>
            <h2>Home</h2>

            <h3>Hello, {this.state.name}!</h3>
            <button type="button" onClick={() => {
                delete sessionStorage.loggedInUserId

                this.props.onLoggedOut()
            }}>Logout</button>
            <button type="button" onClick={() => this.setState({ view: 'new' })}>➕</button>

            {this.state.view === 'list' && <PostList />}
            {this.state.view === 'new' && <CreatePost onCreated={() => this.setState({ view: 'list' })} />}
        </section>
    }
}
function PostList() {
    console.log('PostList -> render')

    let posts

    try {
        posts = getPosts()
    } catch (error) {
        console.error(error)
    }
    return <div>
        <h3>Posts</h3>

        {posts.map(post => <article>
            <h4>{post.author}</h4>
            <img src={post.image} style={{ width: '100%' }} />
            <p>{post.text}</p>
            <time>{post.date}</time>
        </article>)}
    </div>
}

function CreatePost(props) {
    console.log('CreatePost -> render')
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
            <input type="text" id="image" style={{ width: '100%', boxSizing: 'border-box' }} />

            <label htmlFor="text">Text</label>
            <input type="text" id="text" style={{ width: '100%', boxSizing: 'border-box' }} />

            <button type="submit">Create</button>
        </form>
    </div>
}

class App extends Component {
    constructor(props) {
        console.log('App -> constructor')

        super(props)

        this.state = { view: 'login' } //// El estado inicial es la vista de inicio de sesión.
    }

    render() {
        console.log('App -> render')

        return <div>
            <h1>Unsocial</h1>

            {this.state.view === 'login' && <Login
                onLoggedIn={() => this.setState({ view: 'home' })}
                onRegisterClick={() => this.setState({ view: 'register' })}
            />}
            {this.state.view === 'register' && <Register
                onLoginClick={() => this.setState({ view: 'login' })}
                onRegistered={() => this.setState({ view: 'login ' })}
            />}
            {this.state.view === 'home' && <Home onLoggedOut={() => this.setState({ view: 'login' })} />}

        </div>
    }
}

root.render(<App />)