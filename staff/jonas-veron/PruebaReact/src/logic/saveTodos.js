const saveTodos = (todos) => {
    localStorage.todos = JSON.stringify(todos)
}

export default saveTodos