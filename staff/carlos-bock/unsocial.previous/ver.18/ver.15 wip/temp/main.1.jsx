let loggedInUser = null

const rootElement = document.getElementById('root')
const root = ReactDOM.createRoot(rootElement)

// const _jsx = React.createElement
// const Component = React.Component
const { createElement: _jsx, Component } = React

const title = _jsx('h1', { style: { backgroundColor: 'red' } }, 'Hola, React!')

const button = _jsx('button', { type: 'button', onClick: () => alert('Clicked!') }, 'Click me!')


const red = <li style={{ backgroundColor: 'red' }}>RED</li>
const green = <li style={{ backgroundColor: 'green' }}>GREEN</li>
const blue = <li style={{ backgroundColor: 'blue' }}>BLUE</li>
const list = <ul style={{ border: '1px solid black' }}>{[red, green, blue]}</ul>

const list2 = <ul style={{ border: '1px solid black' }}>
    <li style={{ backgroundColor: 'red' }}>RED</li>
    <li style={{ backgroundColor: 'green' }}>GREEN</li>
    <li style={{ backgroundColor: 'blue' }}>BLUE</li>
</ul>

const form2 = <form>
    <label htmlFor="query">Criteria</label>
    <input type="text" id="query" />
    <button type="submit">Search <span>🔎</span></button>
</form>

const input = _jsx('input', { type: 'text', id: 'whatever', className: 'pepito', placeholder: 'Whatever!?' })
const submit = _jsx('button', { type: 'submit' }, 'Do')
const form = _jsx('form', {
    onSubmit: event => {
        event.preventDefault()

        console.log(event.target.whatever.value)
    }
}, [input, submit])

const link = _jsx('a', {
    href: '',
    onClick: event => {
        event.preventDefault()

        console.log('link clicked')
    },
    style: {
        color: 'magenta'
    }
}, 'click me')

function ReactiveEmoji(props) {
    const content = _jsx('span', {
        onClick: () => alert(`${props.emoji} Ouch!`),
        style: {
            cursor: 'pointer'
        }
    },
        props.emoji)

    const box = _jsx('div', {
        style: {
            border: '2px solid black',
            display: 'inline-block',
            padding: '3px'
        }
    },
        content)

    return box
}

class Car extends Component {
    constructor(props) {
        super(props)
    }

    render() {
        const content = _jsx('span', { style: { padding: '2px' } }, this.props.car)

        return content
    }
}

const blueCar = new Car({ car: '🚙' })
const redCar = new Car({ car: '🚗' })
const yellowCar = new Car({ car: '🚕' })

root.render([
    title,
    button,
    list,
    blueCar.render(),
    redCar.render(),
    yellowCar.render(),
    form,
    link,
    ReactiveEmoji({ emoji: '😊' }),
    ReactiveEmoji({ emoji: '❤️' }),
    list2,
    form2
])