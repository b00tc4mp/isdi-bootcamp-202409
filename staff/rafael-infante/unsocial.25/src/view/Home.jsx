import { Component } from "react"
import './Home.css'

import { Posts } from "../components/functional"

class Home extends Component {
  constructor(props) {
    super(props)

    this.state = { view: 'list' }

  }

  render() {
    return (
      <main className="Home">

        {this.state.view === 'list' && <Posts />}

      </main>
    )
  }
}

export default Home