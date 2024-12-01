import { Component } from "react"
import Input from "./Input"

class PasswordInput extends Component {
  constructor(props) {
    super(props)

    this.state = { className: 'far fa-eye', type: 'password' }
  }

  handleIconClick = () => this.setState({
    className: this.state.className === 'far fa-eye' ? 'far fa-eye-slash' : 'far fa-eye',
    type: this.state.type === 'password' ? 'text' : 'password'
  })

  render() {
    return (
      <div className="password-container">
        <Input id={this.props.id} type={this.state.type} placeholder="Enter your password" required />
        <i className={this.state.className}
          id="icon"
          onClick={this.handleIconClick}></i>
      </div>
    )
  }
}

export default PasswordInput