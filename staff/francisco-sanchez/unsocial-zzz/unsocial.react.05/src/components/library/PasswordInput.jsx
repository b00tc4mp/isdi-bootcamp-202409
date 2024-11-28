import { Component } from 'react'

//Clase PasswordInput, para el campo de contraseña, añade la funcionalidad de ver o esconderla. 
class PasswordInput extends Component {
    constructor(props) {
        console.log('PasswordInput -> Constructor')
        super(props)
        this.state = { status: '🫣', type: 'password' }
    }

    render() {
        console.log('Entramos en el passwordInput Render')

        return <div style={{ display: 'flex' }}>
            <input type={this.state.type} id={this.props.id} style={{ width: '100%', boxSizing: 'border-box', paddingRight: '18px' }} />
            <span
                style={{ cursor: 'pointer', position: 'absolute', right: '10px' }}
                onClick={() => this.setState({
                    status: this.state.status === '🫣' ? '🥹' : '🫣',
                    type: this.state.type === 'password' ? 'text' : 'password'
                })}
            //En este punto usando las llaves {...} insertamos javascript en el html
            >{this.state.status}</span>
        </div>

    }
}

export default PasswordInput