import { GET_ALL_LIST } from "../contants/JiraConstants";

const stateDefault = {
  projectList: [
    {
      id: "1",
      projectName: "Du an 1",
      description: "Du an 1 vo dich",
    },
  ],
};

export const ProjectManagementReducer = (state = stateDefault, action) => {
  switch (action.type) {
    case GET_ALL_LIST: {
      state.projectList = action.projectList;
      return { ...state };
    }
    default:
      return { ...state };
  }
};
