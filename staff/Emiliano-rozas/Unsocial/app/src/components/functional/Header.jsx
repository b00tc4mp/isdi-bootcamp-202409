import './Header.css'

import { Button, Anchor } from '../library'

import logic from '../../logic'
import { Component } from 'react'

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

        event.preventDefaul()

        this.props.onHomeClick()
    }

    handleLogout = () => {

        const confirmLogout = window.confirm("Are you sure you want to Logout?")

        if (confirmLogout) {

            logic.logoutUser()
            this.props.logOut()
        }
    }

    render() {
        console.log('Header -> render')

        return <header className='Header'>

            <h1> {this.props.view === 'new-post' ? <Anchor href="" onClick={this.handleHomeClick}>Unsocial</Anchor> : 'Unsocial'}</h1 >

            <div className='TopNav'>

                {this.state.name && <h3>{this.state.name}</h3>}


                {logic.isUserLoggedIn() && <Button type="button" onClick={this.handleLogout}>Logout</Button>}

            </div>

        </header >
    }
}



