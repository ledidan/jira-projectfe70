import { baseService } from "./baseService";

export class ProjectService extends baseService {
  constructor() {
    super();
  }
  getAllProject = () => {
    return this.get(`Project/getAllProject`);
  };
  deleteProject = (id) => {
    return this.delete(`Project/deleteProject?projectId=${id}`);
  };
  getProject = (id) => {
    return this.get(`ProjectCategory`);
  };
  getProjectDetail = (projectId) => {
    return this.get(`Project/getProjectDetail?id=${projectId}`);
  };
}

export const projectService = new ProjectService();
