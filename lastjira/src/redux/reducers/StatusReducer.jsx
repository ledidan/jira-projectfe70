import { GET_STATUS_REDUCER } from "../contants/StatusConstants";

const initialState = {
  arrStatus: [],
};

export const StatusReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_STATUS_REDUCER:
      return { ...state, arrStatus: action.arrStatus };

    default:
      return state;
  }
};
