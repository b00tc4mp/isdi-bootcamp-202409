import { useState } from 'react'

import Input from './Input'

export default function PasswordInput({ id }) {
    const [status, setStatus] = useState('😌')
    const [type, setType] = useState('password')

    const handleToggleClick = () => {
        setStatus(status === '😌' ? '😳' : '😌')
        setType(type === 'password' ? 'text' : 'password')
    }


    return <div className="password-input">
        <Input type={this.state.type} id={this.props.id}></Input>
        <span className="lock" onClick={this.handleToggleClick}>
            {this.state.status}
        </span>
    </div>
}