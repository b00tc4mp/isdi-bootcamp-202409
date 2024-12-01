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

    return <main className="justify-self-center">
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

        <div className="flex flex-row fixed top-full left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-[-1]">
            <div className="w-40 h-40 bg-[var(--orange-color)] rounded-full"></div>
            <div className="w-40 h-40 bg-[var(--orange-color)] rounded-full"></div>
            <div className="w-40 h-40 bg-[var(--orange-color)] rounded-full"></div>
        </div>
    </main>
}