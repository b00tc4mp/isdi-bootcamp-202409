import { Component } from 'react'

import { Button, Anchor } from '../library'

import logic from '../../logic'

import './Header.css'

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
        return <header className={`Header ${this.props.view !== 'posts' && this.props.view !== 'new-post' ? 'Header--transparent' : ''}`}>

            <h1>{this.props.view === 'new-post' ? <Anchor className="header-anchor" href=""
                onClick={this.handleHomeClick}>UNSOCIAL</Anchor> : 'UNSOCIAL'}</h1>

            {this.state.name && <h3>{this.state.name}</h3>}

            {logic.isUserLoggedIn() && <Button className="header-button" type="button"
                onClick={this.handleLogout}>Logout</Button>
            }
        </header >
    }
}