import { Field } from '../library'

export default function ChangeEmail(props) {
    const handleSubmit = event => {
        event.preventDefault()

        const { target: form } = event

        const {
            newPassword: { value: new_password },
            repeatPassword: { value: repeat_password }
        } = form

        try {
            //cambiar logica
            logic.registerUser(name, nickname, password, passwordRepeat)
                .then(() => {
                    form.reset()

                    // props.onRegistered()
                })
                .catch(error => {
                    if (error instanceof SystemError)
                        alert('Casi, crack')
                    else
                        alert(error.message)
                    console.error(error)
                })
        } catch (error) {
            alert(error.message)

            console.error(error)
        }
    }

    return <section className=" flex justify-center items-center flex-col h-full box-border bg-[var(--back - color)]" >
        <h3>Change Password</h3>

        <form onSubmit={handleSubmit}>
            <Field>
                <label htmlFor="password">Current Password</label>
                <input id="password" type="password" />
            </Field>

            <Field>
                <label htmlFor="newPassword">New Password</label>
                <input id="newPassword" type="password" />
            </Field>

            <Field>
                <label htmlFor="repeatPassword">Repeat Password</label>
                <input id="repeatPassword" type="password" />
            </Field>

            <button type="submit">Change password</button>
        </form>
    </section >
}