import { Component } from 'react'

class LikeButton extends Component {
    constructor(props) {
        super(props)

        this.state = { status: '🤍', like: 0 }
    }

    render() {
        return <div><button type="button" className="like-button" onClick={() => {
            this.setState({
                status: this.state.status === '🤍' ? '❤️' : '🤍',
                like: this.state.like === 0 ? 1 : 0
            })
        }}>{this.state.status}</button><span>{this.state.like}</span>
        </div>
    }
}

export default LikeButton