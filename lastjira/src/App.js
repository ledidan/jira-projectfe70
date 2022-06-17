import "./App.css";
import React, { useEffect } from "react";
import { BrowserRouter, Route, Switch, useHistory } from "react-router-dom";
import { useDispatch } from "react-redux";
import LoginUI from "./pages/Login/LoginUI";
import HomeTemplate from "./Template/HomeTemplate";
import Home from "./pages/Home/Home";
import Contact from "./pages/Contact/Contact";
import About from "./pages/About/About";
import Pricing from "./pages/Price/Pricing";
import Service from "./pages/Service/Service";
import { JiraDashboard } from "./Template/JiraDashboard";
import IndexJira from "./Component/MainContentJira/IndexJira";
import CreateProjectJira from "./Component/CreateProject/CreateProjectJira";
function App() {
  const history = useHistory();
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch({ type: "ADD_HISTORY", history: history });
  }, []);

  return (
    <BrowserRouter>
      <Switch>
        {/* HomeTemplate */}
        <HomeTemplate path="/home" exact Component={Home} />
        <HomeTemplate path="/about" exact Component={About} />
        <HomeTemplate path="/contact" exact Component={Contact} />
        <HomeTemplate path="/price" exact Component={Pricing} />
        <HomeTemplate path="/service" exact Component={Service} />
        <HomeTemplate path="/login" exact Component={LoginUI} />
        <HomeTemplate path="/" exact Component={Home} />

        {/* JiraDashboard */}
        <JiraDashboard exact path="/dashboard" Component={IndexJira} />
        <JiraDashboard
          exact
          path="/projectsetting"
          Component={CreateProjectJira}
        />
      </Switch>
    </BrowserRouter>
  );
}

export default App;
