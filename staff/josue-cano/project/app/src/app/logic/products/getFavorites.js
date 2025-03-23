import { getToken } from "@/app/utils/session";

const baseUrl = process.env.NEXT_PUBLIC_API_URL;

export async function getFavorites() {
  const token = getToken();

  try {
    let response = await fetch(`${baseUrl}/users/favorites`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    response = await response.json();

    return response.data;
  } catch (error) {
    // alert(error);
    return error;
  }
}
