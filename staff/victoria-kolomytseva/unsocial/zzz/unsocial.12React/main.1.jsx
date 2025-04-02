let loggedInUser = null //significa que no hay ningún usuario conectado al inicio

const rootElement = document.getElementById('root') //Es donde se va a montar toda la aplicación de React.
const root = ReactDOM.createRoot(rootElement) //ReactDOM.createRoot crea el punto de entrada de la aplicación de React. Esto es necesario para renderizar los componentes de React en el DOM

const { Component } = React // para poder extenderla y crear componentes de clase como PasswordInput

//Componente PasswordInput (Entrada de Contraseña)
class PasswordInput extends Component { //
    constructor(props) {
        console.log('PasswordInput -> constructor')

        super(props) // llama al constructor de la clase padre (React.Component)

        this.state = { status: '😌', type: 'password' }// Estado inicial del componente
    }


    render() {
        console.log('PasswordInput -> render')

        return <div style={{ display: 'flex' }}>
            <input type={this.state.type} id={this.props.id} style={{ width: '100%', boxSizing: 'border-box', paddingRight: '18px' }} />
            <span //El span es clicable y cambia el estado del componente:

                style={{ cursor: 'pointer', position: 'absolute', right: '10px' }}
                onClick={() => this.setState({
                    status: this.state.status === '😌' ? '😳' : '😌',
                    type: this.state.type === 'password' ? 'text' : 'password'
                })}
            >{this.state.status}</span>
        </div>

    }
}

function Login() { //Componente Login
    console.log('Login -> render')

    return <section>
        <h2>Login</h2>

        <form>
            <label htmlFor="username">Username</label>
            <input type="text" id="username" style={{ width: '100%', boxSizing: 'border-box' }} />
            <label htmlFor="password">Password</label>
            <PasswordInput id="password" />

            <button type="submit">Login</button>
        </form>

        <a href="">Register</a>
    </section >
}

function Home() {
    return <section>
        <h2>Home</h2>
        <h3>Hello, Peter Pan</h3>
        <button type="button">Logout</button>
        <button type="button">➕</button>

        <div>
            <h3>Posts</h3>

            <article>
                <h4>wendydarling</h4>
                <img src="https://pm1.aminoapps.com/8360/ad07e2d2cdf6e1733328d6e7b7848b87db38a2bbr1-1536-2048v2_hq.jpg" style={{ width: '100%' }} />
                <p>here i am</p>
                <time>Thu Oct 17 2024 12:59:05 GMT+0200 (Central European Summer Time)</time>
            </article>
            <article>
                <h4>peterpan</h4>
                <img src="https://i.pinimg.com/originals/8c/60/1a/8c601a25311a1a5098896f751a784b54.jpg" style={{ width: '100%' }} />
                <p>here we are</p>
                <time>Thu Oct 17 2024 12:59:05 GMT+0200 (Central European Summer Time)</time>
            </article>
        </div>
    </section>
}

root.render(<div>
    <h1><Unsocial></Unsocial></h1>

    {/* <Login /> */}
    <Register />
    {/* <Home /> */}
</div>)