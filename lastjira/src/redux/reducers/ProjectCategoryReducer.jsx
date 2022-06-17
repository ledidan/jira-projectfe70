import { API_PROJECT_CATEGORY } from "../contants/JiraConstants";

const stateDefault = {
  arrProjectCategory: [],
};

export const ProjectCategoryReducer = (state = stateDefault, action) => {
  switch (action.type) {
    case API_PROJECT_CATEGORY: {
      state.arrProjectCategory = action.data;
      return { ...state };
    }
    default:
      return { ...state };
  }
};
