let loggedInUser = null;

const rootElement = document.getElementById("root");
const root = ReactDOM.createRoot(rootElement);

const { Component } = React;

class PasswordInput extends Component {
    constructor(props) {
        console.log("PasswordInput -> constructor");
        //este props recibe el id de input linea 65 
        super(props);
        //se le añade status y type como propiedades internas del objeto
        this.state = { status: "😌", type: "password", length: 0 };
    }
    //render 
    render() {
        console.log("PasswordInput -> render");
        //aqui comienza a imprimir lo que es
        return <div style={{ display: "flex" }}>
            <input type={this.state.type} id={this.props.id} placeholder={this.props.placeholder} style={{ width: "100%", boxSizing: "border-box", paddingRight: "18px", textAlign: "center" }} />
            <span
                style={{ cursor: "pointer", right: "10px" }}
                onClick={() => this.setState({
                    //length++ no funciona
                    length: this.state.length + 1,
                    //esto es un if----------------------desp------sino dormido
                    status: this.state.status === "😌" ? "😳" : "😌",
                    //si el tipo es password al hacer click lo cambio por text
                    type: this.state.type === "pasword" ? "text" : "password"
                })}
            //dinamico
            >{this.state.status}

                {/* <input type={this.state.type} id={this.props.id} style={{ width: "100%", boxSizing: "border-box", paddingRight: "18px" }} /> */}

            </span>
            <span>
                {/* {alert ("increible")/* contenido  */}
                {this.state.length}
            </span>

        </div>
    }

}


function Login(props) {
    console.log('Login -> render')

    return <section>
        <h2>Login</h2>

        <form onSubmit={event => {
           
            event.preventDefault()
            //target recoge todo el formulario
            const { target: { username: { value: username }, password: { value: password } } } = event
            // const usuario = event.target.username.value
            // const clave = event.target.password.value

            try {
                loggedInUser = authenticateUser(username, password)
                // localStorage.setItem("usuarioActual",loggedInUser)
                sessionStorage.setItem("usuarioActual", loggedInUser); // Almacena el nombre de usuario en sessionStorage
                sessionStorage.loggedInUserId = "someUserId"; // Aquí también podrías guardar el ID del usuario si tienes uno.

                event.target.reset()
                //ejecuta la funcion cuando envia e logiln
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
            <PasswordInput id="password" placeholder="constraseña" />

            <button type="submit">Login</button>
        </form>
        {/* siempre con props */}
        {/* <a onClick={props.toRegister}>Register</a> */}
        <a href="" onClick={event => {
            event.preventDefault()

            props.onRegisterClick()
        }}>Register</a>

    </section>
}

class Register extends Component {
    constructor(props){
        super(props)
        this.registrarUsuario=this.registrarUsuario.bind(this)
    }
    
    registrarUsuario(event){
        event.preventDefault()
        
        // const { target: { username: { value: username }, password: { value: password } } } = event
        // const usuario = event.target.username.value
        // const clave = event.target.password.value
        //form es un alias para el objeto target
        const {target:form} = event  

        const {
            name :{value:name},
            email :{value:email},
            username :{value:username},
            password :{value:password},
            ['password-repeat']:{value:repeat}
        }=form

        try {
            registerUser(name, email, username, password,repeat)

            event.target.reset()

            this.props.toLogin()
        } catch (error) {
            //passwordInput.setValue('')

            alert(error.message)

            console.error(error)
        
    }
    }

    render(){
        return <section>
        <h2>Register</h2>

        <form onSubmit={this.registrarUsuario}>
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

            this.props.toLogin()
        }}>Login</a>

    </section>
}
}

class Home extends Component{
    constructor(props){
        super(props)
        // const usuarioId = localStorage.getItem("usuarioActual")
        const usuarioId = sessionStorage.getItem("usuarioActual");
        //adquiero el nombre para imprimirlo en home
        let nombre  = getUsername(usuarioId)
        // this.state={usuario:nombre}
        this.state = { usuario: nombre, view: 'list' }
       
    }
render(){
    return <section>
        <h2>Home</h2>

        <h3>Hello, {this.state.usuario}!</h3>

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

function PostList(){
    console.log('PostList -> render')

    let posts

    try {
        posts = getPosts()
    } catch (error) {
        alert(error.message)

        console.error(error)
    }

    return <div>
    <h3>Posts</h3>
    {posts.map(post => (<article
             key={post.id}> 
            <h4>{post.username}</h4>
            <img src={post.image} style={{ width: "100%" }} alt="Post image" />
            <p>{post.text}</p>
            <time>{new Date(post.date).toDateString()}</time>
        </article>
        ))}
    
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
                // Obtener el usuario actual desde sessionStorage
                const loggedInUser = sessionStorage.getItem("usuarioActual"); // Aquí guardamos el nombre de usuario
                const userId = sessionStorage.loggedInUserId; // Aquí guardamos el ID del usuario si está almacenado

                if (!loggedInUser || !userId) {
                    throw new Error('Invalid user session');
                }

                // Llamar a createPost con los parámetros correctos (userId, username, image, text)
                createPost(userId, loggedInUser, image, text); // Se pasa el nombre de usuario aquí

                props.onCreated();
            } catch (error) {
                alert(error.message);
                console.error(error);
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
        super(props)

        this.state = { view: 'login' }
    }

    render() {
        return <div>
            <h1>Unsocial</h1>

            {/* al ejecutarse cambia la vista a home */}
            {this.state.view === 'login' && <Login 
            onLoggedIn={() => this.setState({ view: 'home' })}
            onRegisterClick={() => this.setState({view: 'register' })} />}

            {this.state.view === 'register' && <Register 
            toLogin={() => this.setState({view: 'login' })} 
            toRegistered={() => this.setState.apply({view: 'login' })}
            />}

            {this.state.view === 'home' && <Home onLoggedOut={() => this.setState({ view: 'login' })} />}
        </div>
    }
}

root.render(<App />)