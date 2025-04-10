import { ExerciseInfoStyle } from "./styled"; //스타일
import clsx from "clsx";

//Component
import KAKAOMap from "../../Map";
import Bodyinfo from "./Bodyinfo";
import Chart from "@/components/Chart";

//마이페이지 > 운동정보 메인 컴포넌트
const ExerciseInfo = () => {
  return (
    <ExerciseInfoStyle className={clsx("main-wrap")}>
      <div className="main-top">
        <div className="main-map">
          <KAKAOMap />
        </div>
        <div className="main-info">
          <Bodyinfo />
        </div>
      </div>
      <Chart />
    </ExerciseInfoStyle>
  );
};

export default ExerciseInfo;
