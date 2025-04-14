import React from "react";
import { ClimbingBoxLoader } from "react-spinners";
import { LoadingStyled } from "./styled";
import clsx from "clsx";

//로딩 컴포넌트
const Loading = () => {
  return (
    <LoadingStyled className={clsx("main-wrap")}>
      <div className="loading-img">
        <ClimbingBoxLoader />
      </div>
    </LoadingStyled>
  );
};

export default Loading;
