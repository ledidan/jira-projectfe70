import React from "react";
import { useSelector } from "react-redux";

export default function Home(props) {
  const userLogin = useSelector(
    (state) => state.UserLoginJiraReducer.userLogin
  );
  return (
    <div className="container mx-auto">
      <h2 className="text-3xl">Hello Welcome to Homepage</h2>
      <p>{userLogin.name}</p>
      <img src={userLogin.avatar} />
    </div>
  );
}
