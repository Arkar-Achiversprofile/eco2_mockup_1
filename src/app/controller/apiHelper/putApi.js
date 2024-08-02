import { baseUrl } from "../baseUrl";

export const putApi = async (url, obj, setData) => {
  const requestOptions = {
    method: "PUT",
    headers: {
      "Content-Type": "application/json;",
      "accept": "*/*",
    },
    // body: obj != null ? JSON.stringify(obj) : "",
  };
  fetch(`${baseUrl}${url}`, requestOptions)
    .then((response) => {
      console.log("response ====>", response)
      return response.json();
    })
    .then((data) => setData(data))
    .catch((error) => {
      console.log("patch_error>>>", error);
      setData(error);
    });
};
