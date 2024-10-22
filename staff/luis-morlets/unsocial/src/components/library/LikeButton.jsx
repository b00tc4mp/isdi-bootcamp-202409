import { Component } from 'react'

import likesInteraction from '../../logic/likesInteraction'

class LikeButton extends Component {
    constructor(props) {
        super(props)

        this.state = { hasLiked: false }

    }

    handleLike = () => {

        const { postData, loggedInUserId } = this.props

        if (!this.state.hasLiked) {
            this.setState({ hasLiked: true })
            likesInteraction(loggedInUserId)
            postData.likedBy.push(loggedInUserId)
        } else {
            this.setState({ hasLiked: false })
            postData.likedBy = postData.likedBy.filter(id => id !== loggedInUserId)
        }
    }

    render() {
        const { likedBy } = this.props.postData
        const likeCount = likedBy ? likedBy.length : 0

        return (
            <div>
                <button onClick={this.handleLike}>
                    {this.state.hasLiked ? '❤️' : '🤍'}
                </button>
                <span>
                    {likeCount}
                </span>
            </div>
        )
    }
}

export default LikeButton