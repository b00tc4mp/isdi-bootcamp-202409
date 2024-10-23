const loggedInUser = null

const rootElement = document.getElementById('root')
const root = ReactDOM.createRoot(rootElement)

const title = React.createElement('h1', {} , 'UNSOCIAL')
const loginTitle = React.createElement('h2', {}, 'LOGIN' )

const usernameLabel = React.createElement('label', {innerText: 'Username', htmlFor: 'username'}, 'Username')
const usernameInput = React.createElement('input', {type: 'text', id: 'username'})

const passwordLabel = React.createElement('label', {innerText: 'Password', htmlFor: 'password'}, 'Password')
const passwordInput = React.createElement('input', {type: 'Password', id: 'password'})

const loginButton = React.createElement('button', {type: 'submit'}, 'Login')



const form = React.createElement('form', {
    onSubmit: event => {
        event.preventDefault()
        throw alert('Should go to Home section')

    }
}, [usernameLabel, usernameInput, passwordLabel, passwordInput, loginButton])


root.render([
    title,
    loginTitle,
    form,
])