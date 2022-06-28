import {
  CHANGE_ASSIGNESS,
  CHANGE_TASK_MODAL,
  GET_TASK_DETAL_REDUCER,
  REMOVE_USER_TASK,
} from "../contants/TaskTypeConstant";

const initialState = {
  taskDetailModal: {},
};

export const TaskModalReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_TASK_DETAL_REDUCER: {
      return { ...state, taskDetailModal: action.taskDetailModal };
    }
    case CHANGE_TASK_MODAL: {
      const { name, value } = action;
      return {
        ...state,
        taskDetailModal: { ...state.taskDetailModal, [name]: value },
      };
    }
    case CHANGE_ASSIGNESS: {
      state.taskDetailModal.assigness = [
        ...state.taskDetailModal.assigness,
        action.assignessUpdate,
      ];
      return { ...state };
    }
    case REMOVE_USER_TASK: {
      const assignessUpDate = state.taskDetailModal.assigness.filter(
        (mem) => mem.id !== action.idUser
      );
      state.taskDetailModal.assigness = assignessUpDate;
      return { ...state };
    }
    default:
      return state;
  }
};
