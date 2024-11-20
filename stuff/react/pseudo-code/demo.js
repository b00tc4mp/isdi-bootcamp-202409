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

    __setProps(props) {
        this.componentWillReceiveProps(props)

        this.props = props
    }

    componentWillReceiveProps() { }

    __init() {
        this.componentDidMount()
    }

    componentDidMount() { }
}

class App extends Component {
    constructor(props) {
        console.log('App -> constructor')

        super(props)

        this.state = { view: 'login' }
    }

    // overriding
    componentWillReceiveProps(newProps) {
        console.log('App -> componentWillReceiveProps')

        if (this.props.theme !== newProps.theme)
            console.log('theme changing from', this.props.theme, 'to', newProps.theme)
    }

    // overriding
    componentDidMount() {
        console.log('App -> componentDidMount')
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
        console.log('App -> render')

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

/*
root.render(<Theme>
    ...
    <App theme="light" />
</Theme>)
*/

const root = {
    render(compo) {
        document.body.innerHTML = compo.render()

        compo.__init()
    }
}

const a = new App({ theme: 'light' })
root.render(a)

// a few seconds later, use submits the form (simulation)
a.handleSubmit({
    preventDefault() { },

    target: {
        username: { value: 'pepito' },
        password: { value: '123123123' }
    }
})

//and later
a.__setProps({ theme: 'dark' })
//VM1175:34 theme changing from light to dark

a.__setProps({ theme: 'dark' })
// undefined
a.__setProps({ theme: 'dark' })
// undefined
a.__setProps({ theme: 'dark' })
// undefined
a.__setProps({ theme: 'dark' })
// undefined

a.__setProps({ theme: 'light' })
// VM1175:34 theme changing from dark to light
