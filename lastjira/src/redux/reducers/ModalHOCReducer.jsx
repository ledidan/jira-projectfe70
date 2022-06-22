import React from "react";

import {
  CLOSE_MODAL,
  OPEN_EDIT_FORM,
  OPEN_FORM,
  OPEN_MODAL,
  SET_SUBMIT_FORM,
} from "../contants/JiraConstants";

const stateDefault = {
  visible: false,
  ComponentContentDrawer: <p>Default Content</p>,
  callBackSubmit: (propsValue) => {
    alert("Click Demo");
  },
};

export const ModalHOCReducer = (state = stateDefault, action) => {
  switch (action.type) {
    case OPEN_MODAL: {
      return { ...state, visible: true };
    }
    case CLOSE_MODAL: {
      return { ...state, visible: false };
    }
    case OPEN_EDIT_FORM: {
      state.visible = true;
      state.ComponentContentDrawer = action.Component;
      return { ...state };
    }
    case SET_SUBMIT_FORM: {
      state.callBackSubmit = action.submitFunction;
      return { ...state };
    }
    default:
      return state;
  }
};
