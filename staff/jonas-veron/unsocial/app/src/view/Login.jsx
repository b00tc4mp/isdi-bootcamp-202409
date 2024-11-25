import {
  PasswordInput,
  Input,
  Button,
  Form,
  Field,
  Label,
  Anchor,
} from "../components/library";

import logic from "../logic";

import { errors } from "com";

const { SystemError } = errors;

export default function Login(props) {
  console.log("Login -> render");

  const handleSubmit = (event) => {
    event.preventDefault();

    const {
      target: {
        username: { value: username },
        password: { value: password },
      },
    } = event;

    try {
      logic
        .loginUser(username, password)
        .then(() => {
          event.target.reset();

          props.onLoggedIn();
        })
        .catch((error) => {
          if (error instanceof SystemError) alert("Sorry, try again later.");
          else alert(error.message);
          console.error(error);
        });
    } catch (error) {
      alert(error.message);

      console.error(error);
    }
  };

  const handleRegisterClick = (event) => {
    event.preventDefault();

    props.onRegisterClick();
  };

  return (
    <main className="Login m-auto mt-28 p-12 w-10/12 min-w-96 max-w-[26rem] rounded-3xl shadow-md bg-red-50">
      <h2 className="text-2xl mb-8">Login</h2>

      <Form onSubmit={handleSubmit}>
        <Field>
          <Label htmlFor="username">Username</Label>
          <Input type="text" id="username" />
        </Field>

        <Field>
          <Label htmlFor="password">Password</Label>
          <PasswordInput id="password" />
        </Field>

        <Button type="submit" className="Button">
          Login
        </Button>
      </Form>
      <p className="text-center">Don't you have a account ?</p>
      <Anchor href="" onClick={handleRegisterClick}>
        Register
      </Anchor>
    </main>
  );
}
