import { EDIT_PROJECT_FORM } from "../contants/JiraConstants";

const initialState = {
  projectEdit: {
    id: 0,
    projectName: "string",
    creator: 0,
    description: "string",
    categoryId: 1,
  },
};

export const EditProjectReducer = (state = initialState, action) => {
  switch (action.type) {
    case EDIT_PROJECT_FORM: {
      state.projectEdit = action.projectEdit;
    }
    default:
      return { ...state };
  }
};
