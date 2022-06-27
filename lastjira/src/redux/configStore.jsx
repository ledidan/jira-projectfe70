import { createStore, applyMiddleware, combineReducers, compose } from "redux";
import createMiddleWareSaga from "redux-saga";
import rootSaga from "./JiraSagas/rootSaga";
import JiraReducer from "./reducers/JiraReducer";
import { HistoryReducer } from "./reducers/HistoryReducer";
import { UserLoginJiraReducer } from "./reducers/UserJiraReducer";
import { ProjectCategoryReducer } from "./reducers/ProjectCategoryReducer";
import { ProjectManagementReducer } from "./reducers/ProjectManagementReducer";
import { ModalHOCReducer } from "./reducers/ModalHOCReducer";
import { ProjectReducer } from "./reducers/ProjectReducer";
import { TaskTypeReducer } from "./reducers/TaskTypeReducer";
import { PriorityReducer } from "./reducers/PriorityReducer";
import { StatusReducer } from "./reducers/StatusReducer";
const composeEnhancers =
  typeof window === "object" && window["__REDUX_DEVTOOLS_EXTENSION_COMPOSE__"]
    ? window["__REDUX_DEVTOOLS_EXTENSION_COMPOSE__"]({})
    : compose;

const middleWareSaga = createMiddleWareSaga();

const rootReducer = combineReducers({
  JiraReducer,
  HistoryReducer,
  UserLoginJiraReducer,
  ProjectCategoryReducer,
  ProjectManagementReducer,
  ModalHOCReducer,
  ProjectReducer,
  TaskTypeReducer,
  PriorityReducer,
  StatusReducer,
});

export const store = createStore(
  rootReducer,
  composeEnhancers(applyMiddleware(middleWareSaga))
);
middleWareSaga.run(rootSaga);
