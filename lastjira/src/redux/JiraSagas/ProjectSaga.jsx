import { call, delay, put, takeLatest } from "redux-saga/effects";
import { STATUS_CODE } from "../../util/JiraSystem";
import { API_CREATE_PROJECT, GET_ALL_LIST } from "../contants/JiraConstants";
import { JiraService } from "../types/services/JiraServices";
import { DISPLAY_LOADING, HIDE_LOADING } from "../contants/DisplayLoading";
import { history } from "../../util/history";
import { Notification } from "../../util/Notification/notification";
// Authorize khi khoi tao du an

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
      JiraService.createProjectAuthorize(action.newProject)
    );

    //   Goi API thanh cong thi dispatch len reducer thong qua put
    if (status === STATUS_CODE.SUCCESS) {
      console.log(data);
      //   history.push("/project-management");
      Notification("success", "Add project successfully !");
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

// GET - Get list from project

function* getListProjectSaga() {
  //   Goi API lay du lieu ve
  try {
    const { data, status } = yield call(() => JiraService.getListProject());

    //   Goi API thanh cong thi dispatch len reducer thong qua put
    if (status === STATUS_CODE.SUCCESS) {
      yield put({
        type: GET_ALL_LIST,
        projectList: data.content,
      });
    }
  } catch (err) {
    console.info(err.config);
  }
}
export function* listenGetListProjectSaga() {
  yield takeLatest(GET_ALL_LIST, getListProjectSaga);
}
