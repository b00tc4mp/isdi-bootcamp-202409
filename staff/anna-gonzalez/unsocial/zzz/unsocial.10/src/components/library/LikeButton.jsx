import { Component } from 'react'

class LikeButton extends Component {
    constructor(props) {
        super(props)

        this.state = { status: '' }
    }

    render() {
        return <div><button type="button" onClick={() => {
        }}></button><span>{this.props.post.likes.length}</span>
        </div>
    }
}

export default LikeButton