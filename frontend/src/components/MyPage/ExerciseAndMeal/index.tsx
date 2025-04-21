import { ExerciseAndMealStyle } from "./styled"; //스타일
import clsx from "clsx";

//Component
import AIGuidance from "../AIGuidance";
import AiChat from "@/features/AIChat";
import { useSelector } from "react-redux";
import { RootState } from "@/redux/store";
import usePremium from "@/hook/usePremium";
import { useEffect } from "react";

//마이페이지 > 운동&식단 메인 컴포넌트
const ExerciseAndMeal = () => {
  //변수 선언
  const tokenList = useSelector((state: RootState) => state.token.tokenList);

  //hook
  const premium = usePremium();

  //프리미엄 회원 확인
  useEffect(() => {
    premium(tokenList);
  }, [tokenList]);

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
