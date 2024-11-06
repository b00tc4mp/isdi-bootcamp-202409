import { Button } from '../biblio'
import { Component } from 'react'
import logic from '../../logic'
import './Header.css'
import Logo from '../../images/users-avatar.png'

export default class Header extends Component {
  constructor(props) {
    console.log('Header -> Constructor')

    super(props)

    this.state = { name: null }
  }

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

  componentWillReceiveProps(nextProps) {
    console.log('Header -> componentWillReceiveProps')
    if (this.props.view !== nextProps.view) {
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
  }

  handleLogout = event => {

    if (confirm('Logout?')) {
      event.preventDefault()
      this.props.onLoggedOut()
    }
  }

  handleHomeClick = event => {

    event.preventDefault()
    this.props.onHomeClick()
  }

  render() {
    console.log('Header -> render')

    return (
      <header className="Header">
        <div
          onClick={logic.isUserLoggedIn() ? this.handleHomeClick : () => { }}
          className={logic.isUserLoggedIn() ? 'logo-container-btn' : 'logo-container'}>
          <img className="logo" src={Logo} />
          <h1>unSocial</h1>
        </div>

        {logic.isUserLoggedIn() && this.state.name && <h3>{this.state.name}</h3>}

        {logic.isUserLoggedIn() && <Button id="btn-logout" type="button" onClick={this.handleLogout}>Logout</Button>}

      </header>
    )
  }
}