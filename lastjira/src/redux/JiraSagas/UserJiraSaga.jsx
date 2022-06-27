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
  ADD_USER_PROJECT,
  GET_ALL_LIST,
  GET_SEARCH_USER,
  GET_USER_API,
  REMOVE_USER_PROJECT,
  USER_SIGNIN_API,
  USLOGIN_ACTION,
} from "../contants/JiraConstants";
import {
  GET_USER_BY_PROJECT_REDUCER,
  GET_USER_BY_PROJECT_SAGA,
} from "../contants/UserConstants";

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
  // Call API
  try {
    const { data, status } = yield call(() =>
      userService.getUser(action.keyWord)
    );
    yield put({
      type: GET_SEARCH_USER,
      lstUserSearch: data.content,
    });
  } catch (err) {
    console.info(err?.config);
  }
}

export function* listenToGetUser() {
  yield takeLatest(GET_USER_API, getUserSaga);
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
    console.info(err?.config);
    Notification("error", "User Not Found !");
  }
}

export function* listenAddUserProject() {
  yield takeLatest(ADD_USER_PROJECT, addUserProjectSaga);
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
  yield takeLatest(REMOVE_USER_PROJECT, removeUserProjectSaga);
}

// GET USER BY PROJECT
function* getUserByProjectSaga(action) {
  const { idProject } = action;

  try {
    const { data, status } = yield call(() =>
      userService.getUserByProject(idProject)
    );

    if (status === STATUS_CODE.SUCCESS) {
      yield put({
        type: GET_USER_BY_PROJECT_REDUCER,
        arrUser: data.content,
      });
    }
  } catch (err) {
    console.log(err.response?.data);
    if (err.response?.data.statusCode === STATUS_CODE.NOT_FOUND) {
      yield put({
        type: GET_USER_BY_PROJECT_REDUCER,
        arrUser: [],
      });
    }
  }
}

export function* listenGetUserByProjectSaga() {
  yield takeLatest(GET_USER_BY_PROJECT_SAGA, getUserByProjectSaga);
}
