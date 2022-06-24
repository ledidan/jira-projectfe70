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
import { ACCESS_TOKEN, USER_LOGIN } from "../../util/JiraSystem";
import { USER_SIGNIN_API, USLOGIN_ACTION } from "../contants/JiraConstants";
import { HIDE_LOADING } from "../contants/DisplayLoading";
import { JiraService } from "../services/JiraServices";

import { history } from "../../util/history";
import { Notification } from "../../util/Notification/notification";

function* signInSaga(action) {
  yield delay(500);
  // Call API
  try {
    const { data, status } = yield call(() =>
      JiraService.signInJira(action.userLogin)
    );

    // Save data in localStorage when signined successfully
    localStorage.setItem(ACCESS_TOKEN, data.content.accessToken);
    localStorage.setItem(USER_LOGIN, JSON.stringify(data.content));

    yield put({
      type: USLOGIN_ACTION,
      userLogin: data.content,
    });

    // let history = yield select((state) => state.HistoryReducer.history);
    // history.push("/dashboard");
    Notification("success", "Logged in successfully !");
  } catch (err) {
    console.log(err.response.data);
    Notification("error", "Login attempt failed !");
  }
  yield put({ type: HIDE_LOADING });
}

export function* listenTheSignIn() {
  yield takeLatest(USER_SIGNIN_API, signInSaga);
}
