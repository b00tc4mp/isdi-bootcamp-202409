import fetchHandler from "@/app/utils/handlers/fetchHandler";

export const addtoFavorites = async (id) => {
  const url = "favorites";

  try {
    const response = await fetchHandler(url, {
      method: "PATCH",
      body: JSON.stringify({ favorite: id }),
    });

    if (response.data) return { valid: true, data: response.data };

    return { valid: false, message: "error" };
  } catch (error) {
    console.trace(error);
    // alert(error);
    return { valid: false, mesage: error.message };
  }
};
