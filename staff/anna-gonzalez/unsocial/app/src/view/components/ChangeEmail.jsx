import { Input, Button, Form, Field, Label } from '../library'

export default function ChangeEmail(props) {
    return <section className="flex justify-center items-center flex-col h-full box-boder bg-[var(--back-color)]">
        <h3>Change email</h3>

        <Form>
            <Field>
                <Label htmlFor="email">Current email</Label>
                <Input id="email" type="email" />
            </Field>

            <Field>
                <Label htmlFor="new-email">New email</Label>
                <Input id="new-email" type="email" />
            </Field>

            <Field>
                <Label htmlFor="new-email-repeat">Repeat new email</Label>
                <Input id="new-email-repeat" type="email" />
            </Field>

            <Button type="submit">Change email</Button>
        </Form>
    </section>
}