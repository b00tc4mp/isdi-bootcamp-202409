import { Component } from 'react'

class PasswordInput extends Component {
    constructor(props) {
        console.log('PasswordInput -> constructor')

        super(props)
        //state used to control the type of password and the icon showd when click
        this.state = { type: 'password', status: '🔐' }
    }

    render() {
        console.log('PasswordInput -> render')

        return <div className="password-input">
            <input type={this.state.type} id={this.props.id} />
            <span className="lock" onClick={() => this.setState({
                type: this.state.type === 'password' ? 'text' : 'password',
                status: this.state.status === '🔐' ? '🔓' : '🔐'
            })}>{this.state.status}</span>
        </div>
    }
}

export default PasswordInput