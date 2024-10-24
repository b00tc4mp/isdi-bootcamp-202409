const TodoList = ({ todos, onCheckboxChange }) => {
    return (
      <ul>
        {todos.length > 0 &&
          todos.map((todo) => (
            <li>
              <input
                type="checkbox"
                checked={todo.isDone}
                onChange={() => onCheckboxChange(todo.id)}
              />
              {todo.todo}
            </li>
          ))}
      </ul>
    );
  };
  
  export default TodoList;