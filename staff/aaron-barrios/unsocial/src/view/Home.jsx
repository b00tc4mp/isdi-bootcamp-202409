import { Component } from "react"

import { PostList } from '../components/functional'

import './Home.css'


export default class extends Component {
    constructor(props) {
        console.log('Home -> constructor')

        super(props)

        this.state = { view: 'list' }
    }

    render() {

        return <main className="Home">

            {/* <a href="" className="prof"
                onClick={event => {
                    event.preventDefault()
                    this.props.profileAct()
                }}
            > Profile </a> */}


            {this.state.view === 'list' &&
                <PostList onDeleted={() => this.setState({ view: 'list' })} />}

            {this.state.view === 'profile' &&
                <ProfileData />}
        </main >
    }
}