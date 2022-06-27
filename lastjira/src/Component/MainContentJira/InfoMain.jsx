import React from "react";
import ReactHTMLParser from "react-html-parser";
export default function InfoMain(props) {
  const { projectDetail } = props;
  const renderMembers = () => {
    return projectDetail.members?.map((member, index) => {
      return (
        <div className="avatar" key={index}>
          <img src={member.avatar} alt={member.avatar} />
        </div>
      );
    });
  };

  return (
    <>
      <h3 className="text-4xl mt-4">{projectDetail.projectName}</h3>
      <section>{ReactHTMLParser(projectDetail.description)}</section>
      <div className="info mb-4" style={{ display: "flex" }}>
        <div className="search-block">
          <input className="search" />
          <i className="fa fa-search" />
        </div>
        <div className="avatar-group" style={{ display: "flex" }}>
          {renderMembers()}
        </div>
        <div style={{ marginLeft: 20 }} className="text">
          Only My Issues
        </div>
        <div style={{ marginLeft: 20 }} className="text">
          Recently Updated
        </div>
      </div>
    </>
  );
}
