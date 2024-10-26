import '.viewProfile.css'

//import { Label, Input, Button, Field, Form, password, passwordInput } from '../components/library'

//En esta función cargaremos el perfil del usuario

export default function viewProfile(props) {
    return <main className="User profile">
        <div className="container">
            <h2>User Profile</h2>

            <a href=""
                onClick={event => {
                    event.preventDefault()
                    props.onHomeClick()
                }}>Go back</a>
        </div>
    </main>
}