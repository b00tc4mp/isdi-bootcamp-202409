import { Field } from '../library'

export default function ChangeEmail(props) {
    const handleSubmit = event => {
        event.preventDefault()

        const { target: form } = event

        const {
            newName: { value: new_Name },
            repeatName: { value: repeat_Name }
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
        <h3>Change Name</h3>

        <form onSubmit={handleSubmit}>
            <Field>
                <label htmlFor="name">Current Name</label>
                <input id="name" type="text" />
            </Field>

            <Field>
                <label htmlFor="newName">New Name</label>
                <input id="newName" type="text" />
            </Field>

            <Field>
                <label htmlFor="repeatName">Repeat Name</label>
                <input id="repeatName" type="text" />
            </Field>

            <button type="submit">Change Name</button>
        </form>
    </section >
}