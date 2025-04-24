import { Component } from 'react'

import Input from './Input'

export default class extends Component {
    constructor(props) {
        // console.log('PasswordInput -> constructor')

        super(props) // this.props = props

        this.state = { status: 'show', type: 'password' }
    }

    handleToggleClick = () => this.setState({
        status: this.state.status === 'show' ? 'hide' : 'show',
        type: this.state.type === 'password' ? 'text' : 'password'
    })

    render() {
        // console.log('PasswordInput -> render')

        return <div style={{ display: 'flex' }}>
            <Input type={this.state.type} id={this.props.id} placeholder="Password" border-right="0px solid transparent"/>
            <span className="showpass"
                style={{ cursor: 'pointer'/* , position: 'absolute', right: '10px' */ }}
                onClick={this.handleToggleClick}
            >{this.state.status}</span>
            
        </div>
    }
}