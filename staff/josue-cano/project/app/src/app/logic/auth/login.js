import { validate, errors } from "com";

const { ValidationError } = errors;
const baseUrl = process.env.NEXT_PUBLIC_API_URL;

const login = async ({ username, password }) => {

  try {

    validate.userName(username);
    validate.password(password);

    let response = await fetch(
      `${baseUrl}/auth`,
      {
        method: "POST",
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ email: username, password }),
      }
    );

    if (!response.ok) {
      response = await response.json();
      throw new ValidationError(response.error);
    }

    response = await response.json();



    localStorage.token = response.data.token;
    localStorage.favorites = response.data.favorites;


  } catch (error) {
    throw error;
  }

};

export default login;
