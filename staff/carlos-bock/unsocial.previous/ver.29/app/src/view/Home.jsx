import { Component } from "react"

import {Posts} from '../components/functional'

import './Home.css' 
class Home extends Component {
    constructor(props) {
        console.log('Home -> constructor')

        super(props)

        this.state = {view : 'list'}
    }
    
    render() {
        console.log('Home ->')

        return <main className="Home">
            {this.state.view === 'list' && <Posts />}
        </main>
    }
}

export default Home