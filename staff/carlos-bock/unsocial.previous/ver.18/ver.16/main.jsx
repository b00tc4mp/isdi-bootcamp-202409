let loggedInUser = null; 

const rootElement = document.getElementById('root');
const root = ReactDOM.createRoot(rootElement);

const { Component } = React;

class PasswordInput extends Component {
    constructor(props) {
        console.log('PasswordInput -> constructor')

        super(props)

        this.state = {status:'🙈', type: 'password'}
    }

    render() {
        console.log('PasswordInput -> render')

        return <div style = {{display: 'flex' }}>
            <input type={this.state.type} id={this.props.id} style={{ width: '100%', boxSizing: 'border-box', paddingRight: '18px'}}/>
            <span
                style={{ cursor: 'pointer', position: 'absolute', right: '25px', marginTop: '8px'}}
                onClick={() => this.setState( {
                    status: this.state.status === '🙈' ? '😏' : '🙈',
                    type: this.state.type === 'password' ? 'text' : 'password'
                })}
            >{this.state.status}</span>
        </div>
    }
}

function Login(props) {
    console.log('Login -> render')

    return <section>
        <h2>Login</h2>

        <form onSubmit={event => {
            event.preventDefault();

            const {target: {username: { value: username}, password: {value: password}}} =event

            try {
                loggedInUser = authenticateUser(username, password)

                event.target.reset();

                props.onLoggedIn();
            } catch (error) {

                alert(error.message)

                console.error(error)
            }

        }}>
            <label htmlFor="username">Username</label>
            <input type="text" id="username" style={{ width: '100%', boxSizing: 'border-box'}}/>

            <label htmlFor="passowrd">Password</label>
            <PasswordInput id = "password" />

            <button type="submit">Login</button>
        </form>

        <a href="">Register</a>
    </section>
}

function Register() {
    return <section>

        <form>
            <label htmlFor="name">Name</label>
            <input type="text" id="name" style={{ width: '100%', boxSizing: 'border-box'}}/>

            <label htmlFor="email">Email</label>
            <input type="email" id="email" style={{ width: "100%", boxSizing: 'border-box'}}/>

            <label htmlFor="username">Username</label>
            <input type="text" id="username" style= {{width: '100%', boxSizing: 'border-box'}}/>

            <label htmlFor="password">Password</label>
            <PasswordInput id= "password" />

            <label htmlFor="password-repeat">Repeat Password</label>
            <PasswordInput id= "password-repeat" />

            <button type="submit">Register</button>
        </form>

        <a href="">Login</a>
    </section>
}

function Home() {
    return <section>
        <h2>Home</h2>

        <h3>Hello, Kakashi</h3>
        <button type="button">Logout</button>
        <button type="button">🎉</button>

        <div>
            <h3>Posts</h3>

            <article>
                <h4>hkakashi</h4>
                <img src="https://i.pinimg.com/736x/46/94/98/469498e6fb0f4cc20668fd7073465aca.jpg" alt="" />
                <p>Ready for another night out</p>
                <time>Thu Oct 17 2024 12:59:05 GMT+0200 (Central European Summer Time)</time>
            </article>

            <article>
            <h4>hkakashi</h4>
                <img src="https://i.pinimg.com/564x/f2/ab/7a/f2ab7a574021c9c9cd08f1e28a60b361.jpg" alt="" />
                <p>New Ramen Spot</p>
                <time>Thu Oct 17 2024 12:59:05 GMT+0200 (Central European Summer Time)</time> 
            </article>
        </div>
    </section>
}

class App extends Component {
    constructor(props) {
        super(props)

        this.state = { view: 'login'}
    }

    render() {
        return <div>
            <h1>unSocial</h1>

            {this.state.view === 'login' && <Login onLoggedIn={() => this.setState({ view: 'home'})} />}
            {this.state.view === 'register' && <Register/>}
            {this.state.view === 'home' && <Home />}
        </div>
    }
}

root.render(<App />)



/////////////////////////////////
