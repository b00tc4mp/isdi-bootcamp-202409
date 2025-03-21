import { Component } from 'react'

import { Posts } from '../components/functional'

import './Home.css'

export default class extends Component {
    constructor(props) {
        console.log('Home -> constructor')

        super(props)

        this.state = { view: 'list' }
    }

    render() {
        console.log('Home -> render')

        return <main className="Home">

            {this.state.view === 'list' && <Posts />}
        </main>
    }
}