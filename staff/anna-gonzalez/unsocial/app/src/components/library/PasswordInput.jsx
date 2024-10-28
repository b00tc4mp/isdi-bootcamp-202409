import { Component } from 'react'

import Input from './Input'

import './PasswordInput.css'

export default class extends Component {
    constructor(props) {
        //console.log('PasswordInput -> constructor')

        super(props)

        this.state = { type: 'password', status: '🔐' }
    }

    handleToggleClick = () => this.setState({
        type: this.state.type === 'password' ? 'text' : 'password',
        status: this.state.status === '🔐' ? '🔓' : '🔐'
    })

    render() {
        //console.log('PasswordInput -> render')

        return <div className="password-input">
            <Input type={this.state.type} id={this.props.id} />
            <span className="password-toggle"
                onClick={this.handleToggleClick}
            >{this.state.status}</span>
        </div>
    }
}