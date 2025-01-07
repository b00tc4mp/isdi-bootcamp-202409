import { getToken } from "../../utils/session";
const baseUrl = process.env.NEXT_PUBLIC_API_URL;

export const deleteProduct = async (id) => {
  const token = `Bearer ${getToken()}`;
  try {
    let response = await fetch(`${baseUrl}/products/${id}`, {
      method: "DELETE",
      headers: {
        Authorization: `${token}`
      }
    });

    response = await response.json();

    if (response.data.deletedCount) return { valid: true, data: response.data.deletedCount };

    return { valid: false, message: "error" };
  } catch (error) {
    console.trace(error);
    // alert(error);
    return { valid: false, mesage: error.message };
  }
};
