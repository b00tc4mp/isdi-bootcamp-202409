import { Button } from '../library'
import logic from '../../logic'
import './Header.css'
import { Component } from 'react'

export default class Header extends Component {
    constructor(props) {
        super(props)
        this.state = { name: null }
    }

    componentDidMount() {
        if (logic.isUserLoggedIn())
            try {
                logic.getUserName((error, name) => {
                    if (error) {
                        alert(error.mesage)
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

    componentWillReceiveProps(nextProps) {
        if (this.props.view !== nextProps.view)
            if (logic.isUserLoggedIn())
                if (!this.state.name) {
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
                } else this.setState({ name: null })
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
        return <header className="Header">
            <h1>{this.props.view === 'new-post' ? <a href="" onClick={this.handleHomeClick}>Unsocial</a> : 'Unsocial'}</h1>

            {this.state.name && <h3>{this.state.name}</h3>}

            {logic.isUserLoggedIn() && <Button type="button" onClick={this.handleLogout}>Logout</Button>}
        </header>
    }
}
