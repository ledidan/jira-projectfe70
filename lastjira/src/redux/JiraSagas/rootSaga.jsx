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
import * as getProjectDetail from "./ProjectSaga";
import * as getAllProject from "./ProjectSaga";
import * as getAllTaskType from "./TaskTypeSaga";
import * as getAllPriority from "./PrioritySaga";
import * as createTask from "./TaskSaga";
import * as getStatus from "./StatusSaga";
import * as getUserByProject from "./UserJiraSaga";
import * as getTaskDetailModal from "./TaskSaga";
import * as updateTaskStatus from "./TaskSaga";
import * as handleChangeTaskPost from "./TaskSaga";
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
    getProjectDetail.listenGetProjectDetailSaga(),
    getAllProject.listenGetAllProjectSaga(),
    getAllTaskType.listenGetAllTaskTypeSaga(),
    getAllPriority.listenGetAllProjectSaga(),
    createTask.listenCreateTaskSaga(),
    getStatus.listenGetStatusSaga(),
    getUserByProject.listenGetUserByProjectSaga(),
    getTaskDetailModal.listenGetTaskDetailSaga(),
    updateTaskStatus.listenUpdateTaskStatusSaga(),
    handleChangeTaskPost.theoDoiHandelChangeTaskPostApi(),
  ]);
}
