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
            debugger
            event.preventDefault()
            //target recoge todo el formulario
            const { target: { username: { value: username }, password: { value: password } } } = event
            // const usuario = event.target.username.value
            // const clave = event.target.password.value

            try {
                loggedInUser = authenticateUser(username, password)

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
        <a onClick={props.toRegister}>Register</a>
    </section>
}

function Register() {
    return <section>
        <h2>Register</h2>

        <form>
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

        <a href="">Login</a>
    </section>
}

function Home() {
    return <section>
        <h2>Home</h2>

        <h3>Hello, !</h3>
        <button type="button">Logout</button>
        <button type="button">➕</button>

        <div>
            <h3>Posts</h3>

            <article>
                <h4>flash</h4>
                <img src="https://www.mundodeportivo.com/alfabeta/hero/2024/01/the-flash-dc-comics.jpg?width=1200" style={{ width: '100%' }} />
                <p>speed men</p>
                <time>Thu Oct 17 2024 12:59:05 GMT+0200 (Central European Summer Time)</time>
            </article>

            <article>
                <h4>batman</h4>
                <img src="https://images.desenio.com/zoom/wb0125-8batman-portrait50x70-55544-10774.jpg" style={{ width: '100%' }} />
                <p>darknes is my life</p>
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
            <h1>Unsocial</h1>
            {/* al ejecutarse cambia la vista a home */}
            {this.state.view === 'login' && <Login onLoggedIn={() => this.setState({ view: 'home' })} toRegister={() => this.setState({ view: 'register' })} />}
            {this.state.view === 'register' && <Register />}
            {this.state.view === 'home' && <Home />}
        </div>
    }
}

root.render(<App />)