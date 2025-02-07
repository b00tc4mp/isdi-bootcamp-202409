let loggedUser = null

const rootElement = document.getElementById('root')
const root = ReactDOM.createRoot(rootElement)

const { Component } = React

function Header() {
  return (
    <header className="logo-container">
      <img className="logo" src="https://unsightly-stem-unsocial-project-app.surge.sh/images/users-avatar.png" />
      <h1>unSocial</h1>
    </header>
  )
}

class PasswordInput extends Component {
  constructor(props) {
    super(props)

    this.state = { className: 'far fa-eye', type: 'password' }
  }

  render() {
    return (
      <div className="password-container">
        <input id={this.props.id} type={this.state.type} placeholder="Enter your password" required />
        <i className={this.state.className}
          id="icon"
          onClick={() => this.setState({
            className: this.state.className === 'far fa-eye' ? 'far fa-eye-slash' : 'far fa-eye',
            type: this.state.type === 'password' ? 'text' : 'password'
          })}></i>
      </div>
    )
  }
}

function Login(props) {
  return (
    <section className="section-container" >
      <p>Welcome!</p>
      <h2>Sign in to unSocial</h2>
      <h4>Write username and password to access</h4>

      <form className="form-container"
        onSubmit={event => {
          event.preventDefault()

          const { target: { username: { value: username }, password: { value: password } } } = event

          try {
            loggedUser = authenticateUser(username, password)
            event.target.reset()
            props.onLoggedIn()

          } catch (error) {
            alert(error.message)
            console.error(error)
          }
        }}>
        <label htmlFor="username">Username</label>
        <input type="text" id="username" placeholder="Enter your username" required />
        <label htmlFor="password">Password</label>
        <PasswordInput id="password" />
        <button id="btn-login" type="submit">Login</button>
      </form>
      <p>Don't have an account? <a>Register</a></p>
    </section>
  )
}

function Register() {
  return (
    <section className="section-container">
      <h2>Register to unSocial</h2>
      <form className="form-container">
        <label htmlFor="name">Name</label>
        <input type="text" id="name" placeholder="Enter your name" required />
        <label htmlFor="email">Email</label>
        <input type="email" id="email" placeholder="Enter your email" required />
        <label htmlFor="username">User Name</label>
        <input type="text" id="username" placeholder="Enter your username" required />
        <label htmlFor="password">Password</label>
        <PasswordInput id="password" />
        <label htmlFor="confirm-password">Confirm Password</label>
        <PasswordInput id="confirm-password" />
        <button id="btn-register" type="submit">Register</button>
      </form>
      <p>Already have an account? <a>Login</a></p>
    </section>
  )
}

function Home() {
  return (
    <section id="home" className="section-container">
      <h2>Home</h2>
      <h3>Hello, Peter Pan!</h3>
      <img src="https://unsightly-stem-unsocial-project-app.surge.sh/images/boy.png" className="boy" />
      <button id="btn-logout" type="button">Logout</button>
      <button id="btn-post" type="button">Post</button>

      <div>
        <h2>Posts</h2>
        <article>
          <h4>captainhook</h4>
          <img src="https://png.pngtree.com/png-clipart/20231020/original/pngtree-couple-dressed-up-like-a-pirate-and-vampire-taking-a-selfie-png-image_13385873.png" className="boy" />
          <p>Muajajajajajaja</p>
          <time>Thu Oct 17 2024 19:27:31 GMT+0200 (hora de verano de Europa central)</time>
        </article>

        <article>
          <h4>wendydarling</h4>
          <img src="https://pm1.aminoapps.com/8360/ad07e2d2cdf6e1733328d6e7b7848b87db38a2bbr1-1536-2048v2_hq.jpg" className="boy" />
          <p>Here I am</p>
          <time>Thu Oct 17 2024 19:27:35 GMT+0200 (hora de verano de Europa central)</time>
        </article>

        <article>
          <h4>peterpan</h4>
          <img src="https://i.pinimg.com/originals/8c/60/1a/8c601a25311a1a5098896f751a784b54.jpg" className="boy" />
          <p>Here we are</p>
          <time>Thu Oct 17 2024 19:29:35 GMT+0200 (hora de verano de Europa central)</time>
        </article>
      </div>
    </section>
  )
}

class App extends Component {
  constructor(props) {
    super(props)

    this.state = { view: 'login' }
  }

  render() {
    return (
      <div>
        <Header />

        {this.state.view === 'login' && <Login
          onLoggedIn={() => this.setState({ view: 'home' })}
        />}
        {this.state.view === 'register' && <Register />}
        {this.state.view === 'home' && <Home />}
      </div>
    )
  }
}

root.render(
  <App />
)