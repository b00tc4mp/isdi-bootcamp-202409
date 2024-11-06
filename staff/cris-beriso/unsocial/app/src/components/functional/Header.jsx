import { Component } from 'react'
import { Button } from '../library'

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

  componentWillReceiveProps(nextProps) {
    if (this.props.view !== nextProps.view)
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
      if (confirm('Logout?')) {
        logic.logoutUser()

        this.props.onLoggedOut()
      }
    } catch (error) {
      alert(error.message)

      console.error(error)
    }
  }

  handleProfileClick = event => {
    try {
      event.preventDefault()

      onProfile()
    } catch (error) {
      alert(error.message)

      console.error(error)
    }

  }

  render() {
    console.log('Header -> render')
    return <header className='Header'>
      <h1>{this.props.view === 'new-post' ? <a href="" onClick={this.handleHomeClick}>Unsocial</a> : 'Unsocial'}</h1>

      {logic.isUserLoggedIn() && <h3><a href="" onClick={this.handleProfileClick}>{this.state.name}</a></h3>}

      {logic.isUserLoggedIn() && <Button type="button" onClick={this.handleLogout}>Logout</Button>}
    </header>
  }
}