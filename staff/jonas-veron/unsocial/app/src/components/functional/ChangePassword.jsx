import { PasswordInput, Button, Form, Field, Label } from "../library";

export default function ChangePassword(props) {
  return (
    <section className="flex justify-center items-center flex-col h-full box-border">
      <h3>Change Password</h3>

      <Form>
        <Field>
          <Label htmlFor="password">Current password</Label>
          <PasswordInput id="password" />
        </Field>

        <Field>
          <Label htmlFor="password">Current password</Label>
          <PasswordInput id="password" />
        </Field>

        <Field>
          <Label htmlFor="password">Current password</Label>
          <PasswordInput id="password" />
        </Field>

        <Button type="submit">Change Password</Button>
      </Form>
    </section>
  );
}
