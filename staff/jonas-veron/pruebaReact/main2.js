let clicks = 0

const rootElement = document.getElementById('root')
const root = ReactDOM.createRoot(rootElement)

const title = React.createElement('h1', null, 'I\'M A TITLE')

const subTitle = React.createElement('h2', null, 'I\'M A SECOND TITLE')

const header = React.createElement('section', null, [title, subTitle])

const { Component } = React

class Counter extends Component {
    constructor() {
        super()
        this.state = { value: 0 };
    }

    render() {
        const increment = () => {
            this.setState(prevState => ({ value: prevState.value + 1}));
        };

        const decrement = () => {
            this.setState(prevState => ({value: prevState.value -1}));
        };

        const sumButton = React.createElement('button', {
            onClick: intrement
        }, '+')

        const minButton = React.createElement('button', {
            onClick: decrement
        }, '-')

        let counterText = React.createElement('p', null, `${this.state.value}`)

        const counterSection = React.createElement('section', { className: 'counter-section' }, [sumButton, minButton, counterText])

        return counterSection
    }
}

const myCounter = React.createElement(Counter);
root.render([
    header,
    myCounter
])