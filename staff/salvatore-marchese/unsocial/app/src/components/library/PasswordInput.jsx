import { Component } from 'react'

import Input from './Input'

import './PasswordInput.css'

export default class extends Component {
    constructor(props) {
        //console.log('PasswordInput -> constructor')

        super(props) // this.props = props

        this.state = { status: '😌', type: 'password' }
    }

    handleToggleClick = () => this.setState({
        status: this.state.status === '😌' ? '😳' : '😌',
        type: this.state.type === 'password' ? 'text' : 'password'
    })

    render() {
        //console.log('PasswordInput -> render')
        return (
            <div style={{ display: 'flex', position: "relative", backgroundColor: "white" }}>
                <div style={{ flexGrow: 1 }}>
                    <Input type={this.state.type} id={this.props.id} />
                </div>

                <div className='emoji-container' onClick={this.handleToggleClick}>
                    {this.state.status}
                </div>
            </div>
        )
    }
}
//position: 'absolute', right: '10px',