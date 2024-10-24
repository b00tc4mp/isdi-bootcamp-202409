import { Component } from 'react'

import Input from './Input'
import './PasswordInput.css'

class PasswordInput extends Component{
    constructor(props) {
        super(props) //this.props = props

        this.state = { status: '😊', type: 'password'}
    }
    
    render() {
        return <div className="PasswordInput">
            <Input type={this.state.type} id={this.props.id}/>

            <span
                style={{ cursor: 'pointer', position: 'relative', right: '30px', fontSize: '16px'}}
                onClick={() => this.setState({
                    status: this.state.status === '😊' ? '😃' : '😊',
                    type: this.state.type === 'password' ? 'text' : 'password'
                })}>
                {this.state.status}{/* lo que se muestra en el span */}
            </span>
        </div>
    }
}

export default PasswordInput