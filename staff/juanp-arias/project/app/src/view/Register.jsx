import { errors } from 'com'

const { SystemError } = errors

import logic from '../logic'

export default function Register(props) {

    return <main>
        <form onSubmit={handleSubmit}>
            <label htmlFor="">Name</label>
            <input type="text" />

            <label htmlFor="">E-mail</label>
            <input type="email" />

            <label htmlFor="">Birthdate</label>
            <input type="date" />

            <label htmlFor="">Password</label>
            <input type="password" />

            <label htmlFor="">Repeat your password</label>
            <input type="password" />
        </form>
    </main>
}