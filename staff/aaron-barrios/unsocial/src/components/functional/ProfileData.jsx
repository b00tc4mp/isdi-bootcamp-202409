import getUser from "../../logic/getUser"

import './ProfileData.css'

export default (props) => {

    let currentUser

    currentUser = getUser(sessionStorage.userId)

    const handleProClick = event => {
        event.preventDefault()


    }

    return <div className="ProfData">
        <h3>{currentUser.name}</h3>


        <img
            className="profpic"
            src="https://yt3.googleusercontent.com/mA6JoYXrjwCT1yIOUpURNkxFbA5tojJ7OBPIfGGJW_bxP6--OaRAtMLMSgOYTtqDfvV3IqvW=s900-c-k-c0x00ffffff-no-rj" />

        <a href="" className="aa" onClick={handleProClick}>Change</a>
        <form onSubmit={event => {
            event.preventDefault()

            const { target: form } = event

            const {
                name: { value: name },
            } = form

            try {

                const users = JSON.parse(localStorage.users)

                let user = users.find(user => user.name === name)

                if (user !== undefined) {
                    if (user.username === username)
                        throw new Error('Username already exists')
                }

                user = { name: name }

                currentUser.name = user.name

                //find loggedinUserId

                localStorage.users = JSON.stringify(users)

                alert('Changed data')

                props.home()
            } catch (error) {

                alert(error.message)

                console.error(error)
            }

        }}>
            <label htmlFor="name">Name</label>
            <input type="text" id="name" placeholder={currentUser.name} />
            <p></p>

            <label htmlFor="username">Username</label>
            <input type="text" id="username" placeholder={currentUser.username} />
            <p></p>

            <label htmlFor="email">E-mail</label>
            <input type="email" id="email" placeholder={currentUser.email} />
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
                    props.home()
                }}
            > Home </a>
        </form>
    </div>
}