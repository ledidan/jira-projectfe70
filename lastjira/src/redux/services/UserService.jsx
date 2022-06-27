import { baseService } from "./baseService";

export class UserService extends baseService {
  constructor() {
    super();
  }
  getUser = (keyWord) => {
    return this.get(`Users/getUser?keyword=${keyWord}`);
  };

  assignUserProject = (userProject) => {
    return this.post(`Project/assignUserProject`, userProject);
  };
  removeUserProject = (userProject) => {
    return this.post(`Project/removeUserFromProject`, userProject);
  };
  getUserByProject = (idProject) => {
    return this.get(`Users/getUserByProjectId?idProject=${idProject}`);
  };
}

export const userService = new UserService();
