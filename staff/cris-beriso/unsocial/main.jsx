let loggedInUser = null

const rootElement = document.getElementById('root')
const root = ReactDOM.createRoot(rootElement)

const { Component } = React

class PasswordInput extends Component {
  constructor(props) {
    console.log('PasswordInput -> constructor')

    super(props) // this.props = props

    this.state = { status: '🙈', type: 'password' }
  }

  render() {
    console.log('PasswordInput -> render')

    return <div style={{ display: 'flex' }}>
      <input type={this.state.type} id={this.props.id} style={{ width: 'auto', boxSizing: 'border-box', paddingRight: '18px' }} />
      <span
        style={{ cursor: 'pointer', position: 'asolute', right: '10px' }}
        onClick={() => this.setState({
          status: this.state.status === '🙈' ? '🐵' : '🙈',
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
      event.preventDefault()

      const { target: { username: { value: username }, password: { value: password } } } = event

      try {
        loggedInUser = authenticateUser(username, password)

        event.target.reset()

        props.onLoggedIn()
      } catch (error) {
        // passwordInput.setValue('')

        alert(error.message)

        console.error(error)
      }
    }}>
      <label htmlFor="username">Username</label>
      <input type="text" id="username" style={{ width: 'auto', boxSizing: 'border-box' }} />

      <label htmlFor="password">Password</label>
      <PasswordInput id="password" />

      <button type="submit">Login</button>
    </form>

    <a href="" onClick={event => {
      event.preventDefault()

      props.onRegisterLink()
    }
    }>Register</a>
  </section>
}

function Register(props) {
  return <section>
    <h2>Register</h2>

    <form onSubmit={event => {
      event.preventDefault()

      const { target: { name: { value: name }, email: { value: email }, username: { value: username }, password: { value: password }, ['password-repeat']: { value: passwordRepeat } } } = event
      try {
        registerUser(name, email, username, password, passwordRepeat)

        event.target.reset()

        props.onRegisterIn()
      } catch (error) {
        alert(error.message)

        console.error(error)
      }
    }}>
      <label htmlFor="name">Name</label>
      <input type="text" id="name" style={{ width: 'auto', boxSizing: 'border-box' }} />

      <label htmlFor="email">E-mail</label>
      <input type="email" id="email" style={{ width: 'auto%', boxSizing: 'border-box' }} />

      <label htmlFor="username">Username</label>
      <input type="text" id="username" style={{ width: 'auto', boxSizing: 'border-box' }} />

      <label htmlFor="password">Password</label>
      <PasswordInput id="password" />

      <label htmlFor="password-repeat">Repeat Password</label>
      <PasswordInput id="password-repeat" />

      <button type="submit">Register</button>

    </form>

    <a href="" onClick={event => {
      event.preventDefault()

      props.onLoginLink()
    }}>Login</a>
  </section >
}

function Home(props) {
  return <section>
    <h2>Home</h2>

    <h3>Hello, Peter Pan!</h3>
    <button type="button" onClick={event => {
      event.preventDefault()

      props.onLoggedOut()
    }}>Logout</button>
    <button type="button">➕</button>

    <div>
      <h3>Posts</h3>

      <article>
        <h4>beriso</h4>
        <img src="../unsocial/Cofy.jpg" style={{ width: '100%' }} />
        <p>Cofy</p>
        <time>Thu Oct 17 2024 12:59:05 GMT+0200 (Central European Summer Time)</time>
      </article>

      <article>
        <h4>beriso</h4>
        <img src="../unsocial/Rocket.jpg" style={{ width: '100%' }} />
        <p>Rocket</p>
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

      {this.state.view === 'login' && <Login
        onLoggedIn={() => this.setState({ view: 'home' })}
        onRegisterLink={() => this.setState({ view: 'register' })} />}
      {this.state.view === 'register' && <Register
        onRegisterIn={() => this.setState({ view: 'login' })}
        onLoginLink={() => this.setState({ view: 'login' })} />}
      {this.state.view === 'home' && <Home
        onLoggedOut={() => this.setState({ view: 'login' })} />}
    </div>
  }
  // Añadir función button new Post
}

root.render(<App />)