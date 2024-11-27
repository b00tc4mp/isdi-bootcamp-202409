import { Label, Button, Form, Field } from "../library";

import logic from "../../logic";

export default function AddComment({ postId, onAdded }) {
  console.log("AddComment -> render");

  const handleSubmit = (event) => {
    event.preventDefault();

    const form = event.target;

    const {
      text: { value: text },
    } = form;

    try {
      logic.addComment(postId, text, (error) => {
        if (error) {
          alert(error.message);

          console.error(error);

          return;
        }

        form.reset();

        onAdded();
      });
    } catch (error) {
      alert(error.message);

      console.error(error);
    }
  };

  return (
    <Form onSubmit={handleSubmit}>
      <Field>
        <Label htmlFor="text">New comment</Label>
        <textarea id="text"></textarea>
      </Field>

      <Button type="submit">Send</Button>
    </Form>
  );
}
