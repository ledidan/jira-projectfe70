import { call, delay, put, takeLatest } from "redux-saga/effects";
import { STATUS_CODE } from "../../util/DOMAIN/JiraSystem";
import { API_CREATE_PROJECT } from "../contants/JiraConstants";
import { JiraService } from "../types/services/JiraServices";
import { DISPLAY_LOADING, HIDE_LOADING } from "../contants/DisplayLoading";

function* createProjectSaga(action) {
  console.log("actionCreateProject", action);
  // Hien thi loading
  yield put({
    type: DISPLAY_LOADING,
  });
  yield delay(500);

  //   Goi API lay du lieu ve
  try {
    const { data, status } = yield call(() =>
      JiraService.createProject(action.newProject)
    );

    //   Goi API thanh cong thi dispatch len reducer thong qua put
    if (status === STATUS_CODE.SUCCESS) {
      console.log(data);
    }
  } catch (err) {
    console.info(err.config);
  }
  yield put({
    type: HIDE_LOADING,
  });
}

export function* listenCreateProjectSaga() {
  yield takeLatest(API_CREATE_PROJECT, createProjectSaga);
}
