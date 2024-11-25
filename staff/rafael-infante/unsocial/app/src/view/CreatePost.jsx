import logic from "../logic";
import "./CreatePost.css";
import { Button, Form, Label, Input } from "./components/library";

export default function CreatePost({ onCreated }) {
  console.log("Create Post -> render");

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
        .then(onCreated)
        .catch((error) => {
          alert(error.message);

          console.error(error);
        });
    } catch (error) {
      alert(error.message);

      console.error(error);
    }
  };

  return (
    <main className="CreatePost flex items-center justify-center flex-col h-full bg-white">
      <Form onSubmit={handleSubmit}>
        <h2>Create a Post</h2>
        <Label htmlFor="image">Image</Label>
        <Input type="text" id="image" placeholder="Select an image" required />
        <Label htmlFor="image">Text</Label>
        <Input type="text" id="text" placeholder="Write a text" required />
        <Button id="submit" type="submit">
          Create
        </Button>
      </Form>
    </main>
  );
}
