let loggedInUser = null

const rootElement = document.getElementById('root')
const root = ReactDOM.createRoot(rootElement)

const { Component } = React

function Login() {

    return <section>
        <h2>Login</h2>

        <form>
            <label htmlFor="username">Username</label>
            <input type="text" id="username" style={{ width: '100%', boxSizing: 'border-box' }} />

            <label htmlFor="password">Password</label>
            <input type="password" id="password" style={{ width: '100%', boxSizing: 'border-box' }} />

            <button type="submit">Login</button>
        </form>
        <a href="">Register</a>
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
            <input type="password" id="password" />

            <label htmlFor="password-repeat">Repeat Password</label>
            <input type="password" id="password-repeat" />

            <button type="submit">Register</button>
        </form>

        <a href="">Login</a>
    </section>
}

function Home() {
    return <section>
        <h2>Home</h2>

        <h3>Hello, Aaron!</h3>

        <button type="button">Logout</button>
        <button type="button">+</button>

        <div>
            <h3>Posts</h3>

            <article>
                <h4>aaron</h4>
                <img src="https://pm1.aminoapps.com/8360/ad07e2d2cdf6e1733328d6e7b7848b87db38a2bbr1-1536-2048v2_hq.jpg"
                    style={{ width: '100%' }} />
                <p>AARON</p>
                <time>Thu Oct 17 2024 14:36:39 GMT+0200 (hora de verano de Europa central)</time>
            </article>

            <article>
                <h4>juanpablo</h4>
                <img src="https://i.pinimg.com/originals/8c/60/1a/8c601a25311a1a5098896f751a784b54.jpg"
                    style={{ width: '100%' }} />
                <p>JUANPA</p>
                <time>Thu Oct 17 2024 14:36:39 GMT+0200 (hora de verano de Europa central)</time>
            </article>
        </div>
    </section>
}


root.render(

    <div>
        <h1>Unsocial</h1>

        {/* <Login /> */}
        {/* <Register /> */}
        <Home />

    </div>

)
