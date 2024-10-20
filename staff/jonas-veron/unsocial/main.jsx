// let loggedInUserId = null

const rootElement = document.getElementById('root')
const root = ReactDOM.createRoot(rootElement)

const { Component } = React

class PasswordInput extends Component{
    constructor(props) {
        super(props) //this.props = props

        this.state = { status: '😊', type: 'password'}
    }
    
    render() {
        return <div style={{display: 'flex', justifyContent: 'center', alignItems:'center'}}>
            <input type={this.state.type} id={this.props.id} style={{width: '85%', boxSizing: 'border-box', marginLeft:'19px' }} />

            <span
                style={{ cursor: 'pointer', position: 'relative', right: '30px', fontSize: '16px'}}
                onClick={() => this.setState({
                    status: this.state.status === '😊' ? '😃' : '😊',
                    type: this.state.type === 'password' ? 'text' : 'password'
                })}>
                {this.state.status}{/* lo que se muestra en el span */}
            </span>
        </div>
    }
}

function Login(props){

return <section>
    <h2>Login</h2>
    <form onSubmit={event => {
        event.preventDefault()

        const { target: { username:{ value: username }, password: {value: password } } } = event

        try{
            sessionStorage.loggedInUserId = authenticateUser(username, password)

            event.target.reset()

            props.onLoggedIn()
        } catch (error) {
            alert(error.message)

            console.error(error)
        }
    }}>
        <label htmlFor="username">Username</label>
        <input type="text" id="username" style = {{ width: '80%', bozSizing: 'border-box'}} />

        <label htmlFor="password">Password</label>
        <PasswordInput id='password'/>

        <button type="submit">Login</button>
    </form>

        <a href="" onClick={event => {
            event.preventDefault()

            props.onRegisterLink()

        }}>Register</a>
    </section>
}

function Register(props){
    return <section>
        <h2>Register</h2>
        <form onSubmit={event => {
            event.preventDefault()

            const { target: form } = event

            const {
                name: { value: name},
                email: { value: email },
                username: { value: username }, 
                password: { value: password }, 
                ['password-repeat']: { value: passwordRepeat }
            } = form

                try{
                    registerUser(name, email, username, password, passwordRepeat)

                    form.reset()  

                    props.loginBack()
                }catch (error){
                    alert(error.message)
                    
                    console.error(error)
                }
            }}>


            <label htmlFor="name">Name</label>
            <input type="text" id="name" />

            <label htmlFor="email">E-mail</label>
            <input type="email" id="email"/>

            <label htmlFor="username">Username</label>
            <input type="text" id="username"/>
            
            <label htmlFor="password">Password</label>
            <PasswordInput id='password'/>

            <label htmlFor="password-repeat">Repeat Password</label>
            <PasswordInput id='password-repeat'/>

            <button type="submit">Register</button>
        </form>

            <a href="" onClick={event => {
                event.preventDefault()

                props.loginBack()
            }}>Login</a>

    </section>
}

class Home extends Component {
    constructor(props) {
        super(props)

        let name

        try {
            name = getUserName(sessionStorage.loggedInUserId)
        } catch (error) {
            alert(error.message)

            console.error(error)
        }

        this.state = {name: name, view: 'list'}

    }

    render() {
        return <section>
        <h2>Home</h2>
            <h3>Hello, {this.state.name}!</h3>
            <button type="button" onClick={() =>{
                delete sessionStorage.loggedInUserId
            
                this.props.onLoggedOut()
    
            } }>Logout</button>
    
            <button type="button" onClick={() => this.setState({ view: 'new' })}>➕</button>

            { this.state.view === 'list' && <PostList/> }
            { this.state.view === 'new' && <CreatePost onCreated={()=> this.setState({ view: 'list' })} />}
        </section>
    }
}

function PostList() {
    let posts

    try{
        posts = getPosts()
    
    } catch (error) {
        alert(error.message)

        console.error(error)
    }

    return <div>

        <h3>Posts</h3>


        {posts.map(post => <article>
            <h4>{getUserUsername(post.author)}</h4>
            <img src={post.image} style={{width: '100%'}} />
            <p>{post.date}</p>
        </article>)}
    </div>
}


function CreatePost(props) {
    return <div>

        <h3>Create Post</h3>

        <form onSubmit={event => {
            event.preventDefault()

            const { target: form } = event

            const {
                image: { value: image },
                text: { value: text}
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
            <input type="text" id="image" style={{width: '100%', boxSizing: 'boder-box'}} />

            <label htmlFor="text">Text</label>
            <input type="text" id='text' style={{ width: '100%', boxSizing: 'border-box' }} />

            <button type="submit">Create</button>
        </form>

    </div>
}


class App extends Component {
    constructor(props){
        super(props)

        this.state = { view: 'login'}
    }

    render(){
        return <div>
            <h1>Welcome to Unsocial !</h1>

            {this.state.view === 'login' && <Login 
                onLoggedIn={() => this.setState({ view: 'home'})} 
                onRegisterLink={() => this.setState({ view: 'register' })}
            />}
            {this.state.view === 'register' && <Register
            loginBack={() => this.setState({ view: 'login'})}
            />}

            {this.state.view === 'home' && <Home onLoggedOut={() => this.setState({ view: 'login' })} />}

            
        </div>
    }
}

root.render(<App/>)