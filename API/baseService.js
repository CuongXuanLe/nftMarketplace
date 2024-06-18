import axios from "axios";
const DOMAIN = "http://127.0.0.1:5000/api/v1/users";

export class BaseServices {
  patch = (url, model, token) => {
    return axios({
      url: `${DOMAIN}/${url}`,
      method: "PATCH",
      data: model,
      headers: { Authorization: "Bearer " + token },
    });
  };
  post = (url, model, token) => {
    return axios({
      url: `${DOMAIN}/${url}`,
      method: "POST",
      data: model,
      headers: { Authorization: "Bearer " + localStorage.getItem(token) },
    });
  };
  get = (url, token) => {
    return axios({
      url: `${DOMAIN}/${url}`,
      method: "GET",
      headers: { Authorization: "Bearer " + localStorage.getItem(token) },
    });
  };
  delete = (url, token) => {
    return axios({
      url: `${DOMAIN}/${url}`,
      method: "DELETE",
      headers: { Authorization: "Bearer " + localStorage.getItem(token) },
    });
  };
}
