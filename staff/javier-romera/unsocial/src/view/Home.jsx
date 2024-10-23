import './Home.css'

import { Component } from 'react'

import { PostList } from '../components/functional'

class Home extends Component {
    constructor(props) {
        super(props)

        this.state = { view: 'list' }
    }
    render() {
        return <main className="Home">
            {this.state.view === 'list' && <PostList />}
        </main>
    }
}

export default Home