import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { GET_PROJECT_DETAIL } from "../redux/contants/JiraConstants";
import ContentMain from "./MainContentJira/ContentMain";
import HeaderMain from "./MainContentJira/HeaderMain";
import InfoMain from "./MainContentJira/InfoMain";
export default function IndexJira(props) {
  const dispatch = useDispatch();

  let { projectDetail } = useSelector(
    (state) => state.ProjectReducer.projectDetail
  );
  console.log(projectDetail);
  const projectId = props.match.params;

  useEffect(() => {
    // Khi nguoi dung link qua trang nay bang the NavLink hoac nguoi dung tu go url thi ta se lay tham so tu url => goi saga

    dispatch({ type: GET_PROJECT_DETAIL, projectId });
  }, []);

  return (
    <div className="main">
      <h3 className="text-3xl mt-5">Cyber Board</h3>
      <HeaderMain />
      <InfoMain />
      <ContentMain />
    </div>
  );
}
