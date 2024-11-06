import { Button } from '../library'

import logic from '../../logic'

import './Header.css'
import { Component } from 'react'
import isUserLoggedIn from '../../logic/isUserLoggedIn'

export default class extends Component {
    constructor(props) {
        console.log('Header -> constructor')

        super(props)

        this.state = { name: null }

    }

    componentDidMount() {
        console.log('Header -> componentDidMount')


        if (logic.isUserLoggedIn())
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

    componentDidUpdate(prevProps) {
        if (this.props.view !== prevProps.view)
            if (logic.isUserLoggedIn()) {
                try {
                    logic.getUserName((error, userName) => {
                        if (error) {
                            alert(error.message)

                            console.error(error)

                            return
                        }

                        this.setState({ userName })
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

    render() {
        console.log('Header -> render')

        return <header className="Header">

            <h1>{this.props.view === 'new-post' ? <a href="" onClick={this.handleHomeClick}>Unsocial</a> : 'Unsocial'}</h1>

            {isUserLoggedIn() && <h3>{this.state.userName}</h3>}

            {logic.isUserLoggedIn() && <Button type="button" onClick={this.handleLogout}>Logout</Button>}
        </header>
    }

}