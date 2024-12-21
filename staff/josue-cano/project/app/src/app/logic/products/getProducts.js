import { getToken } from "../../utils/session";
import fetchHandler from "@/app/utils/handlers/fetchHandler";

export async function getProducts() {
  const token = getToken();
  let url = '';

  const isPublic = token == undefined;


  if(isPublic) {
    url = 'public/products';
  } else {
    url = 'products';
  }

  try{
    const response = await fetchHandler(url, {}, isPublic);

    return response.data;

  } catch(error) {

    // alert(error);
    return error;

  }

}
