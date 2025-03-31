import { ExerciseAndMealStyle } from "./styled"; //스타일
import clsx from "clsx";

//Component
import AIGuidance from "../AIGuidance";

//마이페이지 > 운동&식단 메인 컴포넌트
const ExerciseAndMeal = () => {
  return (
    <ExerciseAndMealStyle className={clsx("main-wrap")}>
      <AIGuidance />
    </ExerciseAndMealStyle>
  );
};

export default ExerciseAndMeal;
