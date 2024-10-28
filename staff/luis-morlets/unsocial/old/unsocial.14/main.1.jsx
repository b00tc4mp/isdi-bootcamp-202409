let loggedInUser = null

const rootElement = document.getElementById('root')
const root = ReactDOM.createRoot(rootElement)

const { Component } = React

class PasswordInput extends Component {
    constructor(props) {
        super(props)

        this.state = { status: 'https://icons.veryicon.com/png/o/miscellaneous/computer-room-integration/show-password-3.png', type: 'password' }
    }

    render() {
        return <div style={{ display: 'flex' }}>
            <input type={this.state.type} id={this.props.id} required="" style={{ width: '100%', boxSizing: 'border-box', paddingRight: '30px' }} />
            <img src={this.state.status}
                style={{ cursor: 'pointer', position: 'absolute', width: '20px', right: '55px', }}
                onClick={() => this.setState({
                    status: this.state.status === 'https://icons.veryicon.com/png/o/miscellaneous/computer-room-integration/show-password-3.png'
                        ? 'https://icons.veryicon.com/png/o/miscellaneous/computer-room-integration/hide-password.png'
                        : 'https://icons.veryicon.com/png/o/miscellaneous/computer-room-integration/show-password-3.png',
                    type: this.state.type === 'password'
                        ? 'text'
                        : 'password'
                })}
            />
        </div>
    }
}

function Login() {
    return <section>
        <h2>Login</h2>
        <form>
            <label htmlFor="username">Username</label>
            <input type="text" id="username" required="" style={{ width: '100%', boxSizing: 'border-box' }} />

            <PasswordInput />
            <button type="submit">Login</button>
        </form>
        <p>Don't have an account? <a href="">Register</a></p>
    </section>
}

function Register() {
    return <section>
        <h2>Register</h2>
        <form>
            <label htmlFor="name">Name</label>
            <input type="text" id="name" required="" style={{ width: '100%', boxSizing: 'border-box' }} />

            <label htmlFor="email">E-mail</label>
            <input type="email" id="email" required="" style={{ width: '100%', boxSizing: 'border-box' }} />

            <label htmlFor="username">Username</label>
            <input type="text" id="username" required="" style={{ width: '100%', boxSizing: 'border-box' }} />

            <label htmlFor="password">Password</label>
            <PasswordInput id="password" />

            <label htmlFor="password-repeat">Repeat Password</label>
            <PasswordInput id="password-repeat" />

            <button type="submit">Register</button>
        </form>
        <p>Already have an account? <a href="">Login</a></p>
    </section>
}

function Home() {
    return <section>
        <h2>Home</h2>
        <h3>Hey, Peter Pan, you're here!</h3>
        <button type="button">Logout</button>
        <button type="button">➕</button>
        <ul>
            <h3>Posts</h3>
            <li>
                <h4>wendydarling</h4>
                <img src="https://pm1.aminoapps.com/8360/ad07e2d2cdf6e1733328d6e7b7848b87db38a2bbr1-1536-2048v2_hq.jpg" style={{ width: '100%' }} />
                <div>
                    <button type="button" style={{ cursor: 'pointer' }}>🤍</button>
                    <span>150</span>
                </div>
                <p>here i am</p>
                <time>Thu Oct 17 2024 15:39:14 GMT+0200 (hora de verano de Europa central)</time>
            </li>
            <li>
                <h4>peterpan</h4>
                <img src="https://i.pinimg.com/originals/8c/60/1a/8c601a25311a1a5098896f751a784b54.jpg" style={{ width: '100%' }} />
                <div>
                    <button type="button" style={{ cursor: 'pointer' }}>🤍</button>
                    <span>100</span>
                </div>
                <p>here we are</p>
                <time>Thu Oct 17 2024 15:39:14 GMT+0200 (hora de verano de Europa central)</time>
            </li>
        </ul>
    </section>
}

root.render(<div>
    <h1>Unsocial</h1>
    {/*<Login />*/}
    {/*<Register />*/}
    <Home />
</div>

)