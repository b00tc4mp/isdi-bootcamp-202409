import { Component } from "react"

import './PasswordInput.css'
import Input from './Input'


export default class extends Component {
    constructor(props) {
        console.log('PassInput -> Constructor')

        super(props) //this.props = props 

        //PROPIEDAD ESTADO PARA CAMBIAR EL TIPO DE TEXTO Y EL EMOJI
        this.state = { status: '😌', type: 'password' }
    }

    handleToggleClick = () => this.setState({

        status: this.state.status === '😌' ? '😳' : '😌',
        type: this.state.type === 'password' ? 'text' : 'password'
    })

    render() {

        return <div className="test" style={{ display: 'flex' }}>
            <Input
                type={this.state.type} id={this.props.id} />

            <span className="spaan"
                style={{}}
                onClick={this.handleToggleClick}
            >{this.state.status}
            </span>
        </div >
    }
}
