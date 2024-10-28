import { Component } from 'react'

import Button from '../library/Button'

export default class extends Component {
    constructor(props) {
        super(props)

        this.state = { status: '🤍', like: 0 }
    }

    render() {
        return <div><Button type="button" className="like-button" onClick={() => {
            this.setState({
                status: this.state.status === '🤍' ? '❤️' : '🤍',
                like: this.state.like === 0 ? 1 : 0
            })
        }}>{this.state.status}</Button><span>{this.state.like}</span>
        </div>
    }
}