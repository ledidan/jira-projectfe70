import { call, delay, put, take, takeLatest } from "redux-saga/effects";
import { taskTypeService } from "../services/TaskTypeService";
import {
  GET_ALL_TASK_TYPE,
  GET_ALL_TASK_TYPE_SAGA,
} from "../contants/TaskTypeConstant";

function* getAllTaskTypeSaga(action) {
  // Delay
  yield delay(500);
  try {
    const { data, status } = yield call(() => taskTypeService.getAllTaskType());

    yield put({
      type: GET_ALL_TASK_TYPE,
      arrTaskType: data.content,
    });
  } catch (err) {
    console.info(err.config);
  }
}

export function* listenGetAllTaskTypeSaga() {
  yield takeLatest(GET_ALL_TASK_TYPE_SAGA, getAllTaskTypeSaga);
}
