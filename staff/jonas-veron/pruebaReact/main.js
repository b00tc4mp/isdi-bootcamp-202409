const rootElement = document.getElementById('root')
const root = ReactDOM.createRoot(rootElement)

const title = React.createElement('h1', null, 'I\'M A TITLE')

const subTitle = React.createElement('h2', null, 'I\'M A SECOND TITLE')

const header = React.createElement('section', null, [title, subTitle])

const { Component } = React

// Clase que utiliza el método setState, para cambiar el estado del texto del parágrafo en este caso (el valor)
class Counter extends Component {
    constructor() {
        super()
        this.state = { value: 0 };
    }
//primero creamos los metodos de incremento y decremento del boton utilizando setState para actualizar el estado del objeto
    render() {
        const increment = () => {
            this.setState(prevState => ({ value: prevState.value + 1 }));
        };

        const decrement = () => {
            this.setState(prevState => ({ value: prevState.value - 1 }));
        };
        //creamos el contador que va a ir actualizando su numero cada vez que le demos al boton
                let counterText = React.createElement('p', null, `${this.state.value}`)
//creamos los botones y le damos la funcion que creamos correspondientes a cada boton
        const sumButton = React.createElement('button', {
            onClick: increment
        , style: { height: '20px', width: '100px'}}, '+')
        const minButton = React.createElement('button', {
            onClick: decrement
        , style: { height: '20px', width: '100px'}}, '-')
//lo añadimos a una seccion
        const counterSection = React.createElement('section', { className: 'counter-section' }, null, [counterText, sumButton, minButton])
//retornamos la seccion
        return counterSection
    }
}

//se crea una instancia del componente Counter
const myCounter = React.createElement(Counter);

root.render([
    header,
    myCounter,

])