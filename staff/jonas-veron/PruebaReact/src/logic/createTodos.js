import uuid from '../data/uuid'

import getTodos from './getTodos'
import saveTodos from './saveTodos'

const createTodo = (todo) => {
    if(typeof todo !== 'string') throw new Error('The todo must be a text!')

        const todos = getTodos()

        const newTodo = {
            id: uuid(),
            todo: todo,
            // date: newDate().toDateString(),
            isDone: false
        }

        todos.push(newTodo)
        saveTodos(todos)
}

export default createTodo