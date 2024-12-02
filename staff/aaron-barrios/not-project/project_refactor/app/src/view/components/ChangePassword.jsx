import { PasswordInput, Form, Field, Label, Input } from '../library'

export default function ChangePassword(props) {
    return <section className="flex justify-center items-center flex-col h-full box-border bg-[var(--back-color)]">
        <h3>Change Password</h3>

        <Form>
            <Field>
                <Label htmlFor="password">Current Password</Label>
                <PasswordInput id="password" />
            </Field>

            <Field>
                <Label htmlFor="new-password">New Password</Label>
                <PasswordInput id="new-password" />
            </Field>

            <Field>
                <Label htmlFor="repeat-new-password">Repeat new password</Label>
                <PasswordInput id="repeat-new-password" />
            </Field>

            <button type="submit">Change Password</button>
        </Form>
    </section>
}