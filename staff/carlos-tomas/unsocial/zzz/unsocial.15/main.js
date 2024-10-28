let loggedInUser = null

const rootElment = document.getElementById("root")
const root = ReactDOM.createRoot(rootElment)

const title = React.createElement("h1", { style: { backgroundColor: "red" } }, "Hola React!")

const button = React.createElement("button", { type: "button", onClick: () => alert("Clicked!") }, "Click me!")

const red = React.createElement("li", { style: { backgroundColor: "red" } }, "RED")
const green = React.createElement("li", { style: { backgroundColor: "green" } }, "GREEN")
const blue = React.createElement("li", { style: { backgroundColor: "blue" } }, "BLUE")
const list = React.createElement("ul", { style: { boder: "1px solid black" } }, [red, green, blue])

const input = React.createElement("input", { type: "text", id: "whatever", className: "pepito", placeholder: "Whaterver!?" },)
const submit = React.createElement("button", { type: "submit" }, "Do")
const form = React.createElement("form", {
    onSubmit: event => {
        event.preventDefault()

        console.log(event.target.whatever.value)
    }
}, [input, submit])

const link = React.createElement("a", {
    href: "",
    onClick: event => {
        event.preventDefault()

        console.log("link clicked")
    },
    style: {
        color: "magenta"
    }
}, "Click me")

function ReactiveEmoji(props) {
    const content = React.createElement("span", {
        onClick: () => alert(`${props.emoji} Ouch!`),
        style: {
            cursor: "pointer"
        }
    },
        props.emoji)

    const box = React.createElement("div", {
        style: {
            border: '2px solid black',
            display: 'inline-block',
            padding: '3px'
        }
    },
        content)

    return box
}

const { Component } = React
class Car extends Component {
    constructor(props) {
        super(props)
    }

    render() {
        const content = React.createElement("span", { style: { padding: "2px" } }, this.props.car)

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


])