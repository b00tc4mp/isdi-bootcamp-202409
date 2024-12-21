import { getToken } from "@/app/utils/session";
import { logout } from "@/app/logic/auth";

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

    let response = await fetch(`${baseUrl}/${url}`, fetchOptions);
    debugger;

    if (!response.ok) {
      if (response.status == 401) {
        logout();
      }
      response = await response.json();
      throw new Error(response.error);
    }
    response = await response.json();
    return response;
  } catch (error) {
    debugger;
    // Manejar el error aquí
    console.log("Error:", error.message);
    // alert('error en el fetch');
    throw error;
  }
}
