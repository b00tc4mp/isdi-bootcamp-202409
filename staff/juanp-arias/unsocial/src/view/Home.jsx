import { Component } from "react"

import { PostList } from '../components/function'

import './Home.css'

class Home extends Component {
    constructor(props) {
        super(props)

        this.state = { view: 'list' }
    }

    render() {
        console.log('Home -> render')

        return <main className="Home">
            {this.state.view === 'list' && <PostList />}
        </main>
    }
}
export default Home