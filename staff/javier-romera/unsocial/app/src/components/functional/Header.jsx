import { Component } from 'react'

import './Header.css'

import { Anchor, Button } from '../library'

import logic from '../../logic'

export default class extends Component {
    constructor(props) {
        super(props)

        this.state = { userName: "" }
    }

    componentDidMount() {
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

    componentDidUpdate() {
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
        logic.logoutUser()

        this.props.onLoggedOut()
    }

    render() {
        return <header className="Header">
            <h1>{this.props.view === 'new-post' ? <Anchor href="" onClick={this.handleHomeClick}>laicosnU</Anchor> : "laicosnU"}</h1>

            <div className="name-button">
                {logic.isUserLoggedIn() && <h3>{this.state.userName}</h3>}

                {logic.isUserLoggedIn() && <Button classname="logout-button" type="button" onClick={this.handleLogout}>𐢫</Button>}
            </div>
        </header>
    }
}