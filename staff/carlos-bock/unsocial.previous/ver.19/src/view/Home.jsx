import { Component } from "react"

import getUserName from '../logic/getUserName'
import PostList from '../components/functional/PostList'
import CreatePost from '../components/functional/CreatePost'

class Home extends Component {
    constructor(props) {
        console.log('Home -> constructor')

        super(props)

        let name
        
        try {
            name = getUserName(sessionStorage.loggedInUserID)
        } catch (error) {
            alert(error.message)

            console.error(error)
        }

        this.state = {name: name, view : 'list'}
    }
    
    render() {
        console.log('Home ->')

        return <section>
        <h2>Home</h2>

        <h3>Hello, {this.state.name}</h3>
        <button type="button" onClick= {()=> {
            delete sessionStorage.loggedInUserID
            
            this.props.onLoggedOut()
        }}>Logout</button>
        <button type="button" onClick={() => this.setState({view:'new'})}>🎉</button>
       
        {this.state.view === 'list' && <PostList />}
        {this.state.view === 'new' && <CreatePost  onCreated= {() => this.setState({view : 'list'})} />}
    </section> 
    }
}

export default Home