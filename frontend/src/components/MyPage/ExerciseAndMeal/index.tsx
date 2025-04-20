import { ExerciseAndMealStyle } from "./styled"; //스타일
import clsx from "clsx";

//Component
import AIGuidance from "../AIGuidance";
import AiChat from "@/features/AIChat";

//마이페이지 > 운동&식단 메인 컴포넌트
const ExerciseAndMeal = () => {
  return (
    <ExerciseAndMealStyle className={clsx("main-wrap")}>
      <div className="ai-guide">
        <AIGuidance />
      </div>
      <div className="ai-chat">
        <AiChat />
      </div>
    </ExerciseAndMealStyle>
  );
};

export default ExerciseAndMeal;
