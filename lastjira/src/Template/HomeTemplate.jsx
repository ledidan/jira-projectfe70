import React, { Fragment } from "react";
import { Route } from "react-router-dom";
import FooterComponent from "../Component/FooterComponent";
import HeaderComponent from "../Component/HeaderComponent";
const HomeTemplate = (props) => {
  const { Component, ...restProps } = props;

  return (
    <Route
      {...restProps}
      render={(propsRoute) => {
        //props.location, .props.history, props.match
        return (
          <Fragment>
            <HeaderComponent />

            {/* This is section of homepage */}
            <Component {...propsRoute} />

            <FooterComponent />
          </Fragment>
        );
      }}
    />
  );
};

export default HomeTemplate;
