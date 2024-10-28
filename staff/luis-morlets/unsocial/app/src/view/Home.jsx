import { Component } from 'react'

import PostList from '../components/functional/PostList'

import './Home.css'

export default class extends Component {
    constructor(props) {
        super(props)

        console.log('Home -> constructor')

        this.state = { view: 'list' }
    }
    render() {

        console.log('Home -> render')
        return <main className="Home">

            {this.state.view === 'list' && <PostList />}
        </main>
    }
}