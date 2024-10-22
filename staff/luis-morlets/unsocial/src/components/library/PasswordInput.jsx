import { Component } from 'react'

class PasswordInput extends Component {
    constructor(props) {
        super(props)

        this.state = { status: 'https://icons.veryicon.com/png/o/miscellaneous/computer-room-integration/show-password-3.png', type: 'password' }
    }

    render() {

        return <div style={{ display: 'flex' }}>
            <input type={this.state.type} id={this.props.id} required={true} style={{ width: '100%', boxSizing: 'border-box', paddingRight: '30px' }} />
            <img src={this.state.status}
                style={{ cursor: 'pointer', position: 'absolute', width: '20px', right: '55px', }}
                onClick={() => this.setState({
                    status: this.state.status === 'https://icons.veryicon.com/png/o/miscellaneous/computer-room-integration/show-password-3.png'
                        ? 'https://icons.veryicon.com/png/o/miscellaneous/computer-room-integration/hide-password.png'
                        : 'https://icons.veryicon.com/png/o/miscellaneous/computer-room-integration/show-password-3.png',
                    type: this.state.type === 'password'
                        ? 'text'
                        : 'password'
                })}
            />
        </div>
    }
}

export default PasswordInput