import { Component } from 'react'

class PasswordInput extends Component {
    constructor(props) {
        console.log('PasswordInput -> constructor') // xivato per a veure què es munta

        super(props) // this.props = props

        this.state = { status: '👻', type: 'password' }
    }

    render() {
        console.log('PasswordInput -> render')

        return <div style={{ display: 'flex' }}>
            <input type={this.state.type} id={this.props.id} style={{ width: '100%', boxSizing: 'border-box', paddingRight: '18px' }} />
            <span
                style={{ cursor: 'pointer' }}
                onClick={() => this.setState({
                    status: this.state.status === '👻' ? '💀' : '👻',
                    type: this.state.type === 'password' ? 'text' : 'password'
                })}
            >{this.state.status}</span>
        </div>
    }
}

export default PasswordInput