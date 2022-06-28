import { call, delay, put, select, takeLatest } from "redux-saga/effects";
import { STATUS_CODE } from "../../util/JiraSystem";
import { taskService } from "../services/TaskService";
import { DISPLAY_LOADING, HIDE_LOADING } from "../contants/DisplayLoading";
import { CLOSE_MODAL, GET_PROJECT_DETAIL } from "../contants/JiraConstants";
import { Notification } from "../../util/Notification/notification";
import {
  CHANGE_ASSIGNESS,
  CHANGE_TASK_MODAL,
  CREATE_TASK_SAGA,
  GET_TASK_DETAL_REDUCER,
  GET_TASK_DETAL_SAGA,
  HANDLE_CHANGE_TASK_POST_API_SAGA,
  REMOVE_USER_TASK,
  UPDATE_TASK_STATUS_SAGA,
} from "../contants/TaskTypeConstant";
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
    console.log(err.response?.data);
  }

  yield put({
    type: HIDE_LOADING,
  });
}

export function* listenCreateTaskSaga() {
  yield takeLatest(CREATE_TASK_SAGA, createTaskSaga);
}

function* getTaskDetailSaga(action) {
  const { idTask } = action;
  try {
    yield put({
      type: DISPLAY_LOADING,
    });
    const { data, status } = yield call(() =>
      taskService.getTaskDetail(idTask)
    );
    yield put({
      type: GET_TASK_DETAL_REDUCER,
      taskDetailModal: data.content,
    });
  } catch (err) {
    console.info(err.config);
    console.log(err.response?.data);
  }
}
export function* listenGetTaskDetailSaga() {
  yield takeLatest(GET_TASK_DETAL_SAGA, getTaskDetailSaga);
}

function* updateTaskStatusSaga(action) {
  const { taskStatusUpdate } = action;
  console.log("action", action);
  try {
    yield put({
      type: DISPLAY_LOADING,
    });
    const { data, status } = yield call(() =>
      taskService.updateStatusTask(taskStatusUpdate)
    );
    if (status === STATUS_CODE.SUCCESS) {
      yield put({
        type: GET_PROJECT_DETAIL,
        projectId: taskStatusUpdate.projectId,
      });
      yield put({
        type: GET_TASK_DETAL_SAGA,
        taskId: taskStatusUpdate.taskId,
      });
      Notification("success", "Update Status Project Successfully");
    }
  } catch (err) {
    console.info(err.config);
    console.log(err.response?.data);
  }
}

export function* listenUpdateTaskStatusSaga() {
  yield takeLatest(UPDATE_TASK_STATUS_SAGA, updateTaskStatusSaga);
}

//  Handle Change Task Post From API
function* handelChangeTaskPostApi(action) {
  console.log("abc", action);
  switch (action.actionType) {
    case CHANGE_TASK_MODAL:
      {
        const { value, name } = action;
        yield put({
          type: CHANGE_TASK_MODAL,
          name: name,
          value: value,
        });
      }
      break;
    case CHANGE_ASSIGNESS:
      {
        yield put({
          type: CHANGE_ASSIGNESS,
          assignessUpdate: action.assignessUpdate,
        });
      }
      break;
    case REMOVE_USER_TASK:
      {
        yield put({
          type: REMOVE_USER_TASK,
          idUser: action.idUser,
        });
      }
      break;
  }
  let { taskDetailModal } = yield select((state) => state.TaskModalReducer);
  const listUserAsign = taskDetailModal.assigness?.map((item, index) => {
    return item.id;
  });

  const taskUpdateDetail = { ...taskDetailModal, listUserAsign };
  try {
    const { data, status } = yield call(() =>
      taskService.upDateTask(taskUpdateDetail)
    );
    if (status === STATUS_CODE.SUCCESS) {
      yield put({
        type: GET_PROJECT_DETAIL,
        projectId: taskUpdateDetail.projectId,
      });
      yield put({
        type: GET_TASK_DETAL_SAGA,
        taskId: taskUpdateDetail.taskId,
      });
    }
  } catch (error) {
    console.log(error.response?.data);
  }
}

export function* theoDoiHandelChangeTaskPostApi() {
  yield takeLatest(HANDLE_CHANGE_TASK_POST_API_SAGA, handelChangeTaskPostApi);
}
