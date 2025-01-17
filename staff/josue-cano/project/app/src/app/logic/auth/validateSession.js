import { getToken } from "../../utils/session";

const validateSession = async () => {
  const baseUrl = process.env.NEXT_PUBLIC_API_URL;
  const url = baseUrl + "/auth/validate-session";
  const token = `Bearer ${getToken()}`;
  try {
    const response = await fetch(url, {
      method: "GET",
      headers: { "Content-type": "application/json", Authorization: token },
    });

    const data = await response.json();

    return data.data;
  } catch (error) {
    // alert(error);
    return error;
  }
};

export default validateSession;
