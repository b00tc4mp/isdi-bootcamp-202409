import { Component } from 'react'

import Input from './Input'
import './PasswordInput.css'

class PasswordInput extends Component {
    constructor(props) {
        console.log('PasswordInput -> constructor') // xivato per a veure què es munta
        super(props) // this.props = props
        this.state = { status: '👻', type: 'password' }
    }

    render() {
        console.log('PasswordInput -> render')

        return <div className="password-input">
            <Input type={this.state.type} id={this.props.id} />
            <span className="password-toggle"
                onClick={() => this.setState({
                    status: this.state.status === '👻' ? '💀' : '👻',
                    type: this.state.type === 'password' ? 'text' : 'password'
                })}
            >{this.state.status}</span>
        </div>
    }
}

export default PasswordInput