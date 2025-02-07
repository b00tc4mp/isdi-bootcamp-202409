let loggedUser = null

const rootElement = document.getElementById('root')
const root = ReactDOM.createRoot(rootElement)

const { Component } = React

const title = <h1 style={{ backgroundColor: 'white' }}>Hello, React!</h1>
const button = <button type='button' style={{ display: 'block' }} onClick={() => { alert('Clicked') }}>Click Me!</button>

const list = <ul style={{ border: '1px solid black' }}>
  <li style={{ backgroundColor: 'green' }}>GREEN</li>
  <li style={{ backgroundColor: 'yellow' }}>YELLOW</li>
  <li style={{ backgroundColor: 'red' }}>RED</li>
</ul>

const form = <form onSubmit={event => {
  event.preventDefault()
  const { city, query } = event.target
  console.log(city.value, query.value)
}}>
  <label htmlFor="city">City</label>
  <select id="city">
    <option value="bcn">Barcelona</option>
    <option value="mad">Madrid</option>
    <option value="mal">Málaga</option>
  </select>
  <label htmlFor="query">Query</label>
  <input id="query" type="text" placeholder="Write something..." />
  <button type="submit">Search<span>🔎</span></button>
</form>

function ReactiveEmoji(props) {
  return (
    <div style={{
      border: '2px solid black',
      display: 'inline-block',
      padding: '3px',
      backgroundColor: 'white'
    }}>
      <span style={{ cursor: 'pointer' }} onClick={() => { alert(`${props.emoji}: Ouch!`) }}>{props.emoji}</span>
    </div>)
}

class Car extends Component {
  constructor(props) {
    super(props)
  }

  render() {
    return (
      <span style={{
        padding: '2px',
        border: 'solid',
        backgroundColor: 'white'
      }}>{this.props.car}</span>
    )
  }
}

const blueCar = <Car car='🚙' />
const redCar = <Car car='🚗' />
const yellowCar = <Car car='🚕' />

root.render([
  title,
  button,
  list,
  form,
  <ReactiveEmoji emoji="😊" />,
  <ReactiveEmoji emoji="❤️" />,
  blueCar,
  redCar,
  yellowCar
])