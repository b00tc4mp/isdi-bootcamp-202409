/*
- Mejoramos la validación de login, registro
*/
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

      const { target: form } = event

      const { username: { value: username }, password: { value: password } } = form

      try {
        sessionStorage.loggedInUserId = authenticateUser(username, password)

        form.reset()

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
    }}>Register</a>
  </section>
}

function Register(props) {
  console.log('Register -> render')

  return <section>
    <h2>Register</h2>

    <form onSubmit={event => {
      event.preventDefault()

      const { target: form } = event

      const {
        name: { value: name },
        email: { value: email },
        username: { value: username },
        password: { value: password },
        ['password-repeat']: { value: passwordRepeat }
      } = form

      try {
        registerUser(name, email, username, password, passwordRepeat)

        form.reset()

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
    console.log('Home -> render')

    return <section>
      <h2>Home</h2>

      <h3>Hello, {this.state.name}!</h3>
      <button type="button" onClick={() => {
        delete sessionStorage.loggedInUserId

        this.props.onLoggedOut()
      }}>Logout</button>
      <button type="button" onClick={() => this.setState({ view: 'new' })}>➕</button>

      {this.state.view === 'list' && <PostList onDeleted={() => this.setState({ view: 'list' })} />}
      {this.state.view === 'new' && <CreatePost onCreated={() => this.setState({ view: 'list' })} />}
    </section>
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

  return <div>
    <h3>Posts</h3>

    {posts.map(post => <article>
      <h4>{getUserUsername(post.author)}</h4>
      <img src={post.image} style={{ width: '100%' }} />
      <p>{post.text}</p>
      <time>{post.date}</time>
      {sessionStorage.loggedInUserId === post.author && <button type="button" onClick={() => {

        posts = JSON.parse(localStorage.posts)

        let index = posts.findIndex(element => element.id === post.id)

        posts.splice(index, 1)

        localStorage.posts = JSON.stringify(posts)
        props.onDeleted()
      }}>Delete</button>
      }

    </article>)}
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
        createPost(sessionStorage.loggedInUserId, image, text)

        props.onCreated()
      } catch (error) {
        alert(error.message)

        console.error(error)
      }
    }}>
      <label htmlFor="image">Image</label>
      <input type="text" id="image" style={{ width: 'auto', boxSizing: 'border-box' }} />

      <label htmlFor="text">Text</label>
      <input type="text" id="text" style={{ width: 'auto', boxSizing: 'border-box' }} />

      <button type="submit">Create</button>
    </form>
  </div>
}


class App extends Component {
  constructor(props) {
    console.log('App -> constructor')
    super(props)

    this.state = { view: 'login' }
  }

  render() {
    console.log('App -> render')

    return <div>
      <h1>Unsocial</h1>

      {this.state.view === 'login' && <Login
        onLoggedIn={() => this.setState({ view: 'home' })}
        onRegisterLink={() => this.setState({ view: 'register' })}
      />}
      {this.state.view === 'register' && <Register
        onRegisterIn={() => this.setState({ view: 'login' })}
        onLoginLink={() => this.setState({ view: 'login' })}
      />}
      {this.state.view === 'home' && <Home
        onLoggedOut={() => this.setState({ view: 'login' })}
      />}
    </div>
  }

}

root.render(<App />)