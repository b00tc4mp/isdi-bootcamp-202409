import {Component} from 'react'


import { library } from '@fortawesome/fontawesome-svg-core'
import { fas } from '@fortawesome/free-solid-svg-icons'
import { far } from '@fortawesome/free-regular-svg-icons'

// import { faHeart} from '@fortawesome/free-regular-svg-icons'
import { faHeart} from '@fortawesome/free-solid-svg-icons'

library.add(fas,far,faHeart)

import Login from './views/Login'
import Register from './views/Register'
import Home from './views/Home'
import loadUsers from './data/users'
import loadPosts from './data/posts'
import Header from './components/functional/Header';


class App extends Component {
  constructor(props) {
      super(props)
      //cargar usuarios
       loadUsers() 
       //posts de prueba
        loadPosts()
      this.state = { view: 'login' }
  }

  render() {
      return <div>

         <Header />

          {/* al ejecutarse cambia la vista a home */}
          {this.state.view === 'login' && <Login 
          onLoggedIn={() => this.setState({ view: 'home' })}
          onRegisterClick={() => this.setState({view: 'register' })} />}

          {this.state.view === 'register' && <Register 
          toLogin={() => this.setState({view: 'login' })} 
          toRegistered={() => this.setState.apply({view: 'login' })}
          />}

          {this.state.view === 'home' && <Home onLoggedOut={() => this.setState({ view: 'login' })} />}
      </div>
  }
}



export default App
