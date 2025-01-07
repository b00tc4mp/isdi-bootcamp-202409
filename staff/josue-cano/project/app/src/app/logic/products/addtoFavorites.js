import { getToken } from "../../utils/session";
export const addtoFavorites = async (id) => {
  const baseUrl = process.env.NEXT_PUBLIC_API_URL;

  const token = `Bearer ${getToken()}`;
  const url = baseUrl + "/favorites";

  try {
    const response = await fetch(url, {
      method: "PATCH",
      headers: { 
        "Content-Type": "application/json",
        AUTHORIZATION: token 
      },
      body: JSON.stringify({ favorite: id })
    });

    if (response.status == 401) {
      alert('Usuario no autenticado');
    }

    const data = await response.json();

    if (data.data) return { valid: true, data: data.data };

    return { valid: false, message: "error" };
  } catch (error) {
    // console.trace(error);
    // alert(error);
    return { valid: false, mesage: error.message };
  }
};
