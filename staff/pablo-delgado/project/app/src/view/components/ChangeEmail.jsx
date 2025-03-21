import { Input, Button, Form, Field, Label } from '../library'

export default function ChangeEmail(props) {

    return <section className="flex justify-center items-center flex-col h-full box-border bg-[var(--back-color)]">
        <h3>Change E-mail</h3>

        <Form>
            <Field>
                <Label htmlFor="email">Current e-mail</Label>
                <Input id="email" type="email" />
            </Field>

            <Field>
                <Label htmlFor="new-email">New e-mail</Label>
                <Input id="new-email" type="email" />
            </Field>

            <Field>
                <Label htmlFor="new-email-repeat">Repeat new e-mail</Label>
                <Input id="new-email-repeat" type="email" />
            </Field>

            <Button type="submit">Change e-mail</Button>
        </Form>
    </section>
}