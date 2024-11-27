import { Component } from "react";

class LikeButton extends Component {
    constructor(props) {
        super(props)
        this.state = {
            likes: this.props.postData.likes || 0,
            hasLiked: false
        }
    }
    handleLike = () => {
        const { postData, loggedInUserId } = this.props;


        if (!this.state.hasLiked) {

            this.setState({
                likes: this.state.likes + 1,
                hasLiked: true
            })
            postData.likeBy = loggedInUserId
            postData.like = this.state.likes + 1
        } else {

            this.setState({
                likes: this.state.likes - 1,
                hasLiked: false
            })
            delete postData.likeBy
            postData.likes = this.state.likes - 1
        }
    }

    render() {
        return (
            <div className="likeButton">
                <button onClick={this.handleLike}>{this.state.hasLiked ? '👎' : '👍'}</button>
                <span>{this.state.likes}</span>
            </div>
        );
    }

}

export default LikeButton