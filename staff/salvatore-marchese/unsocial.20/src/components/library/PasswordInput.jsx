import { Component } from 'react'

class PasswordInput extends Component {
    constructor(props) {
        console.log('PasswordInput -> constructor')

        super(props) // this.props = props

        this.state = { status: '🙈', type: 'password' }
    }

    render() {
        console.log('PasswordInput -> render')

        return <div style={{ display: 'flex'}}>
            <input type={this.state.type} id={this.props.id} style={{ width: '140px', boxSizing: 'border-box', marginLeft: '18px' }} />
            <span
                style={{ 
                    cursor: 'pointer', 
                    position: 'relative',
                    right: '18px',
                    top: '20%',
                    transform: 'translateY(-2%)'}}
                onClick={() => this.setState({
                    status: this.state.status === '🙈' ? '🐵' : '🙈',
                    type: this.state.type === 'password' ? 'text' : 'password'
                })}
            >{this.state.status}</span>
        </div>
    }
}

export default PasswordInput