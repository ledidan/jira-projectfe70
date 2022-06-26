import { USER_LOGIN } from "../../util/JiraSystem";
import { GET_SEARCH_USER } from "../contants/JiraConstants";

let UsLogin = {};
if (localStorage.getItem(USER_LOGIN)) {
  UsLogin = JSON.parse(localStorage.getItem(USER_LOGIN));
}
const stateDefault = {
  userLogin: UsLogin,
  userSearch: [],
};

export const UserLoginJiraReducer = (state = stateDefault, action) => {
  switch (action.type) {
    case USER_LOGIN: {
      state.userLogin = action.userLogin;
      return { ...state };
    }
    case GET_SEARCH_USER: {
      state.userSearch = action.lstUserSearch;
      return { ...state };
    }
    default:
      return { ...state };
  }
};
