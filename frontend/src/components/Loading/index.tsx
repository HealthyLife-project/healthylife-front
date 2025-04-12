import React from "react";
import { ClimbingBoxLoader } from "react-spinners";

const Loading = () => {
  return (
    <div>
      <h3>잠시만 기다려주세요.</h3>
      <ClimbingBoxLoader />
    </div>
  );
};

export default Loading;
