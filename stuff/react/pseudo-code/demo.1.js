class Component {
    constructor(props) {
        this.props = props
    }

    setState(state) {
        //this.state = state

        for (const key in state)
            this.state[key] = state[key]

        setTimeout(() => document.body.innerHTML = this.render(), 0)
    }
}

class App extends Component {
    constructor(props) {
        super(props)

        this.state = { view: 'login' }
    }

    handleSubmit = event => {
        event.preventDefault()

        const form = event.target

        const username = form.username.value
        const password = form.password.value

        if (username === 'pepito' && password === '123123123') {
            this.setState({ view: 'home' })

            return
        }

        alert('wrong credentials')
    }

    render() {
        return `${this.state.view === 'login' && `<main>
            <h2>Login</h2>
            <form onSubmit={this.handleSubmit}>
                <input type="text" id="username" />
                <input type="password" id="password" />
                <button type="submit">Login</button>
            </form>
        </main>`}
        
        ${this.state.view === 'home' && `<main>
            <h2>Home</h2>
            <p>Hola, Mundo!</p>
        </main>`}`
    }
}


// root.render(<App />)

const root = {
    render(compo) {
        document.body.innerHTML = compo.render()
    }
}

const a = new App()

root.render(a)

// a few seconds later, use submits the form (simulation)
a.handleSubmit({
    preventDefault() { },

    target: {
        username: { value: 'pepito' },
        password: { value: '123123123' }
    }
})
