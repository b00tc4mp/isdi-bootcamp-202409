import { Field } from '../library'

export default function ChangeEmail(props) {
    const handleSubmit = event => {
        event.preventDefault()

        const { target: form } = event

        const {
            newNickname: { value: new_Nickname },
            repeatNickname: { value: repeat_Nickname }
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
        <h3>Change Nickname</h3>

        <form onSubmit={handleSubmit}>
            <Field>
                <label htmlFor="nickname">Current Nickname</label>
                <input id="nickname" type="text" />
            </Field>

            <Field>
                <label htmlFor="newNickname">New Nickname</label>
                <input id="newNickname" type="text" />
            </Field>

            <Field>
                <label htmlFor="repeatNickname">Repeat Nickname</label>
                <input id="repeatNickname" type="text" />
            </Field>

            <button type="submit">Change Nickname</button>
        </form>
    </section >
}