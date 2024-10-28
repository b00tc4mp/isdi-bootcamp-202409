import { Component } from 'react'

import Input from './Input'

import './PasswordInput.css'

export default class extends Component {

    constructor(props) {
        console.log('PasswordInput -> constructor')

        super(props) // this.props = props

        this.state = { status: '😌', type: 'password' }
    }

    render() {
        console.log('PasswordInput -> render')

        return <div className='passwordInput'>
            <Input type={this.state.type} id={this.props.id} />
            <span className='carita'
                onClick={() => this.setState({
                    status: this.state.status === '😌' ? '😳' : '😌',
                    type: this.state.type === 'password' ? 'text' : 'password'
                })}
            >{this.state.status}</span>
        </div>
    }
}

