import axios from "axios";
import {
  DOMAIN_LOGIN_JIRA,
  TOKEN_CYBER,
  ACCESS_TOKEN,
} from "../../../util/DOMAIN/JiraSystem";

export const JiraService = {
  signInJira: (userLogin) => {
    return axios({
      url: `${DOMAIN_LOGIN_JIRA}/Users/signin`,
      method: "POST",
      data: userLogin,
      headers: {
        TokenCybersoft: TOKEN_CYBER,
      },
    });
  },
  getAllProjectCategory: () => {
    return axios({
      url: `${DOMAIN_LOGIN_JIRA}/ProjectCategory`,
      method: "GET",
      headers: {
        TokenCybersoft: TOKEN_CYBER,
      },
    });
  },
  createProject: (newProject) => {
    return axios({
      url: `${DOMAIN_LOGIN_JIRA}/Project/createProject`,
      method: "POST",
      data: newProject,
      headers: {
        Authorization: `Bearer ` + localStorage.getItem(ACCESS_TOKEN),
        TokenCybersoft: TOKEN_CYBER,
      },
    });
  },
};
