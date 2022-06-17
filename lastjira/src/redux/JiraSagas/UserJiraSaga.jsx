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
import { ACCESS_TOKEN, USER_LOGIN } from "../../util/DOMAIN/JiraSystem";
import { USER_SIGNIN_API, USLOGIN_ACTION } from "../contants/JiraConstants";
import { HIDE_LOADING } from "../contants/DisplayLoading";
import { JiraService } from "../types/services/JiraServices";

import { history } from "../../util/DOMAIN/history";

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
    history.push("/dashboard");
  } catch (err) {
    console.log(err.response.data);
  }
  yield put({ type: HIDE_LOADING });
}

export function* listenTheSignIn() {
  yield takeLatest(USER_SIGNIN_API, signInSaga);
}
