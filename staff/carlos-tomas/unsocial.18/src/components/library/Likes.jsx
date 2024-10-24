import { Component } from 'react';
import like from "../../logic/like";

class LikeUser extends Component {
    constructor(props) {
        super(props)

        this.state = { status: '💗' }
    }

    render() {

        return <div>
            <button type="button"
                style={{ cursor: 'pointer' }}
                onClick={() => this.setState(
                    {
                        status: this.state.status === '💗' ? '😍' : '💗',
                    })}
            >{this.state.status}</button>
        </div>

    }
}

export default LikeUser