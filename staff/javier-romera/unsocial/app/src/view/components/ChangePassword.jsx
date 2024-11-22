import { Input, Button, Form, Field, Label } from '../library'

export default function ChangePassword(props) {
    return <section className="flex justify-center items-center flex-col h-full box-border bg-[var(--back-color)]">
        <h3>Change Password</h3>

        <Form>
            <Field>
                <Label htmlFor="password">Current e-mail</Label>
                <Input id="password" type="password" />
            </Field>

            <Field>
                <Label htmlFor="new-password">Current e-mail</Label>
                <Input id="new-password" type="password" />
            </Field>

            <Field>
                <Label htmlFor="new-password-repeat">Current e-mail</Label>
                <Input id="new-password-repeat" type="password" />
            </Field>

            <Button type="submit">Change Password</Button>
        </Form>
    </section>
}