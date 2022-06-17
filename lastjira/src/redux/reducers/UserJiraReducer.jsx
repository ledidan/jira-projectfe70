import { USER_LOGIN } from "../../util/DOMAIN/JiraSystem";

let UsLogin = {};
if (localStorage.getItem(USER_LOGIN)) {
  UsLogin = JSON.parse(localStorage.getItem(USER_LOGIN));
}
const stateDefault = {
  userLogin: UsLogin,
};

export const UserLoginJiraReducer = (state = stateDefault, action) => {
  switch (action.type) {
    case USER_LOGIN: {
      state.userLogin = action.userLogin;
      return { ...state };
    }
    default:
      return { ...state };
  }
};
