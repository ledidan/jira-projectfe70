import React, { useEffect } from "react";
import { useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { GET_PROJECT_DETAIL } from "../redux/contants/JiraConstants";
import ContentMain from "./MainContentJira/ContentMain";
import HeaderMain from "./MainContentJira/HeaderMain";
import InfoMain from "./MainContentJira/InfoMain";
export default function IndexJira(props) {
  const dispatch = useDispatch();
  let { projectDetail } = useSelector((state) => state.ProjectReducer);

  const getProjectDetailRef = useRef(null);

  useEffect(() => {
    // Khi nguoi dung link qua trang nay bang the NavLink hoac nguoi dung tu go url thi ta se lay tham so tu url => goi saga
    const { projectId } = props.match.params;
    if (getProjectDetailRef.current) {
      clearTimeout(getProjectDetailRef.current);
    }
    getProjectDetailRef.current = setTimeout(() => {
      dispatch({ type: GET_PROJECT_DETAIL, projectId });
    }, 300);
  }, []);
  console.log(projectDetail);
  return (
    <div className="main">
      <HeaderMain projectDetail={projectDetail} />
      <InfoMain projectDetail={projectDetail} />
      <ContentMain projectDetail={projectDetail} />
    </div>
  );
}
