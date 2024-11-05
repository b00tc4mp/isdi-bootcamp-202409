import { Component } from 'react'

import { Button } from '../library'

import logic from '../../logic'
import './Header.css'

export default class extends Component {
    constructor(props) {
        super(props)

        console.log('Header -> constructor')

        this.state = { name: null }
    }

    componentDidMount() {
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
        if (this.props.view !== prevProps.view) {
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
    }

    handleHomeClick = event => {

        try {
            event.preventDefault()

            this.props.onHomeClick()

        } catch (error) {
            alert(error.message)

            console.error(error)
        }
    }

    handleLogout = () => {

        try {
            const confirmLogout = window.confirm('Are you sure you want to logout?')

            if (confirmLogout) {
                logic.logoutUser()
                this.props.onLoggedOut()
            }
        } catch (error) {
            alert(error.message)

            console.error(error)
        }
    }

    render() {

        console.log('Header -> render')

        return <header className="Header">
            <div className="title">
                <img src="\src\public\win-transformed.png" alt="unsocial logo" />
                <h1>{this.props.view === 'new-post' ? <a href="" onClick={this.handleHomeClick}>Unsocial</a> : 'Unsocial'}</h1>
            </div>

            <div className="profile">
                {logic.isUserLoggedIn() && <h3>{this.state.name}</h3>}

                {logic.isUserLoggedIn() && <Button type="button" className="logout" onClick={this.handleLogout}>Logout</Button>
                }</div>
        </header>
    }
}