import React from "react";

import {
  CLOSE_MODAL,
  FORM_CREATE_TASK,
  OPEN_EDIT_FORM,
  OPEN_FORM,
  OPEN_MODAL,
  SET_SUBMIT_FORM,
} from "../contants/JiraConstants";

const stateDefault = {
  visible: false,
  title: "",
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
      state.title = action.title;
      return { ...state };
    }
    case SET_SUBMIT_FORM: {
      state.callBackSubmit = action.submitFunction;
      return { ...state };
    }
    case FORM_CREATE_TASK: {
      state.visible = true;
      state.title = action.title;
      state.ComponentContentDrawer = action.Component;
      return { ...state };
    }
    default:
      return state;
  }
};
