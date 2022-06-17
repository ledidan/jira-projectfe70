import React, { Fragment } from "react";
import { Route } from "react-router-dom";
import ContentMain from "../Component/MainContentJira/ContentMain";
import HeaderMain from "../Component/MainContentJira/HeaderMain";
import InfoMain from "../Component/MainContentJira/InfoMain";
import ModalJIra from "../Component/MainContentJira/ModalJIra";
import MenuJira from "../Component/MenuJira";
import SideBarJira from "../Component/SideBarJira";

export const JiraDashboard = (props) => {
  const { Component, ...restProps } = props;
  return (
    <Route
      {...restProps}
      render={(propsRoute) => {
        return (
          <>
            <div className="jira">
              <SideBarJira />
              <MenuJira />
              <Component {...propsRoute} />
              <ModalJIra />
            </div>
          </>
        );
      }}
    />
  );
};
