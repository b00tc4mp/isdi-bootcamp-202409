import logic from "../logic";

import { errors } from "com";
const { SystemError } = errors;

import { Button, Label, Input, Form, Field } from "../components/library";

import "./CreatePost.css";

export default function createPost({ onCreated }) {
  console.log("CreatePost -> render");

  const handleSubmit = (event) => {
    event.preventDefault();

    const { target: form } = event;

    const {
      image: { value: image },
      text: { value: text },
    } = form;

    try {
      logic
        .createPost(image, text)
        .then(() => onCreated())
        .catch((error) => {
          if (error instanceof SystemError) alert("sorry, try again later.");
          else alert(error.message);
          console.error(error);
        });
    } catch (error) {
      alert(error.message);

      console.error(error);
    }
  };

  return (
    <main className="CreatePost">
      <Form onSubmit={handleSubmit}>
        <Field>
          <Label htmlFor="image">Image</Label>
          <Input type="text" id="image" />
        </Field>

        <Field>
          <Label htmlFor="text">Text</Label>
          <Input type="text" id="text" />
        </Field>

        <Button type="submit" className="Button">
          Create
        </Button>
      </Form>
    </main>
  );
}
