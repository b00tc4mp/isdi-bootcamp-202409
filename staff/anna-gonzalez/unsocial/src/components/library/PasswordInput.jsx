import { Component } from 'react'

import Input from './Input'

class PasswordInput extends Component {
    constructor(props) {
        console.log('PasswordInput -> constructor')

        super(props)

        this.state = { type: 'password', status: '🔐' }
    }

    render() {
        console.log('PasswordInput -> render')

        return <div>
            <Input className="password-repeat-input" type={this.state.type} id={this.props.id} />
            <span className="span" onClick={() => this.setState({
                type: this.state.type === 'password' ? 'text' : 'password',
                status: this.state.status === '🔐' ? '🔓' : '🔐'
            })}>{this.state.status}</span>
        </div>
    }
}

export default PasswordInput