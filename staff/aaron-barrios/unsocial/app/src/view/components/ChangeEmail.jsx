import { PasswordInput, Form, Field, Label, Input } from '../library'

export default function ChangeEmail(props) {
    return <section className="flex justify-center items-center flex-col h-full box-border bg-[var(--back-color)]">
        <h3>Change Password</h3>

        <Form>
            <Field>
                <Label htmlFor="password">Current Email</Label>
                <Input id="password" type="email" />
            </Field>

            <Field>
                <Label htmlFor="new-email">New email</Label>
                <Input id="new-email" type="email" />
            </Field>

            <Field>
                <Label htmlFor="repeat-new-email">Repeat new email</Label>
                <Input id="repeat-new-email" type="email" />
            </Field>

            <button type="submit">Change Email</button>
        </Form>
    </section>
}