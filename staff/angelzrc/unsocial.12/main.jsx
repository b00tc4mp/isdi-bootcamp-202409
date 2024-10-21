let loggedInUser = null

const rootElement = document.getElementById('root')
const root = ReactDOM.createRoot(rootElement)

const { Component } = React

class PasswordInput extends Component {
    constructor(props) {
        console.log('PasswordInput -> constructor')
        super(props)

        this.state = {status: '😌', type: 'password' }
    }

    render() {
        console.log('PasswordInput -> render')

        return <div style= {{display: 'flex'}}>
            <input type={this.state.type} id= {this.props.id} style= {{ width: '100%', boxSizing: 'border-box'}} />
            <span
                style = {{cursor: 'pointer', position: 'absolute'}}
                onClick = {() => this.setState({
                    status: this.state.status === '😌' ? '😳' : '😌',
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

        <form onSubmit= {event => {
            event.preventDefault()
            const { target: { username: { value: username }, password: { value: password }}} = event

            try {
                loggedInUser = authenticateUser(username, password)

                event.target.reset()

                props.onLoggedIn()
            } catch(error)  {
                alert(error.message)
                console.error(error)
            }
        }}>
            <label htmlFor="username">Username</label>
            <input type="text" id='username' style={{ width: '100%', boxSizing: 'border-box'}} />
            
            <label htmlFor="password">Password</label>
            <PasswordInput id="password"/>

            <button type='submit'>Login</button>
        </form>

        <a href="" onClick = { event => {
            event.preventDefault()
            return props.goRegister()
        }}>Register</a>
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

            <h3>Hello, Peter Pan!</h3>
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


class App extends Component {
    constructor(props) {
        super(props)

        this.state = {view: 'login'}
    
    }

    changeView(view) {
        this.setState({ view })
    }

    render() {
        return <div>
            <h1>Unsocial</h1>
    
            {this.state.view === 'login' && <Login onLoggedIn= { () => this.setState({ view: 'home' })} goRegister= {() => this.setState({ view: 'register'})}/> }
            {this.state.view === 'register' && <Register />}
            {this.state.view === 'home' && <Home />}  
    </div>
    }
}

root.render(<App />)