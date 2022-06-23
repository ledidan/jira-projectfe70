import { all, takeEvery, takeLatest } from "redux-saga/effects";
import * as JiraSagas from "./UserJiraSaga";
import * as ProjectCategory from "./ProjectCategorySaga";
import * as CreateProject from "./ProjectSaga";
import * as GetAllListProject from "./ProjectSaga";
import * as UpdateProject from "./ProjectSaga";
export default function* rootSaga() {
  yield all([
    JiraSagas.listenTheSignIn(),
    ProjectCategory.listenAllProjectCategory(),
    CreateProject.listenCreateProjectSaga(),
    GetAllListProject.listenGetListProjectSaga(),
    UpdateProject.listenUpdateProjectSaga(),
  ]);
}
