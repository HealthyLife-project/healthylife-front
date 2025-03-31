import { AIGuidanceStyle } from "./styled"; //스타일
import clsx from "clsx";

//Component

//마이페이지 > 운동&식단 AI 가이드 컴포넌트
const AIGuidance = () => {
  return (
    <AIGuidanceStyle className={clsx("main-wrap")}>
      <div className="main-ai"></div>
    </AIGuidanceStyle>
  );
};

export default AIGuidance;
