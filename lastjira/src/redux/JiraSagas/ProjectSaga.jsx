import { call, delay, put, takeLatest } from "redux-saga/effects";
import { STATUS_CODE } from "../../util/JiraSystem";
import {
  API_CREATE_PROJECT,
  CLOSE_MODAL,
  DELETE_PROJECT,
  GET_ALL_LIST,
  GET_ALL_PROJECT,
  GET_ALL_PROJECT_REDUCER,
  GET_PROJECT_DETAIL,
  PUT_PROJECT_DETAIL,
  UPDATE_PROJECT,
} from "../contants/JiraConstants";
import { JiraService } from "../services/JiraServices";
import { DISPLAY_LOADING, HIDE_LOADING } from "../contants/DisplayLoading";
import { history } from "../../util/history";
import { Notification } from "../../util/Notification/notification";
import { projectService } from "../services/ProServiceOOP";
// Authorize khi khoi tao du an

function* createProjectSaga(action) {
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
      Notification("success", "Add project successfully !");
      history.push("/project-management");
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

// Delete project

function* deleteProjectSaga(action) {
  //   Goi API lay du lieu ve
  yield put({
    type: DISPLAY_LOADING,
  });
  yield delay(500);
  try {
    const { data, status } = yield call(() =>
      projectService.deleteProject(action.idProject)
    );

    //   Goi API thanh cong thi dispatch len reducer thong qua put
    if (status === STATUS_CODE.SUCCESS) {
      Notification(
        "success",
        "Delete project successfully",
        `You have deleted Project ID: ${action.idProject}`
      );
    } else {
      Notification("error", "Failed to delete project !");
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
    Notification("error", "Failed to delete project !");
  }
  yield put({
    type: HIDE_LOADING,
  });
}
export function* listenDeleteProjectSaga() {
  yield takeLatest(DELETE_PROJECT, deleteProjectSaga);
}

// GET PROJECT DETAIL
function* getProjectDetailSaga(action) {
  //   Goi API lay du lieu ve
  yield put({
    type: DISPLAY_LOADING,
  });
  yield delay(500);

  try {
    const { data, status } = yield call(() =>
      projectService.getProjectDetail(action.projectId)
    );
    yield put({
      type: PUT_PROJECT_DETAIL,
      projectDetail: data.content,
    });
  } catch (err) {
    console.info(err.config);
    Notification("error", "Failed to Load Project !");
    history.push("/project-management");
  }
  yield put({
    type: HIDE_LOADING,
  });
}
export function* listenGetProjectDetailSaga() {
  yield takeLatest(GET_PROJECT_DETAIL, getProjectDetailSaga);
}

// GET All Project
function* getAllProjectSaga(action) {
  //   Goi API lay du lieu ve
  yield put({
    type: DISPLAY_LOADING,
  });
  yield delay(500);

  try {
    const { data, status } = yield call(() => projectService.getAllProject());
    yield put({
      type: GET_ALL_PROJECT_REDUCER,
      arrProject: data.content,
    });
  } catch (err) {
    console.info(err.config);
    Notification("error", "Failed to Load Project !");
  }
  yield put({
    type: HIDE_LOADING,
  });
}
export function* listenGetAllProjectSaga() {
  yield takeLatest(GET_ALL_PROJECT, getAllProjectSaga);
}
