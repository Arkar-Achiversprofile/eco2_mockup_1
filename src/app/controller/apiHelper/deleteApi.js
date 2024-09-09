import { baseUrl } from "../baseUrl";

export const deleteApi = async (url, obj, setData) => {
  const requestOptions = {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json;",
    },
    body: obj != null ? JSON.stringify(obj) : null
  };
  fetch(`${baseUrl}${url}`, requestOptions)
    .then((response) => {
      if (response.json()) {
        return response.json();
      } else {
        return "Successful!";
      }
    })
    .then((data) => setData(data))
    .catch((error) => {
      console.log("patch_error>>>", error);
      setData(error);
    });
};
