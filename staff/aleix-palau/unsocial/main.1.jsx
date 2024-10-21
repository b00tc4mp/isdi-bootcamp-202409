let loggedInUser = null

const rootElement = document.getElementById('root')
const root = ReactDOM.createRoot(rootElement)

const { Component } = React

class PasswordInput extends Component {
    constructor(props) {
        // console.log('PasswordInput -> constructor')

        super(props) // this.props = props

        this.state = { status: '👻', type: 'password' }
    }

    render() {
        // console.log('PasswordInput -> render')

        return <div style={{ display: 'flex' }}>
            <input type={this.state.type} id={this.props.id} style={{ width: '100%', boxSizing: 'border-box', paddingRight: '18px' }} />
            <span
                style={{ cursor: 'pointer' }} onClick={() => this.setState({
                    status: this.state.status === '👻' ? '💀' : '👻',
                    type: this.state.type === 'password' ? 'text' : 'password'
                })}
            >{this.state.status}</span>
        </div>
    } // 23 -> position: 'absolute', right: '10px'
}

function Login() {
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
    </section>
}
{/*<label for="password">Password</label>
    <div style="display: flex;"><input type="password" id="password" style="width: 100%; box-sizing: border-box; padding-right: 18px;"><span style="cursor: pointer;">😌</span> */ }

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

            <label htmlFor="password-repeat">Repeat password</label>
            <PasswordInput id="password-repeat" />

            <button type="submit">Register</button>
        </form>

        <a href="">Login</a>
    </section>
}

{/* <label for="password">Password</label><div style="display: flex;"><input type="password" id="password" style="width: 100%; box-sizing: border-box; padding-right: 18px;"><span style="cursor: pointer;">😌</span></div><label for="password-repeat">Repeat Password</label><div style="display: flex;"><input type="password" id="password-repeat" style="width: 100%; box-sizing: border-box; padding-right: 18px;"><span style="cursor: pointer;">😌</span></div><button type="submit">Register</button></form><a href="">Login</a></section> */ }

function Home() {
    return <section>
        <h2>Home</h2>

        <h3>Hello, Peter Pan!</h3>
        <button type="button">Logout</button>
        <button type="button">➕</button>

        <div>
            <h3>Posts</h3>

            <article>
                <h4>peterpan</h4>
                <img src="https://pbs.twimg.com/media/GZOUcE1XwAAPQVO?format=jpg&name=medium" style={{ width: '100%' }} />
                <p>Spooky Season👻</p>
                <time>Thu Oct 17 2024 16:19:13 GMT+0200 (Central European Summer Time)</time>
            </article>

            <article>
                <h4>runner4life</h4>
                <img src="https://pbs.twimg.com/media/GZICEdpXAAA1Aqf?format=jpg&name=small" style={{ width: '100%' }} />
                <p>Skrik😱</p>
                <time>Thu Oct 17 2024 16:19:13 GMT+0200 (Central European Summer Time)</time>
            </article>
        </div>
    </section>
}

root.render(<div>
    <h1>UN$0C14L</h1>

    {/* <Login /> */}
    <Register />
    {/* <Home /> */}
</div>)