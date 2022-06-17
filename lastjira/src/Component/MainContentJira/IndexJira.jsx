import React from "react";
import ContentMain from "./ContentMain";
import HeaderMain from "./HeaderMain";
import InfoMain from "./InfoMain";

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
