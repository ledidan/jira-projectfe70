import "./App.css";
import React, { useEffect } from "react";
import { BrowserRouter, Route, Switch, useHistory } from "react-router-dom";
import { useDispatch } from "react-redux";
import LoginUI from "./pages/Login/LoginUI";
import HomeTemplate from "./Template/HomeTemplate";
import Home from "./pages/Home/Home";
import { JiraDashboard } from "./Template/JiraDashboard";
import IndexJira from "./Component/IndexJira";
import CreateProjectJira from "./pages/CreateProject/CreateProjectJira";
import ProjectManagement from "./pages/ProjectManagement/ProjectManagement";
import ModalHOC from "./HOC/ModalHOC";
import LoginTemplate from "./Template/LoginTemplate";
function App() {
  const history = useHistory();
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch({ type: "ADD_HISTORY", history: history });
  }, []);

  return (
    <BrowserRouter>
      <ModalHOC />
      <Switch>
        {/* HomeTemplate */}
        <HomeTemplate path="/home" exact Component={Home} />
        <HomeTemplate path="/" exact Component={Home} />

        {/* Login Theme */}
        <LoginTemplate path="/login" exact Component={LoginUI} />

        {/* JiraDashboard */}
        <JiraDashboard exact path="/dashboard" Component={IndexJira} />
        <JiraDashboard
          exact
          path="/projectdetail/:projectId"
          Component={IndexJira}
        />
        <JiraDashboard
          exact
          path="/projectsetting"
          Component={CreateProjectJira}
        />
        <JiraDashboard
          exact
          path="/project-management"
          Component={ProjectManagement}
        />
      </Switch>
    </BrowserRouter>
  );
}

export default App;
