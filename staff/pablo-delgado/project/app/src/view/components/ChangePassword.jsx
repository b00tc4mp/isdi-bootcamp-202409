import { PasswordInput, Button, Form, Field, Label } from '../library'

export default function ChangePassword(props) {
    
    return <section className="flex justify-center items-center flex-col h-full box-border bg-[var(--back-color)]">
    <h3>Change Password</h3>

    <Form>
        <Field>
            <Label htmlFor="password">Current Password</Label>
            <PasswordInput id="password" />
        </Field>

        <Field>
            <Label htmlFor="new-password">New password</Label>
            <PasswordInput id="new password" />
        </Field>

        <Field>
            <Label htmlFor="new-password-repeat">Repeat new password</Label>
            <PasswordInput id="new-password-repeat" />
        </Field>

        <Button type="submit">Change password</Button>
    </Form>
    </section>
}