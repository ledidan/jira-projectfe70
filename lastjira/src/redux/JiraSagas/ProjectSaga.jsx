import { call, delay, put, takeLatest } from "redux-saga/effects";
import { STATUS_CODE } from "../../util/JiraSystem";
import {
  API_CREATE_PROJECT,
  CLOSE_MODAL,
  GET_ALL_LIST,
  UPDATE_PROJECT,
} from "../contants/JiraConstants";
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

// Update Project
function* updateProjectSaga(action) {
  console.log("action", action);
  //   Goi API lay du lieu ve
  yield put({
    type: DISPLAY_LOADING,
  });
  yield delay(500);
  try {
    const { data, status } = yield call(() =>
      JiraService.updateProject(action.projectUpdate)
    );

    //   Goi API thanh cong thi dispatch len reducer thong qua put
    if (status === STATUS_CODE.SUCCESS) {
      // yield put({
      //   type: UPDATE_PROJECT,
      //   projectUpdate: data.content,
      // });
      console.log(data);
      Notification("success", "Update project successfully");
    }
    // Chay lai khi da update du lieu
    yield put({
      type: GET_ALL_LIST,
    });
    yield put({
      type: CLOSE_MODAL,
    });
  } catch (err) {
    console.info(err.config);
  }
  yield put({
    type: HIDE_LOADING,
  });
}
export function* listenUpdateProjectSaga() {
  yield takeLatest(UPDATE_PROJECT, updateProjectSaga);
}
