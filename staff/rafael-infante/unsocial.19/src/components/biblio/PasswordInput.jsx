import { Component } from "react"

class PasswordInput extends Component {
  constructor(props) {
    super(props)

    this.state = { className: 'far fa-eye', type: 'password' }
  }

  render() {
    return (
      <div className="password-container">
        <input id={this.props.id} type={this.state.type} placeholder="Enter your password" required />
        <i className={this.state.className}
          id="icon"
          onClick={() => this.setState({
            className: this.state.className === 'far fa-eye' ? 'far fa-eye-slash' : 'far fa-eye',
            type: this.state.type === 'password' ? 'text' : 'password'
          })}></i>
      </div>
    )
  }
}

export default PasswordInput