import { baseUrl } from "../baseUrl";

export const getApi = async (url, setData) => {
  const requestOptions = {
    method: "GET",
    headers: {
      "Content-Type": "application/json;",
    },
  };
  fetch(`${baseUrl}${url}`, requestOptions)
    .then((response) => {
      if (response.status == 200) {
        return response.json();
      } else {
        return [];
      }
    })
    .then((data) => setData(data))
    .catch((error) => {
      console.log("patch_error>>>", error);
      setData(error);
    });
};
