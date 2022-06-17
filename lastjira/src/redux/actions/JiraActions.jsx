import { USER_SIGNIN_API } from "../contants/JiraConstants";
export const SIGNIN_ACTION = (email, password) => {
  return {
    type: USER_SIGNIN_API,
    userLogin: {
      email: email,
      password: password,
    },
  };
};
