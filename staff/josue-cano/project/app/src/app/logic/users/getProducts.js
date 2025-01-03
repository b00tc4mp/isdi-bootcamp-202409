import { getToken } from "../../utils/session";
import fetchHandler from "@/app/utils/handlers/fetchHandler";

export async function getProducts() {
  const token = getToken();
  const url = 'user/products';
  const isPublic = token == undefined;



  try{
    const response = await fetchHandler(url, {}, isPublic);

    return response.data;

  } catch(error) {

    // alert(error);
    return error;

  }

}
