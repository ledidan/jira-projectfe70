import React from "react";
import { useSelector } from "react-redux";
import { NavLink } from "react-router-dom";
export default function MenuJira() {
  const userLogin = useSelector(
    (state) => state.UserLoginJiraReducer.userLogin
  );
  return (
    <div className="menu">
      <div className="account">
        <div className="avatar">
          <img src={userLogin.avatar} alt="..." />
        </div>
        <div className="account-info">
          <p>{userLogin.name}</p>
          <p>Report bugs</p>
        </div>
      </div>
      <div className="control">
        <div>
          <i className="fa fa-credit-card" />
          <NavLink
            to="/dashboard"
            activeClassName="active font-weight-bold"
            className="ml-1 text-dark"
          >
            DashBoard
          </NavLink>
        </div>
        <div>
          <i className="fa fa-cog" />
          <NavLink
            to="/projectsetting"
            activeClassName="active font-weight-bold"
            className="ml-1 text-dark"
          >
            Project Settings
          </NavLink>
        </div>
      </div>
      <div className="feature">
        <div>
          <i className="fa fa-truck" />
          <span className="ml-1">Releases</span>
        </div>
        <div>
          <i className="fa fa-equals" />
          <span className="ml-1">Issues and filters</span>
        </div>
        <div>
          <i className="fa fa-paste" />
          <span className="ml-1">Pages</span>
        </div>
        <div>
          <i className="fa fa-location-arrow" />
          <span className="ml-1">Reports</span>
        </div>
        <div>
          <i className="fa fa-box" />
          <span className="ml-1">Components</span>
        </div>
      </div>
    </div>
  );
}
