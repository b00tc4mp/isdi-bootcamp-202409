import { Anchor, Button, Field, Form, Input, Label } from './library'

export default function PartnerAccess(props) {
    const handleLoginClick = event => {
        event.preventDefault()

        props.onLoginClick()
    }

    const handleRegisterClick = event => {
        event.preventDefault()

        props.onRegisterClick()
    }

    return <main>
        <h2>Partner access</h2>

        <Form>

            <Field>
                <Label htmlFor="secret-code">Secret code</Label>
                <Input type="password" id="secret-code" />
            </Field>

            <Button type="submit">Access</Button>
        </Form>

        <Anchor href="" onClick={handleLoginClick}>Login instead</Anchor>
        <Anchor href="" onClick={handleRegisterClick}>Register instead</Anchor>
    </main>
}