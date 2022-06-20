import { CLOSE_MODAL, OPEN_MODAL } from "../contants/JiraConstants";

const stateDefault = {
  visible: false,
};

export const ModalHOCReducer = (state = stateDefault, action) => {
  switch (action.type) {
    case OPEN_MODAL: {
      return { ...state, visible: true };
    }
    case CLOSE_MODAL: {
      return { ...state, visible: false };
    }
    default:
      return state;
  }
};
