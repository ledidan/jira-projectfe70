import { call, delay, put, take, takeLatest } from "redux-saga/effects";
import {
  GET_ALL_PRIORITY,
  GET_ALL_PRIORITY_SAGA,
} from "../contants/PriorityConstants";
import { priorityService } from "../services/PriorityService";

function* getAllPrioritySaga(action) {
  try {
    const { data, status } = yield call(() => priorityService.getAllPriority());

    yield put({
      type: GET_ALL_PRIORITY,
      arrPriority: data.content,
    });
  } catch (err) {
    console.info(err.config);
  }
}

export function* listenGetAllProjectSaga() {
  yield takeLatest(GET_ALL_PRIORITY_SAGA, getAllPrioritySaga);
}
