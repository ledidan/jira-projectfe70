import { baseService } from "./baseService";

export class ProjectService extends baseService {
  constructor() {
    super();
  }

  deleteProject = (id) => {
    return this.delete(`/Project/deleteProject?projectId=${id}`);
  };
  getProject = (id) => {
    return this.get(`/ProjectCategory`);
  };
}

export const projectService = new ProjectService();
