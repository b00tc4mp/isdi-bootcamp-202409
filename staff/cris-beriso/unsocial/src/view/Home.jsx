import { Component } from 'react'

import PostList from '../components/functional/PostList'

import './Home.css'

class Home extends Component {
  constructor(props) {
    console.log('Home -> constructor')

    super(props)

    this.state = { view: 'list' }
  }

  render() {
    console.log('Home -> render')

    return <main className="Home">
      {this.state.view === 'list' && <PostList className="PostList" />}
    </main>
  }
}

export default Home