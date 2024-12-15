import { getToken } from "../../utils/session";

export const addtoFavorites = async id => {
  
  try {
    
  const token = `Bearer ${getToken()}`;
  const response = await fetch(`http://${"localhost:8080"}/favorites/`, {
    method: "PATCH",
    headers: { "Content-type": "application/json" , AUTHORIZATION: token },
    body: JSON.stringify({favorite: id}) 
  });
    const result = await response.json();

    return {valid: true, data: result.data };
  } catch (e) {
    /* handle error */
    return {valid: false, message: 'Failed adding / removing favorite'}
  }
};
