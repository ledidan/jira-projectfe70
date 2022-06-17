import React from "react";
import ContentMain from "./MainContentJira/ContentMain";
import HeaderMain from "./MainContentJira/HeaderMain";
import InfoMain from "./MainContentJira/InfoMain";

export default function IndexJira() {
  return (
    <div className="main">
      <h3 className="text-3xl mt-5">Cyber Board</h3>
      <HeaderMain />
      <InfoMain />
      <ContentMain />
    </div>
  );
}
