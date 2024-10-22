import { Component } from "react"

import './PasswordInput.css'
import Input from './Input'

class PasswordInput extends Component {
    constructor(props) {
        console.log('PassInput -> Constructor')

        super(props) //this.props = props 

        //PROPIEDAD ESTADO PARA CAMBIAR EL TIPO DE TEXTO Y EL EMOJI
        this.state = { status: '😌', type: 'password' }
    }

    render() {

        return <div style={{ display: 'flex' }}>
            <Input
                type={this.state.type} id={this.props.id}
                style={{ width: '100%', boxSizing: 'border - box', paddingRight: '18px' }} />

            <span
                style={{ cursor: 'pointer', position: 'absolute', right: '10px' }}
                onClick={() => this.setState({
                    status: this.state.status === '😌' ? '😳' : '😌',
                    type: this.state.type === 'password' ? 'text' : 'password'
                })}
            >{this.state.status}
            </span>
        </div >
    }
}

export default PasswordInput