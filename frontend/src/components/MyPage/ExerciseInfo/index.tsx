import { ExerciseInfoStyle } from "./styled"; //스타일
import clsx from "clsx";

//Component
import KAKAOMap from "../../Map";

//마이페이지 > 운동정보 메인 컴포넌트
const ExerciseInfo = () => {
  return (
    <ExerciseInfoStyle className={clsx("main-wrap")}>
      <KAKAOMap />
    </ExerciseInfoStyle>
  );
};

export default ExerciseInfo;
