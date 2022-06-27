import {
  GET_ALL_LIST,
  GET_ALL_PROJECT_REDUCER,
} from "../contants/JiraConstants";

const stateDefault = {
  projectList: [
    {
      id: "1",
      projectName: "Du an 1",
      description: "Du an 1 vo dich",
    },
  ],
  arrProject: [],
};

export const ProjectManagementReducer = (state = stateDefault, action) => {
  switch (action.type) {
    case GET_ALL_LIST: {
      state.projectList = action.projectList;
      return { ...state };
    }
    case GET_ALL_PROJECT_REDUCER: {
      return { ...state, arrProject: action.arrProject };
    }
    default:
      return { ...state };
  }
};
