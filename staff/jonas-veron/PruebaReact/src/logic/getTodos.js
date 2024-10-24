const getTodos = () => {
    const todos = localStorage.todos ? JSON.parse(localStorage.todos) : []

    return todos
}

export default getTodos