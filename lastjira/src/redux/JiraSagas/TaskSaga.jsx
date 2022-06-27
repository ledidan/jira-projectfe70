import { call, delay, put, takeLatest } from "redux-saga/effects";
import { STATUS_CODE } from "../../util/JiraSystem";
import { taskService } from "../services/TaskService";
import { DISPLAY_LOADING, HIDE_LOADING } from "../contants/DisplayLoading";
import { CLOSE_MODAL } from "../contants/JiraConstants";
import { Notification } from "../../util/Notification/notification";
import { CREATE_TASK_SAGA } from "../contants/TaskTypeConstant";
import { history } from "../../util/history";
function* createTaskSaga(action) {
  try {
    yield put({
      type: DISPLAY_LOADING,
    });
    const { data, status } = yield call(() =>
      taskService.createTask(action.taskObject)
    );
    if (status === STATUS_CODE.SUCCESS) {
      history.push("/project-management");
    }

    yield put({
      type: CLOSE_MODAL,
    });

    Notification("success", "Create Task Successfully");
  } catch (err) {
    console.info(err.config);
  }

  yield put({
    type: HIDE_LOADING,
  });
}

export function* listenCreateTaskSaga() {
  yield takeLatest(CREATE_TASK_SAGA, createTaskSaga);
}
