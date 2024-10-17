let loggedUser = null

const rootElement = document.getElementById('root')
const root = ReactDOM.createRoot(rootElement)

const title = React.createElement('h1', { style: { backgroundColor: 'white' } }, 'Hello, React!')

const button = React.createElement('button',
  {
    type: 'button',
    style: { display: 'block' },
    onClick: () => alert('Clicked!')
  },
  'Click me!')

const button2 = React.createElement('button',
  {
    type: 'button',
    style: { display: 'block' },
    onClick: () => alert('Now you cliked')
  },
  'Are you serious? 😒')

const red = React.createElement('li', { style: { backgroundColor: 'red' } }, 'RED')

const green = React.createElement('li', { style: { backgroundColor: 'green' } }, 'GREEN')

const blue = React.createElement('li', { style: { backgroundColor: 'blue' } }, 'BLUE')

const list = React.createElement('ul', { style: { border: '1px solid black' } }, [red, green, blue])

const input = React.createElement('input',
  {
    type: 'text',
    id: 'whatever',
    className: 'pepito hola',
    placeholder: 'Write something'
  }
)

const submit = React.createElement('button', {
  type: 'submit'
}, 'Submit')

const form = React.createElement('form', {
  onSubmit: event => {
    event.preventDefault()
    console.log(event.target.whatever.value)
  }
}, [input, submit])

function ReactiveEmoji(props) {
  const content = React.createElement('span', {
    onClick: () => alert(`${props.emoji} Ouch!`),
    style: {
      cursor: 'pointer'
    }
  }, props.emoji)

  const box = React.createElement('div', {
    style: {
      border: '2px solid black',
      display: 'inline-block',
      padding: '3px',
      backgroundColor: 'white'
    }
  }, content)
  return box
}

const { Component } = React
class Car extends Component {
  constructor(props) {
    super(props)
  }

  render() {
    const content = React.createElement('span', {
      style: {
        padding: '2px',
        border: 'solid',
        backgroundColor: 'white'
      }
    }, this.props.car)

    return content
  }
}

const blueCar = new Car({ car: '🚙' })
const redCar = new Car({ car: '🚗' })
const yellowCar = new Car({ car: '🚕' })

root.render([
  title,
  button,
  button2,
  list,
  form,
  ReactiveEmoji({ emoji: '😚' }),
  blueCar.render(),
  redCar.render(),
  yellowCar.render(),

])