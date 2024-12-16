import fetchHandler from "@/app/utils/handlers/fetchHandler";

export const deleteProduct = async id => {
  
  const url = `products/${id}`;

  try{
    const response = await fetchHandler(url, {
      method: 'DELETE',
    }/*,true* si fuera publica*/);

    if(response.data.deletedCount)
      return {valid: true, data: response.data.deletedCount};

    return {valid: false, message: 'error'};

  } catch(error) {

    console.trace(error);
    // alert(error);
    return { valid: false, mesage: error.message};

  }

};
