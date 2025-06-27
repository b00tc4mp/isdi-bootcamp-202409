
const rootElement = document.getElementById('root')
const root = ReactDOM.createRoot(rootElement)

const { Component } = React

class PasswordInput extends Component {
    constructor(props) {
        console.log("PasswordInput -> constructor")

        super(props)

        this.state = { status: "😌", type: "password" }
    }
    render() {
        console.log("PasswordInput -> render")

        return <div style={{ display: "flex" }}>
            <input type={this.state.type} id={this.props.id} style={{ width: "100%", boxSizing: "border-box", paddingRight: "18px" }} />
            <span style={{ cursor: "pointer", position: "absolute", right: "257px" }}
                onClick={() => this.setState({
                    status: this.state.status === "😌" ? "😳" : "😌",
                    type: this.state.status === "password" ? "text" : "password"
                })}
            >{this.state.status}</span>
        </div>
    }
}

function Login(props) {
    console.log("Login -> render")
    return <section>
        <h2>Login</h2>

        <form onSubmit={event => {
            event.preventDefault()
            const { target: { username: { value: username }, password: { value: password } } } = event

            try {
                sessionStorage.loggedInUserId = authenticateUser(username, password)

                event.target.reset()

                props.onLoggedIn()
            } catch (error) {

                alert(error.message)

                console.error(error)
            }
        }}>
            <label htmlFor="username">Username</label>
            <input type="text" id="username" />

            <label htmlFor="password">Password</label>
            <PasswordInput id="password" />

            <button type="submit">Login</button>
        </form>

        <a href=""
            onClick={event => {
                event.preventDefault()

                props.registerInquire()

            }}>Register</a>

    </section>
}

function Register(props) {
    return <section>
        <h2>Register</h2>
        <form onSubmit={event => {
            event.preventDefault()

            const {
                target: {
                    name: { value: name },
                    email: { value: email },
                    username: { value: username },
                    password: { value: password },
                    ["passwordRepeat"]: { value: passwordRepeat } }
            } = event
            try {
                registerUser(name, email, username, password, passwordRepeat)

                event.reset()

                props.logBack()
            } catch (error) {

                alert(error.message)

                console.error(error)
            }
        }}>
            <label htmlFor="name">Name</label>
            <input type="text" id="name" />

            <label htmlFor="email">E-mail</label>
            <input type="text" id="email" />

            <label htmlFor="username">Username</label>
            <input type="text" id="username" />

            <label htmlFor="password">Password</label>
            <PasswordInput id="password" />

            <label htmlFor="passwordRepeat">Repeat Password</label>
            <PasswordInput id="passwordRepeat" />

            <button type="submit">Register</button>
        </form>

        <a href=""
            onClick={event => {

                event.preventDefault()

                props.logBack()
            }}
        >Login</a>
    </section >

}

class Home extends Component {
    constructor(props) {
        console.log("home => constructor")

        super(props)

        let name

        try {
            name = getUserName(sessionStorage.loggedInUserId)
        } catch (error) {
            alert(error.message)

            console.error(error)
        }

        this.state = { name: name, view: "list" }
    }

    render() {
        console.log("home => render")

        return < section >

            <h2>Home</h2>

            <h3>Welcome back {this.state.name}!</h3>

            <button type="button"
                onClick={() => {

                    delete sessionStorage.loggedInUserId

                    this.props.logOut()
                }}
            >Logout</button>

            <button type="button"
                onClick={() =>
                    this.setState({ view: "new" })
                }
            >➕</button>
            {this.state.view === "list" && <PostList onDeleted={() => this.setState({ view: "list" })} />}
            {this.state.view === "new" && <CreatePost onCreated={() => this.setState({ view: "list" })} />}
        </section >
    }

}

function PostList(props) {
    console.log("PostList -> render")

    let posts

    try {
        posts = getPosts()
    } catch (error) {
        alert(error.message)

        console.error(error)
    }
    return <div>
        <h3> Posts</h3>

        {posts.map(post => <article>
            <h4>{post.author}</h4>
            <img src={post.image} />
            <p>{post.text}</p>
            <time>{post.date}</time>
            {post.author === sessionStorage.loggedInUserId && (
                <button type="button" onClick={() => {
                    posts = JSON.parse(localStorage.post)

                    const postIndex = posts.findIndex(element => element.id === post.id)

                    if (postIndex != -1) {
                        posts.splice(postIndex, 1)

                        localStorage.posts = JSON.stringify(posts)

                        props.onDeleted()
                    }
                }}>Delete Post</button>
            )}
            <LikeButton postData={post} loggedInUser={sessionStorage.loggedInUserId} />
        </article>)}

    </div>
}

function CreatePost(props) {
    console.log("Creapost -> render")

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
            <label htmlFor="image">Imagen</label>
            <input type="text" id="image" />

            <label htmlFor="text">Text</label>
            <input type="text" id="text" />

            <button type="submit">Submit</button>

        </form>
    </div>
}


class LikeButton extends Component {
    constructor(props) {
        super(props)
        this.state = {
            likes: this.props.postData.likes || 0,
            hasLiked: false
        }
    }
    handleLike = () => {
        const { postData, loggedInUserId } = this.props;


        if (!this.state.hasLiked) {

            this.setState({
                likes: this.state.likes + 1,
                hasLiked: true
            })
            postData.likeBy = loggedInUserId
            postData.like = this.state.likes + 1
        } else {

            this.setState({
                likes: this.state.likes - 1,
                hasLiked: false
            })
            delete postData.likeBy
            postData.likes = this.state.likes - 1
        }
    }

    render() {
        return (
            <div>
                <button onClick={this.handleLike}>{this.state.hasLiked ? '👎' : '👍'}</button>
                <span>{this.state.likes}</span>
            </div>
        );
    }

}



class App extends Component {
    constructor(props) {
        super(props)

        this.state = {


            view: "login",
        }
    }

    render() {
        return <div>
            <h1>Unsocial</h1>
            {this.state.view === "login" &&
                <Login
                    onLoggedIn={() => this.setState({ view: "home" })}
                    registerInquire={() => this.setState({ view: "register" })} />}
            {this.state.view === "register" &&
                <Register
                    logBack={() => this.setState({ view: "login" })} />}
            {this.state.view === "home" &&
                <Home
                    logOut={() => this.setState({ view: "login" })} />}
        </div>
    }
}


root.render(<App />)