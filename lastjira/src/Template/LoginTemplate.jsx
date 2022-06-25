import React from "react";
import { Route } from "react-router-dom";

export default function LoginTemplate(props) {
  const { Component, ...restProps } = props;
  return (
    <Route
      {...restProps}
      render={(propsRoute) => {
        return (
          <>
            <Component {...propsRoute} />
          </>
        );
      }}
    />
  );
}
