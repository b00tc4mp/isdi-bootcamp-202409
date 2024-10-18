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
      <p>Don't have an account? <a onClick={event => {
        event.preventDefault()
        props.onAnchorRegister()
      }}>Register</a></p>
    </section>
  )
}

function Register(props) {
  return (
    <section className="section-container">
      <h2>Register to unSocial</h2>
      <form className="form-container"
        onSubmit={event => {
          event.preventDefault()

          const { target: form } = event
          const {
            name: { value: name },
            email: { value: email },
            username: { value: username },
            password: { value: password },
            confirmPassword: { value: confirmPassword } } = form

          try {
            registerUser(name, email, username, password, confirmPassword)
            form.reset()
            props.onRegistered()
          } catch (error) {
            alert(error.message)
            console.error(error)
          }
        }}>
        <label htmlFor="name">Name</label>
        <input type="text" id="name" placeholder="Enter your name" required />
        <label htmlFor="email">Email</label>
        <input type="email" id="email" placeholder="Enter your email" required />
        <label htmlFor="username">User Name</label>
        <input type="text" id="username" placeholder="Enter your username" required />
        <label htmlFor="password">Password</label>
        <PasswordInput id="password" />
        <label htmlFor="confirmPassword">Confirm Password</label>
        <PasswordInput id="confirmPassword" />
        <button id="btn-register" type="submit">Register</button>
      </form>
      <p>Already have an account? <a onClick={event => {
        event.preventDefault()
        props.onAnchorLogin()
      }
      }>Login</a></p>
    </section>
  )
}

class Home extends Component {
  constructor(props) {
    super(props)

    this.state = { view: 'list' }

  }

  render() {
    return (
      <section id="home" className="section-container">
        <h2>Home</h2>
        <h3>Hello, Peter Pan!</h3>
        <img src="images/boy.png" className="boy" />
        <button id="btn-logout" type="button" onClick={event => {
          event.preventDefault()
          this.props.onLoggedOut()
        }}>Logout</button>
        <button id="btn-post" type="button" onClick={() => this.setState({ view: 'new' })}>Post</button>

        {this.state.view === 'list' && <PostList />}
        {this.state.view === 'new' && <CreatePost />}

      </section>
    )
  }
}

function PostList() {

  let posts

  try {
    posts = getPosts()
  } catch (error) {
    alert(error.message)
    console.error(error)
  }
  return (
    <div>
      <h2>Posts</h2>
      {posts.map(post => {
        return (
          <article>
            <h4>{post.username}</h4>
            <img src={post.image} className="boy" />
            <p>{post.text}</p>
            <time>{post.date}</time>
          </article>
        )
      })}
    </div>
  )
}

function CreatePost() {
  return (
    <div className="section-container">
      <form className="form-container">
        <h3>Create a Post</h3>
        <label htmlFor="image">Image</label>
        <input type="text" id="image" placeholder="Select an image" required />
        <label htmlFor="image">Text</label>
        <input type="text" id="text" placeholder="Write a text" required />
        <button id="submit" type="submit">Create</button>
      </form>
    </div>
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
          onAnchorRegister={() => this.setState({ view: 'register' })}
        />}

        {this.state.view === 'register' && <Register
          onRegistered={() => this.setState({ view: 'login' })}
          onAnchorLogin={() => this.setState({ view: 'login' })}
        />}

        {this.state.view === 'home' && <Home
          onLoggedOut={() => this.setState({ view: 'login' })} />}
      </div>
    )
  }
}

root.render(
  <App />
)