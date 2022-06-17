import { call, put, takeLatest } from "redux-saga/effects";
import { STATUS_CODE } from "../../util/DOMAIN/JiraSystem";
import {
  API_PROJECT_CATEGORY,
  GET_API_SUCCESS,
} from "../contants/JiraConstants";
import { JiraService } from "../types/services/JiraServices";

function* getAllProjectCategorySaga(action) {
  //   Goi API lay du lieu ve
  try {
    const { data, status } = yield call(() =>
      JiraService.getAllProjectCategory()
    );

    //   Goi API thanh cong thi dispatch len reducer thong qua put
    if (status === STATUS_CODE.SUCCESS) {
      yield put({
        type: API_PROJECT_CATEGORY,
        data: data.content,
      });
    }
  } catch (err) {
    console.info(err.config);
  }
}

export function* listenAllProjectCategory() {
  yield takeLatest(API_PROJECT_CATEGORY, getAllProjectCategorySaga);
}
