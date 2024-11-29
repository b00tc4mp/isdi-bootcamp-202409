import { Component } from 'react'

import { PostList } from '../components/functional'

import './Home.css'



export default class extends Component {
    constructor(props) {
        console.log('Home -> constructor')

        super(props)

        let name

        this.state = { view: 'list' }

    }

    render() {
        console.log('Home -> render')

        return <main className="Home">
            {this.state.view === 'list' && <PostList/>}     
        </main>
    }
}