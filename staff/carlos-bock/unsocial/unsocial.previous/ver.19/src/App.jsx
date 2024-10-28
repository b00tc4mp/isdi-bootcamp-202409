import { Component } from 'react'

import Login from './view/Login'
import Register from './view/Register'
import Home from './view/Home'

import Header from './components/functional/Header'
import Footer from './components/functional/Footer'


class App extends Component {
  constructor(props) {
    console.log('App -> constructor')

    super(props)

    this.state = {view: 'login'}
  }

  render() {
    console.log('App -> render')
    //removed div wrapper from return and left and empty wrapper
    return <>
      <Header/>

      {this.state.view === 'login' && <Login
        onLoggedIn={() => this.setState({view:'home'})}
        onRegisterClick={() => this.setState({view: 'register'})}
      />} 
      {this.state.view === 'register' && <Register
        onLoginClick={() => this.setState({view:'login'})}  
        onRegistered={() => this.setState({view:'login'})}
      />}
      {this.state.view === 'home' && <Home onLoggedOut={() => this.setState({ view:'login'})} />}
      <Footer/>
    </>
  }
}

export default App

//////////////////



/*
import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <div>
        <a href="https://vitejs.dev" target="_blank">
          <img src={viteLogo} className="logo" alt="Vite logo" />
        </a>
        <a href="https://react.dev" target="_blank">
          <img src={reactLogo} className="logo react" alt="React logo" />
        </a>
      </div>
      <h1>Vite + React</h1>
      <div className="card">
        <button onClick={() => setCount((count) => count + 1)}>
          count is {count}
        </button>
        <p>
          Edit <code>src/App.jsx</code> and save to test HMR
        </p>
      </div>
      <p className="read-the-docs">
        Click on the Vite and React logos to learn more
      </p>
    </>
  )
}

export default App
*/
