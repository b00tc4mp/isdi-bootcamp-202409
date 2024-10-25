import { Component } from 'react'

import Input from './Input'

export default class extends Component {
    constructor(props) {
        super(props)

        this.state = { type: 'password', status: '🔐' }
    }

    handleToggleClick = () => this.setState({
        status: this.state.status === '😌' ? '😳' : '😌',
        type: this.state.type === 'password' ? 'text' : 'password'
    })

    render() {
        return <div className="password-input">
            <Input type={this.state.type} id={this.props.id}></Input>
            <span className="lock" onClick={this.handleToggleClick}>
                {this.state.status}
            </span>
        </div>
    }
}