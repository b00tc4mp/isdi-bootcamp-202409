const rootElement = document.getElementById('root')
const root = ReactDOM.createRoot(rootElement)

const { Component } = React

class PasswordInput extends Component {
    constructor(props) {
        console.log('PassInput -> Constructor')

        super(props) //this.props = props 

        //PROPIEDAD ESTADO PARA CAMBIAR EL TIPO DE TEXTO Y EL EMOJI
        this.state = { status: '😌', type: 'password' }
    }

    render() {

        return <div style={{ display: 'flex' }}>
            <input
                type={this.state.type} id={this.props.id}
                style={{ width: '100%', boxSizing: 'border - box', paddingRight: '18px' }} />

            <span
                style={{ cursor: 'pointer', position: 'absolute', right: '10px' }}
                onClick={() => this.setState({
                    status: this.state.status === '😌' ? '😳' : '😌',
                    type: this.state.type === 'password' ? 'text' : 'password'
                })}
            >{this.state.status}
            </span>
        </div >
    }
}

function Login(props) {

    return <section>
        <h2>Login</h2>

        <form onSubmit={event => {

            event.preventDefault()

            //CAPTURO LOS VALORES DEL USERNAME Y PASSWORD DEL TARGET DEL EVENTO (FORMULARIO)
            //LOS NOMBRES QUE CAPTURAS ES IMPORTANTE QUE COINCIDAN CON EL ID DEL INPUT
            const { target:
                { username: { value: username },
                    password: { value: password }
                }
            } = event

            try {
                sessionStorage.loggedInUserId = authenticateUser(username, password)
                //RESETEO DEL FORMULARIO
                event.target.reset() // => form.reset()

                //LE PASO LA FUNCIÓN ONLOGGEDIN DEL PARAMERTRO PROPS PARA DECIRLE A APP QUE ME HE LOGGEADO
                props.onLoggedIn()

            } catch (error) {
                //passwordInput.setValue('')

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

                props.onRegisterLink()
            }}>
            Register</a>
    </section>
}

function Register(props) {

    return <section>
        <h2>Register</h2>

        <form onSubmit={event => {

            event.preventDefault()

            const { target: form } = event

            //CAPTURO LOS VALORES DEL REGISTER (FORMULARIO)
            //LOS NOMBRES QUE CAPTURAS ES IMPORTANTE QUE COINCIDAN CON EL ID DEL INPUT
            const {
                name: { value: name },
                email: { value: email },
                username: { value: username },
                password: { value: password },
                ['password-repeat']: { value: passwordRepeat }
            } = form


            try {

                //LLAMO A LA FUNCION REGISTER USER CON LOS PARAMETROS CAPTURADOS
                registerUser(name, email, username, password, passwordRepeat)

                //RESETEO DEL FORMULARIO
                form.reset() // => form.reset()

                //LE PASO LA FUNCIÓN "registered" DEL PARAMERTRO PROPS PARA DECIRLE A APP QUE ME HE LOGGEADO
                props.registered()


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
            <PasswordInput id="password-repeat" />

            <button type="submit">Register</button>
        </form>

        <a href=""
            onClick={event => {
                event.preventDefault()

                props.registered()
            }}>Login</a>
    </section>
}

class Home extends Component {
    constructor(props) {
        console.log('Home -> constructor')

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

            <h3>Hello, {this.state.name}!</h3>

            <button type="button"
                onClick={() => {

                    delete sessionStorage.loggedInUserId

                    this.props.logout()
                }}>Logout</button>
            <p></p>

            <button type="button"
                onClick={() => this.setState({ view: 'new' })}>+</button>

            {this.state.view === 'list' && <PostList onDeleted={() => this.setState({ view: 'list' })} />}

            {this.state.view === 'new' &&
                <CreatePost onCreated={() => this.setState({ view: 'list' })} />}


        </section >
    }

}

function PostList(props) {
    console.log('PostList -> render')

    let posts

    try {
        posts = getPosts()
    } catch (error) {

        alert(error.message)

        console.error(error)
    }

    return <div id="posts">
        <h3>Posts</h3>

        {posts.map(post => <article>
            {sessionStorage.loggedInUserId === post.author && <button type="button"
                onClick={() => {

                    posts = JSON.parse(localStorage.posts)

                    let index = posts.findIndex(element => element.id === post.id)

                    posts.splice(index, 1)

                    localStorage.posts = JSON.stringify(posts)

                    props.onDeleted()

                }}>Delete Post</button>}

            <h4>{getPostAuthor(post.author)}</h4>
            <img src={post.image} style={{ width: '100%' }} />
            <p>{post.text}</p>
            <time>{post.date}</time>
        </article>)}
    </div>
}


//FUNCIÓN PARA CREAR EL POST
function CreatePost(props) {
    return <div>

        <h3>New Post</h3>
        <form onSubmit={event => {

            event.preventDefault()

            //CAPTURO LOS VALORES DEL NUEVO POST (FORMULARIO)
            //LOS NOMBRES QUE CAPTURAS ES IMPORTANTE QUE COINCIDAN CON EL ID DEL INPUT
            const { target: form } = event

            const {
                image: { value: image },
                text: { value: text }

            } = form

            try {

                //LLAMO A LA FUNCION REGISTER USER CON LOS PARAMETROS CAPTURADOS
                createPost(sessionStorage.loggedInUserId, image, text)

                //LE PASO LA FUNCIÓN "registered" DEL PARAMERTRO PROPS PARA DECIRLE A APP QUE ME HE LOGGEADO
                props.onCreated()

            } catch (error) {
                alert(error.message)

                console.error(error)
            }
        }}>

            <label htmlFor="text">Post Title</label>
            <input type="text" id="text" />

            <label htmlFor="image">Image Link</label>
            <input type="text" id="image" />

            <button type="submit">Create Post</button>
        </form>
    </div>
}


//CLASE QUE AGRUPA TODAS LAS FUNCIONES/VIEWS Y NOS VA A CAMBIAR ENTRE ELLAS
class App extends Component {
    constructor(props) {
        super(props)

        //PROPIEDAD ESTADO QUE NOS CHIVA LA QUE SE VE DE ENTRADA
        this.state = { view: 'login' }
    }

    //RENDER DE LAS DIFERENTES PÁGINAS
    render() {
        return <div>

            <h1>Unsocial</h1>

            {this.state.view === 'login'
                && <Login
                    onLoggedIn={() => this.setState({ view: 'home' })}
                    onRegisterLink={() => this.setState({ view: 'register' })} />}
            {this.state.view === 'register'
                && <Register
                    registered={() => this.setState({ view: 'login' })} />}
            {this.state.view === 'home'
                && <Home
                    logout={() => this.setState({ view: 'login' })} />}

        </div>
    }
}

//LE PASAMOS EL RENDER DEL APP
root.render(<App />)
