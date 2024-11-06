import { Component } from 'react'

import Input from './Input'

export default class PasswordInput extends Component {
    constructor(props) {
        // console.log('PasswordInput -> constructor')

        super(props) // this.props = props

        this.state = { status: '😌', type: 'password' }
    }

    handleToggleClick = () => this.setState({
        status: this.state.status === '😌' ? '😳' : '😌',
        type: this.state.type === 'password' ? 'text' : 'password'
    })

    render() {
        // console.log('PasswordInput -> render')

        return <div style={{ display: 'flex' }}>
            <Input type={this.state.type} id={this.props.id} />
            <span
                style={{ cursor: 'pointer', position: 'absolute', right: '10px' }}
                onClick={this.handleToggleClick}
            >{this.state.status}</span>
        </div>
    }
}