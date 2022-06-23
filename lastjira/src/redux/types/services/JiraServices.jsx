import axios from "axios";
import {
  DOMAIN_LOGIN_JIRA,
  TOKEN_CYBER,
  ACCESS_TOKEN,
} from "../../../util/JiraSystem";

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
        Authorization: `Bearer ` + localStorage.getItem(ACCESS_TOKEN), //JWT
        TokenCybersoft: TOKEN_CYBER,
      },
    });
  },
  createProjectAuthorize: (newProject) => {
    return axios({
      url: `${DOMAIN_LOGIN_JIRA}/Project/createProjectAuthorize`,
      method: "POST",
      data: newProject,
      headers: {
        Authorization: `Bearer ` + localStorage.getItem(ACCESS_TOKEN),
        TokenCybersoft: TOKEN_CYBER,
      },
    });
  },
  getListProject: () => {
    return axios({
      url: `${DOMAIN_LOGIN_JIRA}/Project/getAllProject`,
      method: "GET",
      headers: {
        Authorization: `Bearer ` + localStorage.getItem(ACCESS_TOKEN),
        TokenCybersoft: TOKEN_CYBER,
      },
    });
  },
  updateProject: (projectUpdate) => {
    return axios({
      url: `${DOMAIN_LOGIN_JIRA}/Project/updateProject?projectId=${projectUpdate.id}`,
      method: "PUT",
      data: projectUpdate,
      headers: {
        Authorization: `Bearer ` + localStorage.getItem(ACCESS_TOKEN),
        TokenCybersoft: TOKEN_CYBER,
      },
    });
  },
};
