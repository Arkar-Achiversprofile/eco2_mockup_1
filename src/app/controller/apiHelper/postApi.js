import { baseUrl } from "../baseUrl";

export const postApi = async (url, obj, setData) => {
  const requestOptions = {
    method: "POST",
    headers: {
      "Content-Type": "application/json;",
    },
    body: JSON.stringify(obj),
  };
  fetch(`${baseUrl}${url}`, requestOptions)
    .then((response) => {
      // if (response.status == 200) {
        return response.json();
      // } else {
      //   return []
      // }
      
    })
    .then((data) => setData(data))
    .catch((error) => {
      console.log("post_error>>>", error);
      setData(error);
    });
};
