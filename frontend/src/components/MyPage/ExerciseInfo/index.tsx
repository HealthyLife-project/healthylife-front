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
          <h1>현재 위치 기준 반경 2km이내 헬스장 위치</h1>
          <KAKAOMap />
        </div>
        <div className="main-info">
          <Bodyinfo />
        </div>
      </div>
      <div>
        <h1>최근 1년 인바디 정보</h1>
        <Chart />
      </div>
    </ExerciseInfoStyle>
  );
};

export default ExerciseInfo;
