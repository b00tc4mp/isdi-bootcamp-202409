import { Component } from 'react'

export default class extends Component {
    constructor(props) {
        super(props)

        this.state = { type: 'password', status: '🔐' }
    }

    render() {
        return <div className="password-input">
            <input type={this.state.type} id={this.props.id}></input>
            <span className="lock"
                onClick={() => this.setState({
                    type: this.state.type === 'password' ? 'text' : 'password',
                    status: this.state.status === '🔐' ? '🔓' : '🔐'
                })}>
                {this.state.status}
            </span>
        </div>
    }
}