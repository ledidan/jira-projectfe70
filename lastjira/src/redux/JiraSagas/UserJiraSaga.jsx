import {
  call,
  delay,
  fork,
  take,
  put,
  takeEvery,
  takeLatest,
  select,
} from "redux-saga/effects";

import { Notification } from "../../util/Notification/notification";
import { userService } from "../services/UserService";
import { DISPLAY_LOADING, HIDE_LOADING } from "../contants/DisplayLoading";
import { JiraService } from "../services/JiraServices";
import { ACCESS_TOKEN, STATUS_CODE, USER_LOGIN } from "../../util/JiraSystem";
import {
  GET_ALL_LIST,
  USER_SIGNIN_API,
  USLOGIN_ACTION,
} from "../contants/JiraConstants";

// LOGIN API
function* signInJira(action) {
  // Delay
  yield delay(500);
  // Call Sign In API
  try {
    const { data, status } = yield call(() =>
      JiraService.signInJira(action.userLogin)
    );

    // save data in localstorage when signin successfully
    localStorage.getItem(ACCESS_TOKEN, data.content.accessToken);
    localStorage.setItem(USER_LOGIN, JSON.stringify(data.content));
    if (status === STATUS_CODE.SUCCESS) {
      yield put({
        type: USLOGIN_ACTION,
        userLogin: data.content,
      });
    }
    Notification("success", "Loggged in successfully");
  } catch (err) {
    console.log(err.response.data);
    Notification("error", "Login attempt failed !");
  }
  yield put({
    type: HIDE_LOADING,
  });
}
export function* listenUserSignIn() {
  yield takeLatest(USER_SIGNIN_API, signInJira);
}

//  GET USER ON SEARCH
function* getUserSaga(action) {
  // action.keyword
  console.log("action", action.keyWord);
  // Call API
  try {
    const { data, status } = yield call(() =>
      userService.getUser(action.keyWord)
    );
    yield put({
      type: "GET_USER_SEARCH",
      lstUserSearch: data.content,
    });
    console.log("data", data);
  } catch (err) {
    console.log(err?.config);
  }
}

export function* listenToGetUser() {
  yield takeLatest("GET_USER_API", getUserSaga);
}

// ADD USER PROJECT
function* addUserProjectSaga(action) {
  // Call API
  try {
    const { data, status } = yield call(() =>
      userService.assignUserProject(action.userProject)
    );
    if (status === STATUS_CODE.SUCCESS) {
      yield put({
        type: GET_ALL_LIST,
      });
      Notification("success", "Add User Successfully");
    }
  } catch (err) {
    console.log(err?.config);
    Notification("error", "User Not Found !");
  }
}

export function* listenAddUserProject() {
  yield takeLatest("ADD_USER_PROJECT_API", addUserProjectSaga);
}

// DELETE USER FROM PROJECT

function* removeUserProjectSaga(action) {
  // Call API
  try {
    const { data, status } = yield call(() =>
      userService.removeUserProject(action.userProject)
    );
    if (status === STATUS_CODE.SUCCESS) {
      yield put({
        type: GET_ALL_LIST,
      });
      Notification("success", "Delete User Successfully");
    }
  } catch (err) {
    console.log(err?.config);
    Notification("error", "User cannot be  deleted !");
  }
}

export function* listenRemoveUserProject() {
  yield takeLatest("REMOVE_USER_PROJECT_API", removeUserProjectSaga);
}
