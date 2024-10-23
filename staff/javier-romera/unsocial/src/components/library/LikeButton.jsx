import './LikeButton.css'

import { Component } from 'react'

import didILike from '../../logic/didILike'

class LikeButton extends Component {
    constructor(props) {
        super(props)

        this.state = { status: '' }
    }

    render() {
        return <div><button className="LikeButton" type="button" onClick={() => {
            { didILike(this.props.post.likedBy, this.props.id) === false && this.setState({ status: '🤍' }) }
            { didILike(this.props.post.likedBy, this.props.id) === true && this.setState({ status: '❤️' }) }
        }}>❤️{this.state.status}</button>
            <span>{this.props.post.likedBy.length}</span>
        </div>
    }
}

export default LikeButton