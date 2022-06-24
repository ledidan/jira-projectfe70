import axios from "axios";
import {
  ACCESS_TOKEN,
  DOMAIN_LOGIN_JIRA,
  TOKEN_CYBER,
} from "../../util/JiraSystem";

export class baseService {
  // Put JSON ve phia backend
  put = (url, model) => {
    return axios({
      url: `${DOMAIN_LOGIN_JIRA}/${url}`,
      method: "PUT",
      data: model,
      headers: {
        Authorization: `Bearer ` + localStorage.getItem(ACCESS_TOKEN), //JWT
        TokenCybersoft: TOKEN_CYBER,
      },
    });
  };
  post = (url, model) => {
    return axios({
      url: `${DOMAIN_LOGIN_JIRA}/${url}`,
      method: "POST",
      data: model,
      headers: {
        Authorization: `Bearer ` + localStorage.getItem(ACCESS_TOKEN), //JWT
        TokenCybersoft: TOKEN_CYBER,
      },
    });
  };
  get = (url) => {
    return axios({
      url: `${DOMAIN_LOGIN_JIRA}/${url}`,
      method: "GET",
      headers: {
        Authorization: `Bearer ` + localStorage.getItem(ACCESS_TOKEN), //JWT
        TokenCybersoft: TOKEN_CYBER,
      },
    });
  };
  delete = (url) => {
    return axios({
      url: `${DOMAIN_LOGIN_JIRA}/${url}`,
      method: "DELETE",
      headers: {
        Authorization: `Bearer ` + localStorage.getItem(ACCESS_TOKEN), //JWT
        TokenCybersoft: TOKEN_CYBER,
      },
    });
  };
}
