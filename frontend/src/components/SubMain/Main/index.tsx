import { SubMainStyled } from "./styled";
import { useRouter } from "next/router";
import clsx from "clsx";
import SubMap from "../SubMap";
import SubCategory from "../SubCategory";

//Coponent

//submain > main 컴포넌트
const SubMain = () => {
  const router = useRouter();

  //변수 선언

  return (
    <SubMainStyled className={clsx("main-wrap")}>
      <div className="main-left">
        <SubMap />
      </div>

      <div className="main-right">
        <SubCategory />
      </div>
    </SubMainStyled>
  );
};
export default SubMain;
