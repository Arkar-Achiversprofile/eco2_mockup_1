import { baseUrl } from "../baseUrl";

export const patchApi = async (url, obj, setData) => {
  const requestOptions = {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json;",
    },
    body: obj != null ? JSON.stringify(obj) : "",
  };
  fetch(`${baseUrl}${url}`, requestOptions)
    .then((response) => {
      return response.json();
    })
    .then((data) => setData(data))
    .catch((error) => {
      console.log("patch_error>>>", error);
      setData(error);
    });
};
