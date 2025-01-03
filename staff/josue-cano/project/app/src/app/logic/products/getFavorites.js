import fetchHandler from "@/app/utils/handlers/fetchHandler";

export async function getFavorites() {
  const url = "favorites";
  try {
    const response = await fetchHandler(url, {});

    return response.data;
  } catch (error) {
    // alert(error);
    return error;
  }
}
