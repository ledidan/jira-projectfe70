import { all, takeEvery, takeLatest } from "redux-saga/effects";
import * as UserLogIn from "./UserJiraSaga";
import * as ProjectCategory from "./ProjectCategorySaga";
import * as CreateProject from "./ProjectSaga";
import * as GetAllListProject from "./ProjectSaga";
import * as UpdateProject from "./ProjectSaga";
import * as DeleteProject from "./ProjectSaga";
import * as getUserProject from "./UserJiraSaga";
import * as addUserProject from "./UserJiraSaga";
import * as removeUserProject from "./UserJiraSaga";
export default function* rootSaga() {
  yield all([
    UserLogIn.listenUserSignIn(),
    ProjectCategory.listenAllProjectCategory(),
    CreateProject.listenCreateProjectSaga(),
    GetAllListProject.listenGetListProjectSaga(),
    UpdateProject.listenUpdateProjectSaga(),
    DeleteProject.listenDeleteProjectSaga(),
    getUserProject.listenToGetUser(),
    addUserProject.listenAddUserProject(),
    removeUserProject.listenRemoveUserProject(),
  ]);
}
