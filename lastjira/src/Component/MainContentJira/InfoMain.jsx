import React from "react";

export default function InfoMain() {
  return (
    <div className="info mb-4" style={{ display: "flex" }}>
      <div className="search-block">
        <input className="search" />
        <i className="fa fa-search" />
      </div>
      <div className="avatar-group" style={{ display: "flex" }}>
        <div className="avatar">
          <img src={require("../../assets/img/download1.jfif")} alt="..." />
        </div>
        <div className="avatar">
          <img src={require("../../assets/img/download2.jfif")} alt="..." />
        </div>
        <div className="avatar">
          <img src={require("../../assets/img/download3.jfif")} alt="..." />
        </div>
      </div>
      <div style={{ marginLeft: 20 }} className="text">
        Only My Issues
      </div>
      <div style={{ marginLeft: 20 }} className="text">
        Recently Updated
      </div>
    </div>
  );
}
