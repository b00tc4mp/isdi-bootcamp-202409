import { Component } from 'react'

import Input from './Input'

class PasswordInput extends Component {
    constructor(props) {
        console.log('PasswordInput -> constructor')

        super(props) // this.props = props

        this.state = {status:'🙈', type: 'password'}
    }

    render() {
        console.log('PasswordInput -> render')

        return <div style = {{display: 'flex' }}>
            <Input type={this.state.type} id={this.props.id}/>
            <span
                style={{ cursor: 'pointer', position: 'absolute', right: '25px', marginTop: '8px'}}
                onClick={() => this.setState( {
                    status: this.state.status === '🙈' ? '😏' : '🙈',
                    type: this.state.type === 'password' ? 'text' : 'password'
                })}
            >{this.state.status}</span>
        </div>
    }
}

export default PasswordInput