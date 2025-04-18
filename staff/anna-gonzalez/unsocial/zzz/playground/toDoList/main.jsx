//seleccionamos el elemento del DOM con el id "root" donde se montará la app
const rootElement = document.getElementById('root')
//creamos un punto de entrada de React usando ReactDOM.createRoot
const root = ReactDOM.createRoot(rootElement)

//importamos Component desde React para poder usar clases que extiendan Component
const { Component } = React

//definimos el componente Home que es responsable de agregar tareas
class Home extends Component {
    constructor(props) {
        super(props)
        //inicializamos el estado local con una propiedad taskText vacía
        this.state = { taskText: '' }
    }

    render() {
        return (
            <form onSubmit={event => {
                event.preventDefault()

                //obtenemos el valor del input de texto
                const taskText = event.target.taskText.value

                if (taskText === '') {
                    alert('Please, add a task')
                    return
                }

                //llamamos a la función addTask que viene desde los props, para agregar la tarea
                this.props.addTask(taskText)

                event.target.reset()
            }}>
                <input type="text" id="taskText" placeholder="Add a new task" />
                <button type="submit">+</button>
            </form>
        )
    }
}

//Componente TasksList que recibe la lista de tareas y las muestra
function TasksList(props) {
    return (
        <div className="tasks-container">
            <ul>
                {/*mapeamos el array de tareas (props.tasks) para crear un <li> por cada tarea*/}
                {(props.tasks.map((task) => (
                    //mostramos cada tarea en un <li> y asignamos un key único para React
                    <li>{task}<button className="delete-button" onClick={event => {
                        event.preventDefault()
                        const tasks = JSON.parse(localStorage.tasks)
                        tasks.push(task)
                        localStorage.tasks = JSON.stringify(tasks)
                    }}>❌</button></li>
                ))).toReversed()}
            </ul>
        </div>
    )
}

//Componente principal (App) que contiene todo el estado y la lógica de la app
class App extends Component {
    constructor(props) {
        super(props)
        //inicializamos el estado con un array vacío para las tareas
        this.state = { tasks: [] }
    }

    //método que añade una nueva tarea al array de tareas
    addTask = (taskText) => {
        //usamos setState para actualizar el estado con la nueva tarea
        this.setState((prevState) => ({
            tasks: [...prevState.tasks, taskText] //añadimos la nueva tarea a la lista existente
        }))
    }

    render() {
        return (
            <div className="app-container">
                <h1>to do list</h1>
                {/*renderizamos el componente Home, pasando la función addTask como prop */}
                <Home addTask={this.addTask} />
                {/*renderizamos el componente TasksList, pasando la lista de tareas como prop */}
                <TasksList tasks={this.state.tasks} />
            </div>
        )
    }
}

//montamos el componente <App /> en el elemento root del DOM
root.render(<App />)