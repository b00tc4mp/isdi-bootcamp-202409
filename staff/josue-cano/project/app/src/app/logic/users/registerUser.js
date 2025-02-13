import { validate } from "com";

const baseUrl = process.env.NEXT_PUBLIC_API_URL;

export const registerUser = async ({ firstName, lastName, email, location, password, passwordRepeat }) => {
  try {
    validate.firstName(firstName);
    validate.lastName(lastName);
    validate.email(email);
    validate.location(location);
    validate.password(password);
    validate.password(passwordRepeat);
  } catch (error) {
    throw error;
  }

  const res = await fetch(`${baseUrl}/auth/register`, {
    method: "POST",
    headers: { "Content-type": "application/json" },
    body: JSON.stringify({
      firstName,
      lastName,
      email,
      location,
      password,
      passwordRepeat,
    }),
  });

  if (!res.ok) {
    const { error } = await res.json();
    throw new Error(error || "Error desconocido en el registro.");
  }

  const data = await res.json();
  return data;
};
