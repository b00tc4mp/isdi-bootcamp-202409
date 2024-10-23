var loggedInUser = null

const rootElement = document.getElementById('root')
const root = ReactDOM.createRoot(rootElement)

//declaring Component its equal to React
const { Component } = React

//declaring H1
const title = <h1>Hello, React!</h1>

//declaring 'ul' 
const list = <ul style={{ border: '1px solid black'}}>
    <li style={{ backgroundColor: 'red' }}>RED</li>
    <li style={{ backgroundColor: 'green' }}>GREEN</li>
    <li style={{ backgroundColor: 'blue' }}>BLUE</li>
</ul>

//declaring Form, then dropbox option, then input/label and button
const form = <form onSubmit={event => {event.preventDefault()

    //console.log(event.target.city.value, event.target.query.value)

    // const { target: { city: { value: city }, query: { value: query } } } = event
    // console.log(city, query)

    const {city, query } = event.target
    console.log(city.value, query.value)
}}>
    <label htmllFor="city">City</label>
    <select>
        <option value="bcn">Barcelona</option>
        <option value="mad">Madrid</option>
        <option value="mal">Malaga</option>
    </select>


    <label htmlFor="query">Query</label>
    <input type="text" id="query"/>

    <button type="submit">Search<span>🔎</span></button>
</form>

function ReactiveEmoji(props) {
    return <div style={{
        border: '2px solid black',
        display: 'inline-block',
        padding: '3px'
    }}>
        <span onClick={() => alert(`${props.emoji} Ouch!`)}>{props.emoji}</span>
    </div>
}

class Car extends Component {
    constructor(props) {
        console.log('Car -> constructor')

        super(props) // this.props = props

        this.state = { status: '' }
    }

    render() {
        console.log('Car -> render')

        return <span style={{ padding: '2px', cursor: 'pointer' }}
        onClick={() => {
            this.setStatus({ status: this.state.status === '' ? '💨' : '' })//Component.prototype.setState
        }}>{this.props.car}{this.state.status}</span>
    }
}

const blueCar = <Car car="🚙" /> // new Car...
const redCar = <Car car="🚗" /> // new Car...
const yellowCar = <Car car="🚕" /> // new Car...

root.render([
    title,
    list,
    blueCar,
    redCar,
    yellowCar,
    form,
    <ReactiveEmoji emoji="😊" />,
    <ReactiveEmoji emoji="❤️" />
])