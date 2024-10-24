import { Component } from 'react'

import createTodo from './logic/createTodos'
import getTodos from './logic/getTodos'
import saveTodos from './logic/saveTodos'
import TodoList from './TodoList'


class App extends Component{
  constructor(){
    super()
    
    this.state = { todos: getTodos()}
  }

  

  handleOnSubmit = (event) => {
    event.preventDefault()  

    const form = event.target;

    const {
      task: { value },
    } = form;


    try {
      createTodo(value)

      this.setState({ todos: getTodos() })
    } catch (error) {
      console.error(error.message)
    }
    form.reset()
  }

  handleOnCheckboxChange = (id) => {
    const updatedTodos = this.state.todos.map((todo) => {
      if (todo.id === id) {
        return { ...todo, isDone: !todo.isDone}
      }
    })
    saveTodos(updatedTodos)

    this.setState({ todos: getTodos() })
  }
  

  render(){

    console.log('render')
    return (
      <>
      
      <h1>TODO List</h1>
  
     <TodoList
      todos={this.state.todos}
      onCheckboxChange={this.handleOnCheckboxChange}
      />
  
      <form onSubmit={this.handleOnSubmit}>
        <label htmlFor="task">
          <input type="text" id="task"/>
        </label>
        <button type="submit">Enviar</button>
      </form>
      </>
    )
  }
}

export default App