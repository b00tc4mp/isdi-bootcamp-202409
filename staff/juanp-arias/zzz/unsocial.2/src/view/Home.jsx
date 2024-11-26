import { Component } from "react"

import { PostList } from '../components/function'

import './Home.css'

export default class extends Component {
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
