import { getToken } from "../../utils/session";
import { logout } from "@/app/logic/auth";

// get api url from .env file
const baseUrl = process.env.NEXT_PUBLIC_API_URL;

export async function getProducts(keyword) {
  const token = getToken();
  let url = '';

  const isPublic = token == undefined;


  if(isPublic) {
    url = 'public/products';
  } else {
    url = 'products';
  }
  url = `${baseUrl}/${url}/?keyword=${keyword}`;

  try {

    let response = await fetch(url,{
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      }
    });

    if (!response.ok) {
      if (response.status == 401) {
        logout();
      }
      response = await response.json();
      throw new Error(response.error);
    }

    response = await response.json();

    return response.data;

  } catch(error) {

    // alert(error);
    return error;

  }

}
