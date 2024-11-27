import { Input, Button, Form, Field, Label } from '../library';

export default function ChangeEmail(props) {


    return <section className='flex justify-center items-center flex-col h-full box-border bg-slate-400'> 
        <h3>Change E-mail</h3>

        <Form>
            <Field>
                <Label htmlFor="email">Current email</Label>
                <Input id="email" />
            </Field>

            <Field>
                <Label htmlFor="new-email">New email</Label>
                <Input id="new-email"></Input>
            </Field>

            <Field>
                <Label htmlFor="new-email-repeat">Repeat new email</Label>
                <Input id="new-email-repeat" type="email" />
            

                <Button type="submit">Change email</Button>
            </Field>
        </Form>
    </section>
}