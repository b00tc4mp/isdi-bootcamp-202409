import { Component } from 'react'

import ProfileImages from './ProfileImages'

import logic from '../../logic'

import './ProfileData.css'

export default class extends Component {
    constructor(props) {
        super(props)

        this.state = {
            view: null,
            src: "https://yt3.googleusercontent.com/mA6JoYXrjwCT1yIOUpURNkxFbA5tojJ7OBPIfGGJW_bxP6--OaRAtMLMSgOYTtqDfvV3IqvW=s900-c-k-c0x00ffffff-no-rj"
        }
    }


    handleProClick = event => {
        event.preventDefault()

        return this.setState({ view: this.state.view ? null : 'images' })
    }

    changeBurns = () => {
        this.setState({
            src: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRFbHnn7AVO9fizBYGUO79nY30cT0haNFwtFA&s'
        });
        alert('Imagen cambiada');
    }

    changeHomer = () => {
        this.setState({
            src: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTpdDFZR-vvOvs7krz_HKu5kk1VQv1Iv9_w5A&s'
        });
        alert('Imagen cambiada');
    }

    changeRalph = () => {
        this.setState({
            src: ''
        });
        alert('Imagen cambiada');
    }

    changeNed = () => {
        this.setState({
            src: 'https://static1.srcdn.com/wordpress/wp-content/uploads/2020/10/Ned-Flanders-in-The-Simpsons.jpg'
        });
        alert('Imagen cambiada');
    }

    render() {
        return <div className="ProfData">
            <h3> adios</h3 >

            <img
                className="profpic"
                src={this.state.src} />

            <a href="" className="aa" onClick={this.handleProClick}>Change</a>
            <p></p>
            <form onSubmit={event => {
                event.preventDefault()

                const { target: form } = event

                const {
                    name: { value: name },
                    email: { value: email },
                    username: { value: username },
                    password: { value: password }

                } = form

                try {
                    logic.obtainUserData(name, email, username, password)

                    form.reset()

                    this.props.onProfile()
                } catch (error) {
                    alert(error.message)

                    console.error(error)
                }

            }}>
                <label htmlFor="name">Name</label>
                <input type="text" id="name" /*placeholder={currentUser.name}*/ />
                <p></p>

                <label htmlFor="username">Username</label>
                <input type="text" id="username" /*placeholder={currentUser.username} */ />
                <p></p>

                <label htmlFor="email">E-mail</label>
                <input type="email" id="email" /*placeholder={currentUser.email}*/ />
                <p></p>

                <label htmlFor="password">Change password</label>
                <input type="password" id="password" />
                <p></p>

                <label htmlFor="passwordRepeat">Repeat Password</label>
                <input type="password" id="passwordRepeat" />
                <p></p>

                <button type="submit">Submit</button>
                <p></p>

                <a href=""
                    onClick={event => {
                        event.preventDefault()
                        this.props.home()
                    }}
                > Home </a>

                {this.state.view === 'images' && <ProfileImages imgSrc={this.state.src}
                    onChangeMoe={this.changeBurns}
                    onChangeHomer={this.changeHomer}
                    onChangeRalph={this.changeRalph}
                    onChangeNed={this.changeNed} />}

            </form>
        </div >
    }
}