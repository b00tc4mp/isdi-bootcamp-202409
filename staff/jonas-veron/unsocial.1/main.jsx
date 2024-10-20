let loggedInUser = null

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

function Login(){

return <section>
    <h2>Login</h2>
    <form>
        <label htmlFor="username">Username</label>
        <input type="text" id="username" style = {{ width: '80%', bozSizing: 'border-box'}} />

        <label htmlFor="password">Password</label>
        <PasswordInput id='password'/>

        <button type="submit">Login</button>
    </form>

        <a href="">Register</a>
    </section>
}

function Register(){
    return <section>
        <h2>Register</h2>
        <form>
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

            <a href="">Login</a>

    </section>
}

function Home() {
    return <section>
    <h2>Home</h2>
        <h3>Hello, Peter Pan!</h3>
        <button type="button">Logout</button>
        <button type="button">➕</button>
        <ul>
            <h3>Posts</h3>
            <li>
                <h4>wendydarling</h4>
                <img src="https://pm1.aminoapps.com/8360/ad07e2d2cdf6e1733328d6e7b7848b87db38a2bbr1-1536-2048v2_hq.jpg" style={{width: '100%'}}/>
                <div>
                    <button type="button" style={{cursor:'pointer'}}>🤍</button>
                    <span>235</span>
                </div>
                    <p>here i am</p>
                    <time>Thu Oct 17 2024 15:12:15 GMT+0200 (hora de verano de Europa central)</time>
            </li>
                
            <li>
                <h4>peterpan</h4>
                <img src="https://i.pinimg.com/originals/8c/60/1a/8c601a25311a1a5098896f751a784b54.jpg" style={{width: '100%'}}/>
                <div>
                    <button type="button" style={{cursor: 'pointer'}}>🤍</button>
                    <span>100</span>
                    </div>
                    <p>here we are</p>
                    <time>Thu Oct 17 2024 15:12:15 GMT+0200 (hora de verano de Europa central)</time>
            </li>
        </ul>
    </section>
}


root.render(<div>
    <h1>Welcome to Unsocial !</h1>
    {/* <Login/> */}
    {/* <Register/> */}
    <Home/>
</div>)