import { Component } from 'react'

import { PostList } from '../components/functional'

import './Home.css'

class Home extends Component { //-----------Home-----------
    constructor(props) {
        console.log('Home -> constructor')

        super(props)

        this.state = { view: 'list' }
    }

    render() {
        return <main className="Home">
            {this.state.view === 'list' && <PostList onDeleted={() => this.setState({ view: 'list' })} />}
        </main>
    }
}

export default Home