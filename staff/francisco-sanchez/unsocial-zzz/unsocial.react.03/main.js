let loggedInUser = null

const rootElement = document.getElementById('root')
const root = ReactDOM.createRoot(rootElement)

const title = React.createElement('h1', { style: { textDecoration: 'underline' } }, 'This is react!')
const subTitle = React.createElement('h2', { style: { fontStyle: 'italic' } }, `And I'm awesome`)

const presentationParagraph = React.createElement('p', {}, 'Laborum incididunt laboris occaecat quis reprehenderit nulla dolor elit voluptate eu amet adipisicing. Velit deserunt aute sit amet dolore irure pariatur veniam do. Lorem occaecat amet voluptate est et. Do ipsum exercitation dolore velit ad ipsum voluptate eu. Ex eiusmod est ad officia. Deserunt ullamco est sunt officia ipsum magna amet anim. Laborum excepteur est dolor id exercitation sunt id dolore officia irure ullamco et veniam consectetur.')

const button = React.createElement('button', { type: 'button', onClick: () => alert('Clicked!') }, 'Click me!')


const calcTitle = React.createElement('h3', { style: { fontStyle: 'italic' } }, `Calculadora`)

const calculadora = React.createElement('div')
let labelVarA = React.createElement('label', {}, 'First number ')
let inputVarA = React.createElement('input', { type: 'number', id: 'inputVarA', placeholder: 'Insert First Number' })

let labelVarB = React.createElement('label', {}, 'Second number ')
let inputVarB = React.createElement('input', { type: 'number', id: 'inputVarB', placeholder: 'Insert Second Number' })

let result = 0

const submitAdd = React.createElement('button', { type: 'submit', id: 'add', name: 'add' }, 'Suma')
const submitSubs = React.createElement('button', { type: 'submit', id: 'substract', name: 'substract' }, 'Resta')

const form = React.createElement('form', {
    onSubmit: event => {
        event.preventDefault()
        let clickedButton = event.nativeEvent.submitter; // Esto obtiene el botón que se ha pulsado
        let nameButton = clickedButton.name;
        if (nameButton === 'add') {
            result = parseInt(event.target.inputVarA.value) + parseInt(event.target.inputVarB.value)
        } else {
            result = parseInt(event.target.inputVarA.value) - parseInt(event.target.inputVarB.value)
        }
        console.log(result)

    }
}, [inputVarA, inputVarB, submitAdd, submitSubs])

//let showResult = react.createElement('h4', {}, 'result is: ' + result + '!')


/*const red = React.createElement('li', { style: { backgroundColor: 'red' } }, 'RED')
const green = React.createElement('li', { style: { backgroundColor: 'green' } }, 'GREEN')
const blue = React.createElement('li', { style: { backgroundColor: 'blue' } }, 'BLUE')
const list = React.createElement('ul', { style: { border: '1px solid black' } }, [red, green, blue])
*/

/*const inputManu = React.createElement('input', { type: 'text', id: 'whatever', className: 'pepito', placeholder: 'Whatever!?' })
const submitManu = React.createElement('button', { type: 'submit' }, 'Do')
const formManu = React.createElement('form', {
    onSubmit: event => {
        event.preventDefault()

        console.log(event.target.whatever.value)
    }
}, [inputManu, submitManu])

const link = React.createElement('a', {
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
    const content = React.createElement('span', {
        onClick: () => alert(`${props.emoji} Ouch!`),
        style: {
            cursor: 'pointer'
        }
    },
        props.emoji)

    const box = React.createElement('div', {
        style: {
            border: '2px solid black',
            display: 'inline-block',
            padding: '3px'
        }
    },
        content)

    return box
}

//class Car extends React.Component { }
// const Component = React.Component
const { Component } = React
class Car extends Component {
    constructor(props) {
        super(props)
    }

    render() {
        const content = React.createElement('span', { style: { padding: '2px' } }, this.props.car)

        return content
    }
}

const blueCar = new Car({ car: '🚙' })
const redCar = new Car({ car: '🚗' })
const yellowCar = new Car({ car: '🚕' })
*/


root.render([
    title,
    subTitle,
    presentationParagraph,
    calcTitle,
    calculadora,
    form,
    //showResult,
    /*buttonManu,
    list,
    blueCar.render(),
    redCar.render(),
    yellowCar.render(),*/
    //formManu,
    /*link,
    ReactiveEmoji({ emoji: '😊' }),
    ReactiveEmoji({ emoji: '❤️' }),*/
])