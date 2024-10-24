import { Component } from 'react'
import Input from './Input'

class PasswordInput extends Component {
    constructor(props) {
        super(props)

        this.state = { status: 'https://icons.veryicon.com/png/o/miscellaneous/computer-room-integration/show-password-3.png', type: 'password' }
    }

    render() {

        return <div>
            <Input type={this.state.type} id={this.props.id} required={true} style={{ paddingRight: '30px' }} />
            <img className="icon" src={this.state.status}
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