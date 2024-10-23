import { Component } from 'react'

class PasswordInput extends Component {
    constructor(props) {
        console.log('PasswordInput -> constructor') // chivato para ver como construye la password input

        super(props) // es igual que this.props = props
        this.state = { status: '😊', type: 'password' }
    }
    render() {

        return <div>
            <input type={this.state.type} id={this.props.id} />
            <span className="emoji"
                style={{ cursor: 'pointer', position: 'absolute', right: '10px' }}
                onClick={() => this.setState({
                    status: this.state.status === '😊' ? '🫥' : '😊',
                    type: this.state.type === 'password' ? 'text' : 'password'
                })}
            >{this.state.status}</span>
        </div>
    }
}
export default PasswordInput