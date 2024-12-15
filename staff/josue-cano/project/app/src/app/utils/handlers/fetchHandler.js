import { getToken } from "@/app/utils/session";

const baseUrl = process.env.NEXT_PUBLIC_API_URL;

export default async function fetchHandler(url, options, isPublic = false) {
  let fetchOptions = {
    headers: {
      "content-type": "application/json",
    },
    ...options,
  };

  try {
    if (!isPublic) {
      const token = getToken();

      if (!token) {
        // console.log('breaking');
        throw new Error("Authorization error");
      }
      fetchOptions.headers = { ...fetchOptions.headers, Authorization: `Bearer ${token}` };
    }

    const response = await fetch(`${baseUrl}/${url}`, fetchOptions);

    if (!response.ok) {
      // alert('error en response');
      throw new Error("Network response was not ok");
    }
    return response.json();
  } catch (error) {
    // Manejar el error aquí
    console.log("Error:", error);
    // alert('error en el fetch');
    // Puedes mostrar un mensaje de error al usuario, redireccionar a una página de error, etc.
    throw error;
  }
}
