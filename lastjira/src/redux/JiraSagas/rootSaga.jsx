import { all, takeEvery, takeLatest } from "redux-saga/effects";
import * as JiraSagas from "./UserJiraSaga";
import * as ProjectCategory from "./ProjectCategorySaga";
import * as CreateProject from "./CreateProjectSaga";
export default function* rootSaga() {
  yield all([
    JiraSagas.listenTheSignIn(),
    ProjectCategory.listenAllProjectCategory(),
    CreateProject.listenCreateProjectSaga(),
  ]);
}
