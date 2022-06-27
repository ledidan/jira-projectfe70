import { call, takeLatest, put } from "redux-saga/effects";
import { STATUS_CODE } from "../../util/JiraSystem";
import {
  GET_STATUS_REDUCER,
  GET_STATUS_SAGA,
} from "../contants/StatusConstants";
import { statusService } from "../services/StatusService";

function* StatusSaga(action) {
  try {
    const { data, status } = yield call(() => statusService.getAllStatus());
    if (status === STATUS_CODE.SUCCESS) {
      yield put({
        type: GET_STATUS_REDUCER,
        arrStatus: data.content,
      });
    }
  } catch (err) {
    console.info(err.config);
  }
}

export function* listenGetStatusSaga() {
  yield takeLatest(GET_STATUS_SAGA, StatusSaga);
}
