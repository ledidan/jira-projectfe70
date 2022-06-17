import { GET_TASK_API } from "../contants/JiraConstants";
const initialState = {
  UserJiraLogin: [],
};

export default (state = initialState, action) => {
  switch (action.type) {
    case GET_TASK_API: {
      state.UserJiraLogin = action.UserJiraLogin;
      return { ...state };
    }

    default:
      return state;
  }
};
