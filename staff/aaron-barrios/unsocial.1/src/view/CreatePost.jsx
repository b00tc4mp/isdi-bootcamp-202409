import logic from '../logic'

import { PasswordInput, Input, Button, Form, Label } from '../components/library'


export default ({ onCreated }) => {
    const handleSubmit = event => {
        event.preventDefault()

        //CAPTURO LOS VALORES DEL NUEVO POST (FORMULARIO)
        //LOS NOMBRES QUE CAPTURAS ES IMPORTANTE QUE COINCIDAN CON EL ID DEL INPUT
        const { target: form } = event

        const {
            text: { value: text },
            image: { value: image }
        } = form

        try {

            //LLAMO A LA FUNCION REGISTER USER CON LOS PARAMETROS CAPTURADOS
            logic.createPost(text, image)

            //LE PASO LA FUNCIÓN "registered" DEL PARAMERTRO PROPS PARA DECIRLE A APP QUE ME HE LOGGEADO
            onCreated()

        } catch (error) {
            alert(error.message)

            console.error(error)
        }
    }

    return <main>
        <h3>New Post</h3>
        <Form onSubmit={handleSubmit}>

            <Label htmlFor="text">Post Title</Label>
            <Input type="text" id="text" />

            <Label htmlFor="image">Image Link</Label>
            <Input type="text" id="image" />

            <Button type="submit">Create Post</Button>
        </Form>
    </main>
}