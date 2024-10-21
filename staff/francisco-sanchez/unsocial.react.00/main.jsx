let loggedInUserId = null

const rootElement = document.getElementById('root')
const root = ReactDOM.createRoot(rootElement)

const { Component } = React


//Clase PasswordInput, para el campo de contraseña, añade la funcionalidad de ver o esconderla. 
class PasswordInput extends Component {
    constructor(props) {
        console.log('PasswordInput -> Constructor')
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
            //En este punto usando las llaves {...} insertamos javascript en el html
            >{this.state.status}</span>
        </div>

    }
}


//Función login, que será nuestra primera pantalla de la aplicación
function Login(props) {
    console.log('Login -> render')
    {
        if (sessionStorage.loggedInUserId !== undefined)
            props.onLoggedIn()
    }

    return <section>
        <h2>Login</h2>

        <form onSubmit={event => {
            event.preventDefault()

            const { target: { username: { value: username }, password: { value: password } } } = event

            try {
                sessionStorage.loggedInUserId = authenticateUser(username, password)
                //loggedInUser = authenticateUser(username, password)

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

            const {
                target: { username: { value: username },
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
                event.target.reset()
                props.onRegisterClick()

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
                props.onLoginClick()
            }}>Login</a>

    </section>
}


//Function Home, que se encargará de mostrar la pantalla principal de la aplicación

class Home extends Component {
    constructor(props) {
        console.log("Constructor de home")
        super(props)

        let name //Para el nombre del usuario

        try {
            //name = getUserName(loggedInUser.id)
            console.log("Sesion en la carga de la home: " + sessionStorage.loggedInUserId)
            name = getUserName(sessionStorage.loggedInUserId)

        } catch (error) {
            alert(error.message)
            console.error(error)
        }

        //En el pase del estado le pasamos la pantalla a la que iremos y el nombre del usuario para saludarlo :) 
        this.state = { name: name, view: 'list' }
    }

    render() {
        console.log('Render del Home')

        return <section>
            <h2>Home</h2>
            <h3>Hello, {this.state.name}!</h3>

            <button type="button" onClick={event => {
                event.preventDefault()
                console.log('Click en el boton logout')
                //loggedInUser = null
                delete sessionStorage.loggedInUserId
                this.props.onLoggedOut()

            }}>Logout</button>

            <button type="button" onClick={() => this.setState({ view: 'new' })}>✚ New Post</button>

            {this.state.view === 'list' && <PostList />}
            {this.state.view === 'new' && <CreatePosts onCreated={() => this.setState({ view: 'list' })} />}


        </section>
    }
}

function PostList() {
    console.log('Renderizamos el postList')

    let posts;

    try {
        posts = getPosts()

    } catch (error) {
        alert(error.message);
        console.error(error)
    }

    return <div>
        <h3>Posts</h3>
        {posts.map(post => <article>
            <h4>{getUserUserName(post.author)}</h4>
            <img src={post.image} style={{ width: '95%' }} />
            <p>{post.text}</p>
            <time>{post.date}</time>
        </article>)
        }

    </div>
}

function CreatePosts(props) {
    console.log('Entramos en createPost -> Render')

    return <div>
        <h3>Create new post</h3>

        <form onSubmit={event => {
            event.preventDefault()

            //Extraemos el form de event
            const { target: form } = event

            //Y en este punto extraemos los valores de los campos del form
            const {
                image: { value: image },
                text: { value: text }
            } = form

            //Ahora tratamos de crear el post
            try {
                //createPost(loggedInUser.id, image, text)
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

            <button type="submit"> Create</button>
        </form>
    </div>

}


//La classe App extiende de component y la declaramos como class porque será dinámica e ira mutando conforme utilicemos la app

class App extends Component {
    constructor(props) {
        super(props)

        // this.state = { view: 'login' }
        if (sessionStorage.loggedInUserId !== undefined) {
            this.state = { view: 'login' }
        } else {

            this.state = { view: 'home' }
            console.log(sessionStorage.loggedInUserId)
        }
    }

    render() {
        return <div>
            <h1>Unsocial React v0.0.3</h1>
            <p>Esta versión introduce todas las novedades vistas en React hasta la fecha, también incluye el <strong>localStorage y sessionStorage</strong> </p>
            <hr style={{ width: '100px' }}></hr>

            {
                //En este punto hacemos un short circuit evaluation
                //https://www.freecodecamp.org/news/short-circuiting-in-javascript/



                //Evaluación primera && evaluación segunda
                //Si la primera ya es falsa, ya no evalua la segunda
                this.state.view === 'login' && <Login
                    onLoggedIn={() => this.setState({ view: 'home' })}
                    onNavRegister={() => this.setState({ view: 'register' })} />}

            {this.state.view === 'register' && <Register
                onLoginClick={() => this.setState({ view: 'login' })}
                onRegisterClick={() => this.setState({ view: 'login' })} />}

            {this.state.view === 'home' && <Home
                onLoggedOut={() => this.setState({ view: 'login' })} />}
        </div>
    }
}


root.render(<App />)