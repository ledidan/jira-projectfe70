import React from "react";

export default function HeaderMain(props) {
  const { projectDetail } = props;
  return (
    <div className="header mt-3">
      <nav aria-label="breadcrumb">
        <ol className="breadcrumb" style={{ backgroundColor: "white" }}>
          <li className="breadcrumb-item">Dashboard</li>
          <li className="breadcrumb-item">Project Board</li>
          <li className="breadcrumb-item active" aria-current="page">
            {projectDetail.projectName}
          </li>
        </ol>
      </nav>
    </div>
  );
}
