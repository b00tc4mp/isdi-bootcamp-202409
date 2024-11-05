import { Button } from '../library'
import logic from '../../logic'
import './Header.css'
import { Component } from 'react'
import logo from '../../../public/logo-unsocial-sin-fondo.png'



export default class extends Component {
    constructor(props) {
        console.log('Header -> construcor')

        super(props)

        this.state = { name: null }
    }
    /*
    NOTA: 
    componentDidMount() es un método del ciclo de vida de los componentes de clase en React. Se ejecuta automáticamente una vez después de que el componente se ha renderizado en el DOM por primera vez. Es útil para inicializar tareas asincrónicas, como solicitar datos de una API, establecer suscripciones, o realizar configuraciones que solo deben ejecutarse una vez en la vida del componente.
    */
    componentDidMount() {
        console.log('Header -> componentDidMount')

        if (logic.isUserLoggedIn()) {
            try {
                logic.getUserName((error, name) => {
                    if (error) {
                        alert(error.message)
                        console.error(error)
                        return
                    }
                    this.setState({ name })
                })

            } catch (error) {
                alert(error.message)
                console.error(error)
            }
        }
    }

    handleHomeClick = event => {
        event.preventDefault()
        this.props.onHomeClick()
    }

    handleLogout = () => {
        if (confirm('Logout?')) {
            logic.logoutUser()
            this.props.onLoggedOut()
        }
    }

    handleProfile = event => {
        event.preventDefault()
        this.props.onViewProfile() // Cambia la vista a 'viewProfile'
    }

    render() {
        console.log('Header -> render')

        return <header className="Header">
            <img src={logo} alt='logo' id='logo' />
            <h1>{this.props.view === 'new-post' ? <a href="" onClick={this.handleHomeClick}>Unsocial</a> : 'Unsocial'}</h1>


            {this.state.name && <a href="" onClick={this.handleProfile}><h3 className="nombreUser">{this.state.name}</h3></a>}


            {logic.isUserLoggedIn() && <Button type="button" onClick={this.handleLogout}>Logout</Button>}
        </header>
    }

}


// export default function Header({ view, onHomeClick, onLoggedOut, onViewProfile }) {
//     let name //Para el nombre del usuario

//     if (logic.isUserLoggedIn())

//         try {
//             name = logic.getUserName()
//         } catch (error) {
//             alert(error.message)

//             console.error(error)
//         }

//     return <header className="Header">

//         <h1>{view === 'new-post' ? <a href="" onClick={event => {
//             event.preventDefault()
//             onHomeClick()
//         }}>Unsocial</a> : 'Unsocial'}</h1>



//         {logic.isUserLoggedIn() &&
//             <a href="" onClick={event => {
//                 event.preventDefault()
//                 onViewProfile() // Cambia la vista a 'viewProfile'
//             }}>
//                 <h3 className="nombreUser">{name}</h3>
//             </a>}


//         {logic.isUserLoggedIn() && <Button type="button" onClick={() => {
//             logic.logoutUser()
//             onLoggedOut()
//         }}>Logout</Button>}
//     </header>
// }