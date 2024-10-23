import { Component } from "react"
import './Home.css'

import PostList from "../components/functional/PostList"
import CreatePost from './CreatePost'
import ProfileData from '../components/functional/ProfileData'
import Button from '../components/library/Button'


class Home extends Component {
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
export default Home