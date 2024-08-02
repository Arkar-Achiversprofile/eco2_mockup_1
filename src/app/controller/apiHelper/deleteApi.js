import { baseUrl } from "../baseUrl";

export const deleteApi = async (url, setData) => {
  const requestOptions = {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json;",
    },
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
